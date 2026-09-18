import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFestivalData, Festival } from '@services/firebaseServices/getFestivalData';

export type { Festival };

export interface FestivalState {
  festivals: Festival[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: FestivalState = {
  festivals: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const festivalSlice = createSlice({
  name: 'festival',
  initialState,
  reducers: {
    setFestivals: (state, action: PayloadAction<Festival[]>) => {
      state.festivals = action.payload;
      state.loading = false;
      state.error = null;
      state.lastFetched = Date.now();
    },
    setFestivalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setFestivalError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearFestivals: state => {
      state.festivals = [];
      state.loading = false;
      state.error = null;
      state.lastFetched = null;
    },
  },
});

export const {
  setFestivals,
  setFestivalLoading,
  setFestivalError,
  clearFestivals,
} = festivalSlice.actions;

/**
 * Async thunk to fetch festivals from Firestore
 */
export const fetchFestivals = (forceRefresh: boolean = false) => {
  return async (dispatch: any) => {
    dispatch(setFestivalLoading(true));
    try {
      const data = await getFestivalData(forceRefresh);
      dispatch(setFestivals(data));
      return data;
    } catch (error: any) {
      dispatch(
        setFestivalError(
          error?.message || 'Failed to fetch festivals from Firebase',
        ),
      );
      return [];
    }
  };
};

export default festivalSlice.reducer;
