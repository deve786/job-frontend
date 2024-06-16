import React, { useState, useEffect } from 'react';
import Modal from '../Components/Modal';
import { addJob, deleteJob, editJob, fetchJob } from '../services/allAPI';
import { Link } from 'react-router-dom';


function Admin() {
    const [modal, setModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Fetch jobs when the component mounts
        const fetchJobs = async () => {
            try {
                const response = await fetchJob();
                setJobs(response.data); // Assuming response.data is an array of jobs
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

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

    const handleDelete=async(id)=>{
        const data =await deleteJob(id)
        console.log(data);
    }

    const handleSave = async (jobData) => {
        try {
            if (selectedJob) {
                // Edit existing job
                await editJob(jobData, selectedJob.id);
                setJobs(jobs.map(job => job.id === selectedJob.id ? { ...job, ...jobData } : job));
            } else {
                // Add new job
                const newJob = await addJob(jobData);
                setJobs([...jobs, newJob]);
            }
        } catch (error) {
            console.error('Error saving job:', error);
        }
        toggleModal();
    };

    return (
        <div className='p-3'>
            <div className='flex justify-between items-center px-5 py-3'>
                <div className='font-semibold'>Welcome Admin</div>
                <div className='flex gap-3'>
                    <button onClick={handleAdd} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className='border py-1 px-8 rounded-2xl hover:bg-gray-200 font-semibold'>Add</button>
                    <Link to={'/applied'} ><button  className='border py-1 px-8 rounded-2xl hover:bg-gray-200 font-semibold'>Applied</button></Link>

                </div>
            </div>
            {
                jobs.map(job => (
                    <div key={job.id} className='mt-10 border py-4 px-6 shadow-lg'>
                        <div className='flex justify-between'>
                            <div className='font-semibold'>
                                {job.title}
                            </div>
                            <div className='flex gap-3'>
                                <button onClick={() => handleEdit(job)} className='border py-1 px-8 rounded-2xl hover:bg-gray-200 bg-green-400 hover:bg-green-500'>Edit</button>
                                <button onClick={()=>{handleDelete(job.id)}} className=' border py-1 px-8 rounded-2xl hover:bg-gray-200 bg-red-400 hover:bg-red-500'>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            }
            {modal && <Modal data={modal} toggleModal={toggleModal} jobData={selectedJob} onSave={handleSave} />}
        </div>
    );
}

export default Admin;