import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { fetchJobs } from '../redux/jobSlice';

function Jobs() {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs.alljobs);
  const loading = useSelector(state => state.jobs.loading);
  const error = useSelector(state => state.jobs.error);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  // Handle sort change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Filter and sort jobs based on the state
  const filteredJobs = jobs
    .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(job => (filterCriteria ? job.type === filterCriteria : true))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded"
        />
        <select onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Types</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
        </select>
        <select onChange={handleSortChange} className="border p-2 rounded">
          <option value="asc">Sort by Date (Ascending)</option>
          <option value="desc">Sort by Date (Descending)</option>
        </select>
      </div>
      <div className='flex justify-center flex wrap gap-3'>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && filteredJobs.map(job => (
          <Card key={job.id} data={job} />
        ))}
      </div>
    </div>
  );
}

export default Jobs;
