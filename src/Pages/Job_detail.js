import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { applyJob, fetchJob, fetchSimpleJob } from '../services/allAPI';

function Job_detail() {
    const { id } = useParams(); // Assuming your route is '/job-detail/:id'

    const [job, setJob] = useState(null); // State to hold job details

    useEffect(() => {
        const getJob = async () => {
            try {
                const data = await fetchSimpleJob(id); // Assuming fetchJob takes an id parameter
                setJob(data); // Update state with fetched job data
            } catch (error) {
                console.error('Error fetching job:', error);
                // Handle error fetching job data (e.g., show error message)
            }
        };

        getJob(); // Fetch job details when component mounts
    }, [id]); // Depend on id parameter changes to refetch job details

    if (!job) {
        // Render loading state or return null until job data is fetched
        return null; // You can also show a loading spinner or message here
    }

    function formatTimeAgo(timestamp) {
        const currentTime = Date.now();
        const differenceMs = currentTime - timestamp;
    
        // Convert milliseconds to minutes
        const minutesAgo = Math.floor(differenceMs / (1000 * 60));
    
        if (minutesAgo < 1) {
            return 'Just now';
        } else if (minutesAgo < 60) {
            return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
        } else {
            // Convert minutes to hours and remaining minutes
            const hoursAgo = Math.floor(minutesAgo / 60);
            const remainingMinutes = minutesAgo % 60;
    
            if (hoursAgo < 24) {
                return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
            } else {
                // Convert hours to days and remaining hours
                const daysAgo = Math.floor(hoursAgo / 24);
                return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
            }
        }
    }
    
    // Example usage:
    const timestamp = job.postedAt; // Replace with your timestamp in milliseconds
  const timeAgo=formatTimeAgo(timestamp)


    const handleApply=async()=>{
        const data=await applyJob(job)
        console.log(data);
    }

    return (
        <div className='p-3 px-6'>
            <div className='flex justify-between mb-3 px-8 py-4'>
                <h2 className='text-4xl font-bold'>{job.title}</h2>
                <button onClick={handleApply} className='border font-semibold py-1 text-white px-8 rounded-2xl bg-blue-700 hover:bg-blue-500 hover:text-black'>Apply</button>
            </div>
            <hr />
            <div className='flex gap-5'>
                <div className='w-1/2 mt-5'>
                    <h2 className='font-semibold text-xl mb-2 mt-3'>Job Description</h2>
                    <p>{job.description}</p>
                    <h2 className='font-semibold text-xl mb-2 mt-3'>Technical Skill Set:</h2>
                    <p>{job.technologies}</p>
                </div>
                <div className='w-1/2 mt-5'>
                    <div className='border rounded mb-2 mt-3 p-3'>
                        <h2 className='font-semibold text-xl mb-2'>More Details</h2>
                        <div className='flex flex-col font-semibold gap-4'>
                            <p className='flex items-center gap-2'><i className="fa-solid fa-dollar-sign"></i> {job.salary}</p>
                            <p className='flex items-center gap-2'><i className="fa-solid fa-location-dot"></i> {job.location}</p>
                            <p className='flex items-center gap-2'><i className="fa-solid fa-suitcase"></i> {job.experience}</p>
                            <p className='flex items-center gap-2'><i className="fa-regular fa-clock"></i> {timeAgo}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Job_detail;
