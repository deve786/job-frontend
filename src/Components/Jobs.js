import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/jobSlice';
import Card from './Card'; 

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs.alljobs);
  const loading = useSelector(state => state.jobs.loading);
  const error = useSelector(state => state.jobs.error);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className='p-3 flex gap-3 justify-center flex-wrap'>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {jobs && jobs.map(job => (
        <Card key={job.id} data={job} />
      ))}
    </div>
  );
};

export default Jobs;
