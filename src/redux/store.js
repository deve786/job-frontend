import { configureStore } from '@reduxjs/toolkit';

import jobSlice from './jobSlice';

const store = configureStore({
  reducer: {
    jobs: jobSlice,
  },
});

export default store;
