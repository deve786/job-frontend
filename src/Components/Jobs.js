import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/jobSlice';
import Card from './Card'; 

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs.alljobs);
  const loading = useSelector(state => state.jobs.loading);
  const error = useSelector(state => state.jobs.error);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.technologies.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort jobs based on the selected option
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'date') {
      return new Date(b.postedAt) - new Date(a.postedAt);
    }
    return 0;
  });

  return (
    <div className='p-3'>
      <div className='flex gap-2  justify-center mb-5'>
        <input 
          type='text'
          placeholder='Search jobs...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='border p-2 rounded outline-none'
        />
        <select 
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='border p-2 rounded outline-none'
        >
          <option value='default'>Sort by</option>
          <option value='title'>Title</option>
          <option value='date'>Date</option>
        </select>
      </div>
      <div className='flex gap-3 justify-center flex-wrap'>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {sortedJobs && sortedJobs.map(job => (
          <Card key={job.id} data={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
