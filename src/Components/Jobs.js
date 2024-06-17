import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/jobSlice';

function Jobs() {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs.alljobs); // Corrected selector
  const loading = useSelector(state => state.jobs.loading); // Corrected selector
  const error = useSelector(state => state.jobs.error); // Corrected selector
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='p-3 flex gap-3 justify-center flex-wrap'>
      <div className='w-full flex justify-center mb-3'>
        <input
          type='text'
          placeholder='Search jobs...'
          value={searchQuery}
          onChange={handleSearchChange}
          className='px-4 py-2 border rounded w-1/2'
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && filteredJobs && filteredJobs.map(i => (
        <Card key={i.id} data={i} />
      ))}
    </div>
  );
}

export default Jobs;
