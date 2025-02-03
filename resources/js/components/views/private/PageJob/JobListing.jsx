import { useState } from "react";
import { Card, Button, Space, Modal, Pagination } from "antd";
import { useJobManager } from "./JobManager.jsx";


// Styled components
const Layout = ({ children }) => (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "1110px",
    }}
        className={"mt-12"}
    >
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
        </div>
    </StyledCard>
);

function JobListing() {
    const { jobs } = useJobManager();
    const [currentPage, setCurrentPage] = useState(1); // Add pagination state
    const pageSize = 6; // Items per page

    // Calculate current jobs to show
    const currentJobs = jobs.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <Layout>
            <CardContainer>
                {currentJobs.map((job) => ( // Changed from jobs to currentJobs
                    <JobCard
                        key={job.id}
                        job={job}
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
        </Layout>
    );
}

export default JobListing;
