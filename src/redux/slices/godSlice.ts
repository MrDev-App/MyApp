import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getGodData,
  God,
  GodMantra,
} from '@services/firebaseServices/godMantras';

export type { God, GodMantra };

export interface GodState {
  gods: God[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: GodState = {
  gods: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const godSlice = createSlice({
  name: 'gods',
  initialState,
  reducers: {
    setGods: (state, action: PayloadAction<God[]>) => {
      state.gods = action.payload;
      state.loading = false;
      state.error = null;
      state.lastFetched = Date.now();
    },
    setGodsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setGodsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setGods, setGodsLoading, setGodsError } = godSlice.actions;

export const fetchGodMantras = () => {
  return async (dispatch: any) => {
    dispatch(setGodsLoading(true));
    try {
      const data = await getGodData();
      dispatch(setGods(data));
      return data;
    } catch (error: any) {
      dispatch(
        setGodsError(
          error?.message || 'Failed to fetch GodMantras from Firebase',
        ),
      );
      return [];
    }
  };
};

export default godSlice.reducer;
