import React, { useEffect } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/jobSlice';

function Jobs() {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs.alljobs); // Corrected selector
  const loading = useSelector(state => state.jobs.loading); // Corrected selector
  const error = useSelector(state => state.jobs.error); // Corrected selector

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className='p-3 flex gap-3 justify-center flex-wrap'>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && jobs && jobs.map(i => (
        <Card key={i.id} data={i} />
      ))}
    </div>
  );
}

export default Jobs;
