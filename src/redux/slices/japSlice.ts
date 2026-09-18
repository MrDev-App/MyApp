import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getJapMantrasData, JapMantraItem } from '@services/firebaseServices/japService';

export type { JapMantraItem };

export interface JapState {
  japMantras: JapMantraItem[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: JapState = {
  japMantras: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const japSlice = createSlice({
  name: 'jap',
  initialState,
  reducers: {
    setJapMantras: (state, action: PayloadAction<JapMantraItem[]>) => {
      state.japMantras = action.payload;
      state.loading = false;
      state.error = null;
      state.lastFetched = Date.now();
    },
    setJapLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setJapError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setJapMantras, setJapLoading, setJapError } = japSlice.actions;

/**
 * Async thunk to fetch Jap Mantras from Firestore
 */
export const fetchJapMantras = () => {
  return async (dispatch: any) => {
    dispatch(setJapLoading(true));
    try {
      const data = await getJapMantrasData();
      dispatch(setJapMantras(data));
      return data;
    } catch (error: any) {
      dispatch(
        setJapError(
          error?.message || 'Failed to fetch JapMantras from Firebase',
        ),
      );
      return [];
    }
  };
};

export default japSlice.reducer;
