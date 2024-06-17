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
    console.log(jobs);
    return (
        <div className='p-3'>
            <div className='flex justify-between items-center px-5 py-3 mb-5'>
                <div className='font-semibold text-2xl'>Welcome Admin</div>
                <div className='flex gap-3'>
                    <button onClick={handleAdd} className='border py-1 px-8 rounded-2xl hover:bg-gray-200 font-semibold bg-blue-500'>Add</button>
                    <Link to={'/applied'}><button className='border bg-yellow-500 py-1 px-8 rounded-2xl hover:bg-gray-200 font-semibold'>Applied</button></Link>
                </div>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {jobs.length > 0 ? (
                jobs.map(job => (
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
                ))
            ) : (
                <h2 className='font-semibold text-xl'>No jobs found..</h2>
            )}
            {modal && <Modal data={modal} toggleModal={toggleModal} jobData={selectedJob} onSave={handleSave} />}
        </div>
    );
}

export default Admin;
