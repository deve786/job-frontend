import React, { useState, useEffect } from 'react';

function Modal({ toggleModal, jobData, onSave }) {
    const [form, setForm] = useState({
        title: '',
        company: '',
        experience: '',
        salary:'',
        location: '',
        description: '',
        technologies: '',
        postedAt: Date.now()
    });

    useEffect(() => {
        if (jobData) {
            setForm({
                title: jobData.title,
                company: jobData.company,
                experience: jobData.experience,
                salary: jobData.salary,
                location: jobData.location,
                description: jobData.description,
                technologies: jobData.technologies,
                postedAt: jobData.postedAt
            });
        } else {
            setForm({
                title: '',
                company: '',
                experience: '',
                salary: '',
                location: '',
                description: '',
                technologies: '',
                postedAt: Date.now()
            });
        }
    }, [jobData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={toggleModal}></div>
            <div className="relative bg-white rounded-lg shadow-lg w-1/2 max-w-lg">
                <header className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">{jobData ? 'Edit Job' : 'Add Job'}</h3>
                    <button className="text-gray-500 hover:text-gray-700" aria-label="close" onClick={toggleModal}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </header>
                <section className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Job Title</label>
                            <input className="mt-1 px-3 py-1 border block w-full outline-none rounded-md shadow-sm" type="text" name="title" value={form.title} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Company</label>
                            <input className="mt-1 px-3 py-1 outline-none border block w-full border-gray-300 rounded-md shadow-sm" type="text" name="company" value={form.company} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Experience</label>
                            <input className="mt-1 px-3 py-1 outline-none border block w-full border-gray-300 rounded-md shadow-sm" type="text" name="experience" value={form.experience} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                            <input className="mt-1 px-3 py-1 outline-none border block w-full border-gray-300 rounded-md shadow-sm" type="text" name="salary" value={form.salary} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input className="mt-1 block w-full px-3 py-1 border outline-none border-gray-300 rounded-md shadow-sm" type="text" name="location" value={form.location} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea className="mt-1 px-3 py-1  outline-none border block w-full border-gray-300 rounded-md shadow-sm" name="description" value={form.description} onChange={handleChange} required></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Technologies</label>
                            <input className="mt-1 px-3 py-1 border outline-none block w-full border-gray-300 rounded-md shadow-sm" type="text" name="technologies" value={form.technologies} onChange={handleChange} required />
                        </div>
                        <footer className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" type="submit">Save changes</button>
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600" type="button" onClick={toggleModal}>Cancel</button>
                        </footer>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Modal;
