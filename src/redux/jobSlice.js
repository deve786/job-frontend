import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobApi, addJobApi, editJobApi, deleteJobApi } from "../services/allAPI"; 

// Async thunk for fetching jobs
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await fetchJobApi();
  return response.data; // Assuming response.data is an array of jobs
});

// Async thunk for adding a new job
export const addNewJob = createAsyncThunk('jobs/addNewJob', async (jobData) => {
  const response = await addJobApi(jobData);
  return response.data; // Assuming response.data is the newly added job
});

// Async thunk for editing an existing job
export const editExistingJob = createAsyncThunk('jobs/editExistingJob', async ({ jobData, jobId }) => {
  const response = await editJobApi(jobData, jobId);
  return { jobId, jobData: response.data }; // Assuming response.data is the updated job data
});

// Async thunk for deleting an existing job
export const deleteExistingJob = createAsyncThunk('jobs/deleteExistingJob', async (jobId) => {
  await deleteJobApi(jobId);
  return jobId; // Return jobId that was deleted
});

// Slice
const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    loading: false,
    alljobs: [],
    error: ""
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.alljobs = action.payload;
        state.error = "";
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.alljobs = [];
        state.error = action.error.message;
      })
      .addCase(addNewJob.fulfilled, (state, action) => {
        state.alljobs.push(action.payload);
      })
      .addCase(editExistingJob.fulfilled, (state, action) => {
        const { jobId, jobData } = action.payload;
        const existingJobIndex = state.alljobs.findIndex(job => job.id === jobId);
        if (existingJobIndex !== -1) {
          state.alljobs[existingJobIndex] = { ...state.alljobs[existingJobIndex], ...jobData };
        }
      })
      .addCase(deleteExistingJob.fulfilled, (state, action) => {
        state.alljobs = state.alljobs.filter(job => job.id !== action.payload);
      });
  },
});

export default jobSlice.reducer;
