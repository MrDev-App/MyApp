import festivalReducer from './slices/festivalSlice';
import godReducer from './slices/godSlice';
import japReducer from './slices/japSlice';
import categoriesReducer from './slices/categoriesSlice';

export const reducers = {
  festival: festivalReducer,
  gods: godReducer,
  jap: japReducer,
  categories: categoriesReducer,
};

export default reducers;
