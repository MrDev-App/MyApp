import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  withSpring,
  cancelAnimation,
  makeMutable,
  SharedValue,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

import {
  SPRING_CONFIG,
  QUEUED_SPRING_CONFIG,
  BOOK_WIDTH,
} from './FlipBookCover.constants';
import { triggerHaptic } from '@helper/helper';

interface UseFlipBookControllerProps {
  totalPages: number;
  storyId?: string;
  onPageChange?: (pageIndex: number, totalPages: number) => void;
  bookWidth?: number;
}

export const useFlipBookController = ({
  totalPages,
  storyId,
  onPageChange,
  bookWidth = BOOK_WIDTH,
}: UseFlipBookControllerProps) => {
  // Mirror onPageChange to ref so panGesture and finish callbacks stay stable
  const onPageChangeRef = useRef(onPageChange);
  useEffect(() => {
    onPageChangeRef.current = onPageChange;
  }, [onPageChange]);

  // Dynamic shared value pool supporting arbitrary page count without 8-sheet ceiling
  const sheetProgressCache = useRef<Map<number, SharedValue<number>>>(
    new Map(),
  );

  const sheetProgressList = useMemo(() => {
    const list: SharedValue<number>[] = [];
    for (let i = 0; i < totalPages; i++) {
      if (!sheetProgressCache.current.has(i)) {
        sheetProgressCache.current.set(i, makeMutable(0));
      }
      list.push(sheetProgressCache.current.get(i)!);
    }
    return list;
  }, [totalPages]);

  // UI-thread shared values for coordination & gesture boundaries
  const activeSheetIdx = useSharedValue<number>(0);
  const gestureDir = useSharedValue<'forward' | 'backward'>('forward');
  const isGestureActive = useSharedValue<boolean>(false);
  const isAnimatingShared = useSharedValue<boolean>(false);
  const currentPageShared = useSharedValue<number>(0);

  // Synchronous JS-thread state tracking (prevents React state tick desync)
  const currentPageRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const isJumpingRef = useRef<boolean>(false);
  const actionQueueRef = useRef<Array<'next' | 'prev'>>([]);

  // React state for UI rendering only
  const [displayPage, setDisplayPage] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [activeFlipDir, setActiveFlipDir] = useState<
    'forward' | 'backward' | null
  >(null);
  const [queueLength, setQueueLength] = useState<number>(0);

  // Story Change Reset: cancels running springs and resets all sheets to page 0
  useEffect(() => {
    sheetProgressCache.current.forEach(progress => {
      cancelAnimation(progress);
      progress.value = 0;
    });
    currentPageRef.current = 0;
    currentPageShared.value = 0;
    setDisplayPage(0);
    isAnimatingRef.current = false;
    isAnimatingShared.value = false;
    isJumpingRef.current = false;
    actionQueueRef.current = [];
    setQueueLength(0);
    setIsFlipping(false);
    setActiveFlipDir(null);
  }, [storyId, currentPageShared, isAnimatingShared]);

  // Refs to break circular callback dependencies cleanly
  const processNextQueueRef = useRef<() => void>(() => {});
  const executeForwardFlipRef = useRef<
    (fromPage: number, isQueued?: boolean) => void
  >(() => {});
  const executeBackwardFlipRef = useRef<
    (fromPage: number, isQueued?: boolean) => void
  >(() => {});

  // Complete turn callbacks
  const onForwardTurnFinish = useCallback(
    (sheetIdx: number) => {
      const nextPage = sheetIdx + 1;
      currentPageRef.current = nextPage;
      currentPageShared.value = nextPage;
      setDisplayPage(nextPage);
      onPageChangeRef.current?.(nextPage, totalPages);

      processNextQueueRef.current();
    },
    [totalPages, currentPageShared],
  );

  const onBackwardTurnFinish = useCallback(
    (sheetIdx: number) => {
      const prevPage = sheetIdx;
      currentPageRef.current = prevPage;
      currentPageShared.value = prevPage;
      setDisplayPage(prevPage);
      onPageChangeRef.current?.(prevPage, totalPages);

      processNextQueueRef.current();
    },
    [totalPages, currentPageShared],
  );

  const onFlipCancel = useCallback(
    (sheetIdx: number, wasTurningForward: boolean) => {
      const originalPage = wasTurningForward ? sheetIdx : sheetIdx + 1;
      currentPageRef.current = originalPage;
      currentPageShared.value = originalPage;
      setDisplayPage(originalPage);
      onPageChangeRef.current?.(originalPage, totalPages);

      actionQueueRef.current = [];
      setQueueLength(0);
      isAnimatingRef.current = false;
      isAnimatingShared.value = false;
      setIsFlipping(false);
      setActiveFlipDir(null);
    },
    [totalPages, currentPageShared, isAnimatingShared],
  );

  // Midway crossing callback: fired by useAnimatedReaction when progress crosses 0.5
  const handleHalfwayChange = useCallback(
    (targetPage: number) => {
      if (isJumpingRef.current) return;
      if (currentPageRef.current === targetPage) return;
      currentPageRef.current = targetPage;
      currentPageShared.value = targetPage;
      setDisplayPage(targetPage);
      triggerHaptic();
      onPageChangeRef.current?.(targetPage, totalPages);
    },
    [totalPages, currentPageShared],
  );

  // Core Forward Flip Execution
  const executeForwardFlip = useCallback(
    (fromPage: number, isQueued: boolean = false) => {
      if (fromPage >= totalPages) {
        processNextQueueRef.current();
        return;
      }
      const targetSheet = fromPage;
      const progressVal = sheetProgressList[targetSheet];
      if (!progressVal) {
        processNextQueueRef.current();
        return;
      }

      isAnimatingRef.current = true;
      isAnimatingShared.value = true;
      setIsFlipping(true);
      setActiveFlipDir('forward');

      const config = isQueued ? QUEUED_SPRING_CONFIG : SPRING_CONFIG;
      progressVal.value = withSpring(1, config, finished => {
        if (finished) {
          runOnJS(onForwardTurnFinish)(targetSheet);
        }
      });
    },
    [totalPages, sheetProgressList, onForwardTurnFinish, isAnimatingShared],
  );
  executeForwardFlipRef.current = executeForwardFlip;

  // Core Backward Flip Execution
  const executeBackwardFlip = useCallback(
    (fromPage: number, isQueued: boolean = false) => {
      if (fromPage <= 0) {
        processNextQueueRef.current();
        return;
      }
      const targetSheet = fromPage - 1;
      const progressVal = sheetProgressList[targetSheet];
      if (!progressVal) {
        processNextQueueRef.current();
        return;
      }

      isAnimatingRef.current = true;
      isAnimatingShared.value = true;
      setIsFlipping(true);
      setActiveFlipDir('backward');

      const config = isQueued ? QUEUED_SPRING_CONFIG : SPRING_CONFIG;
      progressVal.value = withSpring(0, config, finished => {
        if (finished) {
          runOnJS(onBackwardTurnFinish)(targetSheet);
        }
      });
    },
    [sheetProgressList, onBackwardTurnFinish, isAnimatingShared],
  );
  executeBackwardFlipRef.current = executeBackwardFlip;

  // Process next action in multi-tap queue
  const processNextQueue = useCallback(() => {
    if (actionQueueRef.current.length === 0) {
      isAnimatingRef.current = false;
      isAnimatingShared.value = false;
      setIsFlipping(false);
      setActiveFlipDir(null);
      setQueueLength(0);
      return;
    }

    const nextAction = actionQueueRef.current.shift()!;
    setQueueLength(actionQueueRef.current.length);

    const cur = currentPageRef.current;
    if (nextAction === 'next') {
      if (cur < totalPages) {
        setActiveFlipDir('forward');
        executeForwardFlipRef.current(cur, true);
      } else {
        processNextQueue();
      }
    } else {
      if (cur > 0) {
        setActiveFlipDir('backward');
        executeBackwardFlipRef.current(cur, true);
      } else {
        processNextQueue();
      }
    }
  }, [totalPages, isAnimatingShared]);
  processNextQueueRef.current = processNextQueue;

  // Programmatic forward flip with multi-tap queueing
  const handleNextPage = useCallback(() => {
    const cur = currentPageRef.current;
    if (cur >= totalPages) return;

    if (isAnimatingRef.current) {
      if (actionQueueRef.current.length < 10) {
        actionQueueRef.current.push('next');
        setQueueLength(actionQueueRef.current.length);
      }
      return;
    }

    executeForwardFlip(cur, false);
  }, [totalPages, executeForwardFlip]);

  // Programmatic backward flip with multi-tap queueing
  const handlePrevPage = useCallback(() => {
    const cur = currentPageRef.current;
    if (cur <= 0) return;

    if (isAnimatingRef.current) {
      if (actionQueueRef.current.length < 10) {
        actionQueueRef.current.push('prev');
        setQueueLength(actionQueueRef.current.length);
      }
      return;
    }

    executeBackwardFlip(cur, false);
  }, [executeBackwardFlip]);

  // Jump settling callback with queue-drain fix
  const onJumpSettled = useCallback(
    (targetPage: number) => {
      isJumpingRef.current = false;
      currentPageRef.current = targetPage;
      currentPageShared.value = targetPage;
      setDisplayPage(targetPage);
      onPageChangeRef.current?.(targetPage, totalPages);
      isAnimatingRef.current = false;
      isAnimatingShared.value = false;
      setIsFlipping(false);
      setActiveFlipDir(null);

      // Drain any queued taps that arrived during jump animation
      processNextQueueRef.current();
    },
    [totalPages, currentPageShared, isAnimatingShared],
  );

  // Jump to specific page via dots - Smooth multi-sheet transition
  const handleJumpToPage = useCallback(
    (targetPage: number) => {
      if (
        isAnimatingRef.current ||
        targetPage === currentPageRef.current ||
        targetPage < 0 ||
        targetPage > totalPages
      ) {
        return;
      }
      triggerHaptic();

      isAnimatingRef.current = true;
      isAnimatingShared.value = true;
      isJumpingRef.current = true;
      setIsFlipping(true);
      actionQueueRef.current = [];
      setQueueLength(0);

      const fromPage = currentPageRef.current;
      const isForward = targetPage > fromPage;
      setActiveFlipDir(isForward ? 'forward' : 'backward');
      setDisplayPage(targetPage);

      if (isForward) {
        const finalSheetIdx = targetPage - 1;
        for (let i = fromPage; i < targetPage; i++) {
          const progressVal = sheetProgressList[i];
          if (progressVal) {
            if (i === finalSheetIdx) {
              progressVal.value = withSpring(
                1,
                QUEUED_SPRING_CONFIG,
                finished => {
                  if (finished) {
                    runOnJS(onJumpSettled)(targetPage);
                  }
                },
              );
            } else {
              progressVal.value = withSpring(1, QUEUED_SPRING_CONFIG);
            }
          }
        }
      } else {
        const finalSheetIdx = targetPage;
        for (let i = fromPage - 1; i >= targetPage; i--) {
          const progressVal = sheetProgressList[i];
          if (progressVal) {
            if (i === finalSheetIdx) {
              progressVal.value = withSpring(
                0,
                QUEUED_SPRING_CONFIG,
                finished => {
                  if (finished) {
                    runOnJS(onJumpSettled)(targetPage);
                  }
                },
              );
            } else {
              progressVal.value = withSpring(0, QUEUED_SPRING_CONFIG);
            }
          }
        }
      }
    },
    [totalPages, sheetProgressList, onJumpSettled, isAnimatingShared],
  );

  const notifyPanAnimationStart = useCallback(() => {
    isAnimatingRef.current = true;
    setIsFlipping(true);
  }, []);

  // Stable Pan Gesture
  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .activeOffsetX([-10, 10])
      .onStart(event => {
        'worklet';
        if (isAnimatingShared.value) {
          isGestureActive.value = false;
          return;
        }
        const curPage = currentPageShared.value;

        if (event.velocityX < 0) {
          if (curPage >= totalPages) return;
          activeSheetIdx.value = curPage;
          gestureDir.value = 'forward';
          isGestureActive.value = true;
        } else if (event.velocityX > 0) {
          if (curPage <= 0) return;
          activeSheetIdx.value = curPage - 1;
          gestureDir.value = 'backward';
          isGestureActive.value = true;
        }
      })
      .onUpdate(event => {
        'worklet';
        if (!isGestureActive.value) return;
        const sheetIdx = activeSheetIdx.value;
        if (sheetIdx < 0 || sheetIdx >= totalPages) return;

        const progressVal = sheetProgressList[sheetIdx];
        if (!progressVal) return;

        if (gestureDir.value === 'forward') {
          const progress = Math.min(
            1,
            Math.max(0, -event.translationX / bookWidth),
          );
          progressVal.value = progress;
        } else {
          const progress = Math.min(
            1,
            Math.max(0, 1 - event.translationX / bookWidth),
          );
          progressVal.value = progress;
        }
      })
      .onEnd(event => {
        'worklet';
        if (!isGestureActive.value) return;
        isGestureActive.value = false;

        const sheetIdx = activeSheetIdx.value;
        if (sheetIdx < 0 || sheetIdx >= totalPages) return;

        const progressVal = sheetProgressList[sheetIdx];
        if (!progressVal) return;

        isAnimatingShared.value = true;
        runOnJS(notifyPanAnimationStart)();

        const velocityThreshold = 250;
        if (gestureDir.value === 'forward') {
          const shouldTurn =
            progressVal.value > 0.35 || event.velocityX < -velocityThreshold;
          if (shouldTurn) {
            progressVal.value = withSpring(1, SPRING_CONFIG, finished => {
              if (finished) {
                runOnJS(onForwardTurnFinish)(sheetIdx);
              }
            });
          } else {
            progressVal.value = withSpring(0, SPRING_CONFIG, finished => {
              if (finished) {
                runOnJS(onFlipCancel)(sheetIdx, true);
              }
            });
          }
        } else {
          const shouldTurn =
            progressVal.value < 0.65 || event.velocityX > velocityThreshold;
          if (shouldTurn) {
            progressVal.value = withSpring(0, SPRING_CONFIG, finished => {
              if (finished) {
                runOnJS(onBackwardTurnFinish)(sheetIdx);
              }
            });
          } else {
            progressVal.value = withSpring(1, SPRING_CONFIG, finished => {
              if (finished) {
                runOnJS(onFlipCancel)(sheetIdx, false);
              }
            });
          }
        }
      });
  }, [
    totalPages,
    sheetProgressList,
    bookWidth,
    currentPageShared,
    isAnimatingShared,
    activeSheetIdx,
    gestureDir,
    isGestureActive,
    notifyPanAnimationStart,
    onForwardTurnFinish,
    onBackwardTurnFinish,
    onFlipCancel,
  ]);

  return {
    sheetProgressList,
    displayPage,
    isFlipping,
    activeFlipDir,
    queueLength,
    panGesture,
    handleNextPage,
    handlePrevPage,
    handleJumpToPage,
    handleHalfwayChange,
  };
};

export default useFlipBookController;
