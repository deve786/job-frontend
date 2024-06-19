import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Components/Modal';
import { Link } from 'react-router-dom';
import { fetchJobs, addNewJob, editExistingJob, deleteExistingJob } from '../redux/jobSlice';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAppliedJobApi } from '../services/allAPI';

function Admin() {
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobs.alljobs);
    const loading = useSelector(state => state.jobs.loading);
    const error = useSelector(state => state.jobs.error);

    const [modal, setModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobAdded, setJobAdded] = useState(false); // State to trigger refresh

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch, jobAdded]); // Include jobAdded in dependencies

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
    
        toast.success('Job deleted successfully!', {
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
    };

    const handleSave = (jobData) => {
        if (selectedJob) {
            dispatch(editExistingJob({ jobData, jobId: selectedJob.id }));
            toast.success('Job edited successfully!', {
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
        } else {
            dispatch(addNewJob(jobData));
            toast.success('Job added successfully!', {
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
            setJobAdded(true); 
            
        }
        toggleModal();
    };

    return (
        <div className='p-3'>
            <div className='flex justify-between items-center px-5 py-3 mb-5'>
                <div className='font-semibold text-2xl'>Welcome Admin</div>
                <div className='flex gap-3'>
                    <button onClick={handleAdd}>
                        <div className="flex items-center justify-center flex-1 h-full p-2 bg-blue-800 text-white shadow rounded-full">
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                        </div>
                    </button>
                    <Link to={'/applied'}>
                        <button className='border bg-yellow-500 py-1 px-8 rounded-2xl hover:bg-yellow-300 font-semibold'>Applied</button>
                    </Link>
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
                                    <button onClick={() => handleEdit(job)} className='border py-1 sm:px-8 px-3 rounded-2xl hover:bg-gray-200 bg-green-400 hover:bg-green-500'>Edit</button>
                                    <button onClick={() => handleDelete(job.id)} className='border py-1 sm:px-8 px-3 rounded-2xl hover:bg-gray-200 bg-red-400 hover:bg-red-500'>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                ))
            ) : (
                <h2 className='font-semibold text-xl'>No jobs found..</h2>
            )}
            {modal && <Modal toggleModal={toggleModal} jobData={selectedJob} onSave={handleSave} />}
        </div>
    );
}

export default Admin;
