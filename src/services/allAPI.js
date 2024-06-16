import { commonRequest } from "./commonStructure";
import { baseUrl } from "./baseUrl";

// Function to add a new job
export const addJob = async (body) => {
    try {
        const response = await commonRequest('POST', `${baseUrl}/job`, body);
        return response.data; // Assuming your API returns data in a 'data' property
    } catch (error) {
        console.error('Error adding job:', error);
        throw error; // Propagate the error for handling in the component
    }
};

// Function to fetch a specific job by ID
export const fetchSimpleJob = async (id) => {
    try {
        const response = await commonRequest('GET', `${baseUrl}/job/${id}`);
        return response.data; // Assuming your API returns data in a 'data' property
    } catch (error) {
        console.error(`Error fetching job with ID ${id}:`, error);
        throw error; // Propagate the error for handling in the component
    }
};

export const fetchJob=async()=>{
    return await commonRequest('GET',`${baseUrl}/job`,{})
}

export const editJob=async(body,id)=>{
    return await commonRequest('PUT',`${baseUrl}/job/${id}`,body)
}


export const deleteJob=async(id)=>{
    return await commonRequest('DELETE',`${baseUrl}/job/${id}`,{})
}


export const applyJob=async(body)=>{
    return await commonRequest('POST',`${baseUrl}/apply`,body)
}

export const fetchAppliedJob=async()=>{
    return await commonRequest('GET',`${baseUrl}/apply`,{})
}

export const deleteAppliedJob=async(id)=>{
    return await commonRequest('DELETE',`${baseUrl}/apply/${id}`,{})
}