import React, { useState } from "react";
import { Card, Button, Space, Modal, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useJobManager } from "./JobManager.jsx";
import EditJobModal from "./EditJobModal.jsx";
import AddJobModal from "./AddJobModal.jsx";

// Styled components
const Layout = ({ children }) => (
    <div style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20vh"
    }}>
        {children}
    </div>
);

const CardContainer = ({ children }) => (
    <div style={{
        maxWidth: "1200px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        paddingBottom: "3rem"
    }}>
        {children}
    </div>
);

const StyledCard = ({ children }) => (
    <Card style={{
        background: "white",
        borderRadius: "20px",
        transition: "all 0.3s ease",
        border: "2px solid #5CA5A5"
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
            backgroundColor: "#40cbb5",
            borderColor: "#40cbb5",
            marginBottom: "2rem"
        }}
    >
        Add Job
    </Button>
);

// Single JobCard component definition
const JobCard = ({ job, onEdit, onDelete }) => (
    <StyledCard>
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem"
        }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <h3 style={titleStyle}>{job.title}</h3>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={salaryStyle}>{job.salary}</span>
                    <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 500 }}>
                        {job.employer?.name}
                    </h4>
                </div>
            </div>
            <Space>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(job)}
                    style={{ backgroundColor: "#40cbb5", borderColor: "#40cbb5" }}
                >
                    Edit
                </Button>
                <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete(job.id)}
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
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: 0,
    maxWidth: "9rem"
};

const salaryStyle = {
    color: "#40cbb5",
    fontWeight: 600
};

function JobCards() {
    const { jobs, deleteJob, editJob, addJob, editingJob, setEditingJob } = useJobManager();
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Add pagination state
    const pageSize = 2; // Items per page

    // Calculate current jobs to show
    const currentJobs = jobs.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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
            <AddButton onClick={() => setIsAddModalVisible(true)} />

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
