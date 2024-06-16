import React, { useEffect, useState } from 'react'
import Card from './Card'
import { fetchJob } from '../services/allAPI'

function Jobs() {
  const [fetchJobs, setFetchJobs] = useState([])

  const getJob = async () => {
    const jobs = await fetchJob()
    console.log(jobs.data);
    setFetchJobs(jobs.data)
  }

  useEffect(() => {
    getJob()
  }, [])

  return (
    <div className='p-3 flex gap-3 justify-center flex-wrap' >
      {
        fetchJobs.map(job => (
          <Card data={job} />
        ))

      }

    </div>
  )
}

export default Jobs