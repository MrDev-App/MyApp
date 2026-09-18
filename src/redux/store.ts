import festivalReducer, { FestivalState } from './slices/festivalSlice';
import godReducer, { GodState } from './slices/godSlice';
import japReducer, { JapState } from './slices/japSlice';
import categoriesReducer, { CategoriesState } from './slices/categoriesSlice';

export interface RootState {
  festival: FestivalState;
  gods: GodState;
  jap: JapState;
  categories: CategoriesState;
}

const defaultInitialState: RootState = {
  festival: { festivals: [], loading: false, error: null, lastFetched: null },
  gods: { gods: [], loading: false, error: null, lastFetched: null },
  jap: { japMantras: [], loading: false, error: null, lastFetched: null },
  categories: {
    categories: [],
    loading: false,
    error: null,
    lastFetched: null,
  },
};

export const rootReducer = (
  state: RootState = defaultInitialState,
  action: any,
): RootState => {
  const fest =
    typeof festivalReducer === 'function'
      ? festivalReducer(state?.festival, action)
      : state?.festival || defaultInitialState.festival;

  const gods =
    typeof godReducer === 'function'
      ? godReducer(state?.gods, action)
      : state?.gods || defaultInitialState.gods;

  const jap =
    typeof japReducer === 'function'
      ? japReducer(state?.jap, action)
      : state?.jap || defaultInitialState.jap;

  const cats =
    typeof categoriesReducer === 'function'
      ? categoriesReducer(state?.categories, action)
      : state?.categories || defaultInitialState.categories;

  return {
    festival: fest,
    gods: gods,
    jap: jap,
    categories: cats,
  };
};

/**
 * Robust Redux store with native Async Thunk support for React Native
 */
export const createCustomStore = (
  reducer: (state: any, action: any) => any,
) => {
  let currentReducer = reducer;
  let currentState = defaultInitialState;
  try {
    currentState = currentReducer(undefined, { type: '@@redux/INIT' });
  } catch {}

  const listeners = new Set<() => void>();

  const getState = (): RootState => currentState;

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const dispatch = (action: any): any => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    currentState = currentReducer(currentState, action);
    listeners.forEach(listener => {
      try {
        listener();
      } catch (e) {
        console.error('Redux subscriber error:', e);
      }
    });
    return action;
  };

  const replaceReducer = (nextReducer: (state: any, action: any) => any) => {
    currentReducer = nextReducer;
    dispatch({ type: '@@redux/REPLACE' });
  };

  return {
    getState,
    subscribe,
    dispatch,
    replaceReducer,
    // Symbol.observable support for react-redux v9
    [Symbol.observable || '@@observable']: function () {
      return {
        subscribe: (observer: any) => {
          const handler = () => {
            if (typeof observer === 'function') {
              observer(getState());
            } else if (observer && typeof observer.next === 'function') {
              observer.next(getState());
            }
          };
          const unsub = subscribe(handler);
          handler();
          return { unsubscribe: unsub };
        },
        [Symbol.observable || '@@observable']: function () {
          return this;
        },
      };
    },
  };
};

export const store: any = createCustomStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export default store;
