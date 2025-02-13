import { useState, useEffect } from "react";
import axios from "axios";

export const useJobManager = () => {
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null); // Should be null initially
    const [employers, setEmployers] = useState([]);

    // Get All Employers
    const fetchEmployers = async () => {
        try {
            const response = await axios.get('/api/employers');
            setEmployers(response.data.employers || []); // Add fallback to empty array
        } catch (error) {
            console.error('Error fetching employers:', error);
            setEmployers([]); // Ensure employers is always an array
        }
    };

    // Get all jobs
    const refetchJobs = async () => {
        try {
            const response = await axios.get('/api/jobs');
            setJobs(response.data.jobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

//   /api/jobs?only_trashed=1
    const refetchArchivedJobs = async () => {
        try {
            const response = await axios.get('/api/jobs?only_trashed=1');
            setJobs(response.data.jobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    // Initial fetch
    useEffect(() => {
        refetchJobs();
        fetchEmployers(); // Fetch employers on mount
    }, []);

    // Delete job
    const deleteJob = async (jobId) => {
        try {
            await axios.delete(`/api/jobs/${jobId}`);
            await refetchJobs();  // Refresh list after delete
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    // Update job
// In JobManager.jsx, update the editJob function:
    const editJob = async (updatedJob) => {
        try {
            const formData = new FormData();
            formData.append('_method', 'PUT'); // Laravel method spoofing
            formData.append('title', updatedJob.title);
            formData.append('salary', updatedJob.salary);
            formData.append('employer_id', updatedJob.employer_id);


            if (updatedJob.image && updatedJob.image.length > 0) {
                const imageFile = updatedJob.image[0].originFileObj;
                if (imageFile instanceof File) {
                    formData.append('image', imageFile);
                }
            }

            await axios.post(`/api/jobs/${updatedJob.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            await refetchJobs();
            setEditingJob(null);
        } catch (error) {
            console.error("Error updating job:", error);
            throw error; // Rethrow to handle in the modal
        }
    };

    // Create job
    const addJob = async (newJob) => {
        try {
            // Use proper headers for FormData
            await axios.post("/api/jobs", newJob, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await refetchJobs();
        } catch (error) {
            console.error("Error adding job:", error);
            throw error; // Rethrow to handle in the modal
        }
    };

    const restoreJob = async (jobId) => {
        try {
            await axios.patch(`/api/jobs/${jobId}/restore`);
            await refetchArchivedJobs();  // Refresh list after restore
        } catch (error) {
            console.error("Error restoring job:", error);
        }
    };


    return {
        jobs,
        deleteJob,
        editJob,
        addJob,
        restoreJob,
        refetchArchivedJobs,
        refetchJobs,
        employers,
        editingJob,
        setEditingJob
    };
};
