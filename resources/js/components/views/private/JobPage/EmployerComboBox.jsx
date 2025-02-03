import React from 'react';
import { Select } from 'antd';
import { useJobManager } from './JobManager.jsx';

// EmployerComboBox.jsx
const EmployerComboBox = ({ value, onChange }) => {
    const { employers = [], jobs = [] } = useJobManager();

    const employerOptions = employers.length > 0
        ? employers
        : [...new Map(jobs
            .map(job => job.employer)
            .filter(Boolean)
            .map(employer => [employer.id, employer]))
            .values()];

    return (
        <Select
            showSearch
            placeholder="Select Employer"
            value={value}
            onChange={onChange}
            filterOption={(input, option) =>
                option?.children?.toLowerCase()?.includes(input.toLowerCase())
            }
        >
            {employerOptions.map(employer => (
                <Select.Option
                    key={employer?.id}
                    value={employer?.id} // Use ID as the value
                >
                    {employer?.name || 'Untitled Employer'}
                </Select.Option>
            ))}
        </Select>
    );
};

export default EmployerComboBox;
