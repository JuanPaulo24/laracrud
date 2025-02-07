import React, { useState } from "react";
import { Card, Button, Space, Modal, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useJobManager } from "./JobManager.jsx";
import EditJobModal from "./EditJobModal.jsx";
import AddJobModal from "./AddJobModal.jsx";

// Styled components
const Layout = ({ children }) => (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "1110px",
    }}>
        {children}
    </div>
);

const CardContainer = ({ children }) => (
    <div style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 350px)",
        gap: "30px",
        marginBottom: "3rem"
    }}>
        {children}
    </div>
);

const StyledCard = ({ children }) => (
    <Card style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "6px",
        transition: "all 0.3s ease",
        padding: "8px",
        height: "240px",
        position: "relative",
    }}>
        {children}
    </Card>
);

const AddButton = ({ onClick }) => (
    <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onClick}
        style={{
            backgroundColor: "#5964E0",
            marginTop: "2rem",
            marginBottom: "2rem",
            height: "48px",
            borderRadius: "5px",
            fontFamily: "Kumbh Sans",
            fontWeight: "bold",
            fontSize: "16px",
        }}
    >
        Add Job
    </Button>
);
const ArchiveButton = ({ onClick, isArchived }) => (
    <Button
        type="primary"
        icon={isArchived ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        onClick={onClick}
        style={{
            backgroundColor: "#5964E0",
            marginTop: "2rem",
            marginBottom: "2rem",
            height: "48px",
            borderRadius: "5px",
            fontFamily: "Kumbh Sans",
            fontWeight: "bold",
            fontSize: "16px",
        }}
    >
        {isArchived ? "Hide Archive" : "Show Archive"}
    </Button>
);

// Single JobCard component definition
const JobCard = ({ job, onEdit, onDelete }) => (
    <StyledCard>
        <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "17px" }}>
                <h3 style={titleStyle}>{job.title}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem"}}>
                    <span style={salaryStyle}>{job.salary}</span>
                    <h4 style={{fontSize: "16px", fontWeight: "normal", fontFamily: "Kumbh Sans", color: "#6E8198"}}>
                        {job.employer?.name}
                    </h4>
                </div>
            </div>
            <Space style={{position: "absolute", bottom: "32px"}}>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(job)}
                    style={{ backgroundColor: "#5964E0", fontFamily: "Kumbh Sans"}}
                >
                    Edit
                </Button>
                <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete(job.id)}
                    style={{ fontFamily: "Kumbh Sans"}}
                    danger
                >
                    Delete
                </Button>
            </Space>
        </div>
    </StyledCard>
);

// Style constants
const titleStyle = {
    margin: 0,
    maxWidth: "255px",
    fontStyle: "Kumbh Sans, sans-serif",
    fontWeight: "bold",
    fontSize: "20px",
};

const salaryStyle = {
    color: "#5964E0",
    fontWeight: 700,
    fontFamily: "Kumbh Sans, sans-serif",
    fontSize: "14px",

};

function JobCards() {
    const { jobs, deleteJob, editJob, addJob, editingJob, setEditingJob, refetchJobs, refetchArchivedJobs } = useJobManager();
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Add pagination state
    const [isArchived, setIsArchived] = useState(false);
    const pageSize = 6; // Items per page

    // Calculate current jobs to show
    const currentJobs = jobs.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const toggleArchive = () => {
        if (isArchived) {
            refetchJobs; // Switch back to active jobs
        } else {
            refetchArchivedJobs(); // Fetch archived jobs
        }
        setIsArchived(!isArchived);
    };

    const handleEdit = (job) => setEditingJob(job);

    const handleDelete = (jobId) => {
        Modal.confirm({
            title: "Are you sure you want to delete this job?",
            content: "This action cannot be undone.",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => deleteJob(jobId)
        });
    };
    const handleAddJob = (newJob) => {
        addJob(newJob);
        setIsAddModalVisible(false);
    };

    return (
        <Layout>

            <div className="flex gap-4">
                <AddButton onClick={() => setIsAddModalVisible(true)} />
                <ArchiveButton onClick={toggleArchive} isArchived={isArchived} />
            </div>

            <CardContainer>
                {currentJobs.map((job) => ( // Changed from jobs to currentJobs
                    <JobCard
                        key={job.id}
                        job={job}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </CardContainer>

            {/* Add Pagination */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                marginTop: '1rem'
            }}>
                <Pagination
                    current={currentPage}
                    total={jobs.length}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                    style={{ marginBottom: '2rem' }}
                />
            </div>

            <EditJobModal
                open={!!editingJob}
                onCancel={() => setEditingJob(null)}
                onOk={editJob}
                initialValues={editingJob ? {
                    ...editingJob,
                    employer_id: editingJob.employer?.id // Correctly pass employer_id
                } : null}
            />

            <AddJobModal
                open={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                onOk={handleAddJob}
            />
        </Layout>
    );
}

export default JobCards;
