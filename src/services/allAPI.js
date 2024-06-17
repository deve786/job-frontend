import { commonRequest } from "./commonStructure";
import { baseUrl } from "./baseUrl";

// Function to add a new job
export const addJobApi = async (body) => {
    try {
        const response = await commonRequest('POST', `${baseUrl}/job`, body);
        return response.data; // Assuming your API returns data in a 'data' property
    } catch (error) {
        console.error('Error adding job:', error);
        throw error; // Propagate the error for handling in the component
    }
};

// Function to fetch a specific job by ID
export const fetchSimpleJobApi = async (id) => {
    try {
        const response = await commonRequest('GET', `${baseUrl}/job/${id}`);
        return response.data; // Assuming your API returns data in a 'data' property
    } catch (error) {
        console.error(`Error fetching job with ID ${id}:`, error);
        throw error; // Propagate the error for handling in the component
    }
};

export const fetchJobApi=async()=>{
    return await commonRequest('GET',`${baseUrl}/job`,{})
}

export const editJobApi=async(body,id)=>{
    return await commonRequest('PUT',`${baseUrl}/job/${id}`,body)
}


export const deleteJobApi=async(id)=>{
    return await commonRequest('DELETE',`${baseUrl}/job/${id}`,{})
}


export const applyJobApi=async(body)=>{
    return await commonRequest('POST',`${baseUrl}/apply`,body)
}

export const fetchAppliedJobApi=async()=>{
    return await commonRequest('GET',`${baseUrl}/apply`,{})
}

export const deleteAppliedJobApi=async(id)=>{
    return await commonRequest('DELETE',`${baseUrl}/apply/${id}`,{})
}