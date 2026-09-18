import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategoriesData, Category, CategoryItem } from '@services/firebaseServices/categoriesService';

export type { Category, CategoryItem };

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
      state.lastFetched = Date.now();
    },
    setCategoriesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setCategoriesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCategories,
  setCategoriesLoading,
  setCategoriesError,
} = categoriesSlice.actions;

/**
 * Async thunk to fetch categories and local Aarti items from Firestore
 */
export const fetchCategories = () => {
  return async (dispatch: any) => {
    dispatch(setCategoriesLoading(true));
    try {
      const data = await getCategoriesData();
      dispatch(setCategories(data));
      return data;
    } catch (error: any) {
      dispatch(
        setCategoriesError(
          error?.message || 'Failed to fetch categories from Firebase',
        ),
      );
      return [];
    }
  };
};

export default categoriesSlice.reducer;
