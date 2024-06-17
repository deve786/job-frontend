import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import jobSlice from './jobSlice';

const store = configureStore({
  reducer: {
    jobs: jobSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'jobs/fetchJobs/pending', 
          'jobs/fetchJobs/fulfilled', 
          'jobs/fetchJobs/rejected',
          'jobs/addNewJob/fulfilled',
          'jobs/editExistingJob/fulfilled',
          'jobs/deleteExistingJob/fulfilled'
        ],
      },
    }),
});

export default store;
