import {Select, Button, Space, Typography} from 'antd';
import {useJobManager} from './views/private/PageJob/JobManager.jsx';

const {Text} = Typography;

const priceRanges = [
    {label: '$10-$100', value: '10-100'},
    {label: '$100-$1000', value: '100-1000'},
    {label: '$1000-$5000', value: '1000-5000'},
    {label: '$5000+', value: '5000-plus'},
];

const JobFilters = ({
                        selectedPriceRange,
                        selectedEmployers,
                        onPriceRangeChange,
                        onEmployersChange,
                        onClearFilters
                    }) => {
    const {employers = []} = useJobManager();

    return (
        <Space direction="vertical" style={{width: '100%', marginBottom: '1rem'}}>
            <Space>
                <Select
                    placeholder="Filter by Price Range"
                    style={{width: 200}}
                    value={selectedPriceRange}
                    onChange={onPriceRangeChange}
                    options={priceRanges}
                    allowClear
                />

                <Select
                    mode="multiple"
                    placeholder="Filter by Employer"
                    style={{width: 300}}
                    value={selectedEmployers}
                    onChange={onEmployersChange}
                    options={employers.map(employer => ({
                        label: employer?.name || 'Unknown Employer',
                        value: employer?.id
                    }))}
                    allowClear
                />

                <Button onClick={onClearFilters}>
                    Clear Filters
                </Button>
            </Space>

            {(selectedPriceRange || selectedEmployers.length > 0) && (
                <Text type="secondary">
                    Active filters: {selectedPriceRange ? 'Price range' : ''}
                    {selectedPriceRange && selectedEmployers.length > 0 ? ' + ' : ''}
                    {selectedEmployers.length > 0 ? `${selectedEmployers.length} employers` : ''}
                </Text>
            )}
        </Space>
    );
};

export default JobFilters;
