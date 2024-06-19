import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Components/Modal';
import { Link } from 'react-router-dom';
import { fetchJobs, addNewJob, editExistingJob, deleteExistingJob } from '../redux/jobSlice';

function Admin() {
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobs.alljobs);
    const loading = useSelector(state => state.jobs.loading);
    const error = useSelector(state => state.jobs.error);

    const [modal, setModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleAdd = () => {
        setSelectedJob(null);
        dispatch(fetchJobs())
        toggleModal();
    };

    const handleEdit = (job) => {
        setSelectedJob(job);
        toggleModal();
    };

    const handleDelete = (id) => {
        dispatch(deleteExistingJob(id));
    };

    const handleSave = (jobData) => {
        if (selectedJob) {
            dispatch(editExistingJob({ jobData, jobId: selectedJob.id }));
        } else {
            dispatch(addNewJob(jobData));
        }
        toggleModal();
    };

    return (
        <div className='p-3'>
            <div className='flex justify-between items-center px-5 py-3 mb-5'>
                <div className='font-semibold text-2xl'>Welcome Admin</div>
                <div className='flex gap-3'>
                    <button>
                        <div onClick={handleAdd} class="flex items-center justify-center flex-1 h-full p-2 bg-blue-800 text-white shadow rounded-full">
                            <div class="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                        </div>
                    </button>

                    <Link to={'/applied'}><button className='border bg-yellow-500 py-1 px-8 rounded-2xl hover:bg-yellow-300 font-semibold'>Applied</button></Link>
                </div>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {jobs && jobs.length > 0 ? (
                jobs.map(job => (
                    job && (
                        <div key={job.id} className='mt-10 border py-4 px-6 shadow-lg'>
                            <div className='flex justify-between'>
                                <div className='font-semibold'>
                                    {job.title}
                                </div>
                                <div className='flex gap-3'>
                                    <button onClick={() => handleEdit(job)} className='border py-1 px-8 rounded-2xl hover:bg-gray-200 bg-green-400 hover:bg-green-500'>Edit</button>
                                    <button onClick={() => handleDelete(job.id)} className=' border py-1 px-8 rounded-2xl hover:bg-gray-200 bg-red-400 hover:bg-red-500'>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                ))
            ) : (
                <h2 className='font-semibold text-xl'>No jobs found..</h2>
            )}
            {modal && <Modal data={modal} toggleModal={toggleModal} jobData={selectedJob} onSave={handleSave} />}
        </div>
    );
}

export default Admin;
