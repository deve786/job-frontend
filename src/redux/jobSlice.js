import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobApi, addJobApi, editJobApi, deleteJobApi } from "../services/allAPI"; 

//  fetching jobs
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await fetchJobApi();
  return response.data; 
});

//  adding a new job
export const addNewJob = createAsyncThunk('jobs/addNewJob', async (jobData) => {
  const response = await addJobApi(jobData);
  return response.data; 
});

//  edit  existing job
export const editExistingJob = createAsyncThunk('jobs/editExistingJob', async ({ jobData, jobId }) => {
  const response = await editJobApi(jobData, jobId);
  return { jobId, jobData: response.data }; 
});

//  deleting an existing job
export const deleteExistingJob = createAsyncThunk('jobs/deleteExistingJob', async (jobId) => {
  await deleteJobApi(jobId);
  return jobId; 
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
      builder.addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.alljobs = action.payload;
        state.error = "";
      })
      builder.addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.alljobs = [];
        state.error = action.error.message;
      })
      builder.addCase(addNewJob.fulfilled, (state, action) => {
        state.alljobs.push(action.payload);
      })
      builder.addCase(editExistingJob.fulfilled, (state, action) => {
        const { jobId, jobData } = action.payload;
        const existingJobIndex = state.alljobs.findIndex(job => job.id === jobId);
        if (existingJobIndex !== -1) {
          state.alljobs[existingJobIndex] = { ...state.alljobs[existingJobIndex], ...jobData };
        }
      })
      builder.addCase(deleteExistingJob.fulfilled, (state, action) => {
        state.alljobs = state.alljobs.filter(job => job.id !== action.payload);
      });
  },
});

export default jobSlice.reducer;
