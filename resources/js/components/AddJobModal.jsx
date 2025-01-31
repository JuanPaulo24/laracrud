// AddJobModal.jsx (updated with formatted salary input)
import React from "react";
import { Modal, Form, Input, InputNumber, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import EmployerComboBox from "./EmployerComboBox.jsx";

const { Dragger } = Upload;

const AddJobModal = ({ open, onCancel, onOk }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = React.useState([]);

    const handleOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("salary", values.salary);
                formData.append("employer_id", values.employer_id);

                // Fix image handling
                if (values.image && values.image[0]?.originFileObj) {
                    formData.append("image", values.image[0].originFileObj);
                }

                try {
                    await onOk(formData);
                    form.resetFields(); // Clear form
                    setFileList([]); // Reset file list
                    onCancel(); // Close modal
                } catch (error) {
                    message.error(
                        error.response?.data?.message || "Failed to create job"
                    );
                }
            })
            .catch((error) => {
                console.log("Validation Error:", error);
            });
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("You can only upload image files!");
        }
        return isImage;
    };

    return (
        <Modal title="Add New Job" open={open} onOk={handleOk} onCancel={onCancel}>
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Job Title"
                    rules={[{ required: true, message: "Please input the job title!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="salary"
                    label="Salary"
                    rules={[{ required: true, message: "Please input the salary!" }]}
                >
                    <InputNumber
                        formatter={(value) => `$${value === '' ? '' : value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                        parser={(value) => value.replace(/\$|,/g, '')}
                    />
                </Form.Item>
                <Form.Item
                    name="employer_id"
                    label="Employer"
                    rules={[{ required: true, message: "Please select an employer!" }]}
                >
                    <EmployerComboBox />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Job Image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) return e;
                        return e?.fileList;
                    }}
                >
                    <Dragger
                        name="image"
                        multiple={false}
                        beforeUpload={beforeUpload}
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                        customRequest={({ file, onSuccess }) => {
                            setTimeout(() => onSuccess("ok"), 0);
                        }}
                        accept="image/*"
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single upload (max 2MB)
                        </p>
                    </Dragger>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddJobModal;
