import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/jobSlice';

function Jobs() {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs.alljobs);
  const loading = useSelector(state => state.jobs.loading);
  const error = useSelector(state => state.jobs.error);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='p-3'>
      <div className='mb-3'>
        <input 
          type='text' 
          placeholder='Search...' 
          value={searchTerm} 
          onChange={handleSearchChange} 
          className='p-2 border border-gray-300 rounded'
        />
      </div>

      <div className='flex gap-3 justify-center flex-wrap'>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && filteredJobs.map(i => (
          <Card key={i.id} data={i} />
        ))}
      </div>
    </div>
  );
}

export default Jobs;
