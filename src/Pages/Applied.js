import React, { useEffect, useState } from 'react';
import { deleteAppliedJobApi, fetchAppliedJobApi } from '../services/allAPI';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Applied() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const fetchAppliedJobs = async () => {
    try {
      const response = await fetchAppliedJobApi();
      setAppliedJobs(response.data);
    } catch (error) {
      toast.error('Failed to fetch applied jobs', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppliedJobApi(id);
      toast.success('Job application deleted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      fetchAppliedJobs();
    } catch (error) {
      toast.error('Failed to delete job application', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <div className='p-3'>
      <ToastContainer />
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job) => (
          <div key={job.id} className='mt-10 border py-4 px-6 shadow-lg'>
            <div className='flex justify-between'>
              <div className='font-semibold'>{job.title}</div>
              <div className='flex gap-3'>
                <button
                  onClick={() => handleDelete(job.id)}
                  className='border py-1 px-8 rounded-2xl hover:bg-gray-200 bg-red-400 hover:bg-red-500'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className='font-semibold text-xl'>No Jobs Applied</h1>
      )}
    </div>
  );
}

export default Applied;
