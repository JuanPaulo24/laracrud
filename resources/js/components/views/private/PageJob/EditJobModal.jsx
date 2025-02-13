import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { useJobManager } from "./JobManager.jsx";
import EmployerComboBox from "./EmployerComboBox.jsx";
import AvatarUpload from "./AvatarUpload.jsx";

const EditJobModal = ({ open, onCancel, onOk, initialValues }) => {
    const [form] = Form.useForm();
    const { employers = [] } = useJobManager();

    useEffect(() => {
        if (initialValues) {
            // Transform image for Ant Design Upload component
            const fileList = initialValues.image ? [{
                uid: '-1',
                name: 'current-image',
                status: 'done',
                url: initialValues.image,
                thumbUrl: initialValues.image,
            }] : [];

            form.setFieldsValue({
                ...initialValues,
                image: fileList
            });
        }
    }, [initialValues, form]);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                onOk({
                    ...initialValues,
                    ...values
                });
                form.resetFields();
            })
            .catch((error) => {
                Modal.error({ title: "Validation Failed", content: error.message });
            });
    };

    return (
        <Modal title="Edit Job" open={open} onOk={handleOk} onCancel={onCancel}>
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="employer_id"
                    label="Employer"
                    rules={[{ required: true }]}
                >
                    <EmployerComboBox />
                </Form.Item>
                {/* Add Image Upload Field */}
                <Form.Item
                    name="image"
                    label="Job Image"
                    extra={initialValues?.image && (
                        <div style={{ marginTop: 16 }}>
                            <span>Current Image: </span>
                            <img
                                src={initialValues.image}
                                alt="Current job"
                                style={{ maxWidth: 100, maxHeight: 100 }}
                            />
                        </div>
                    )}
                >
                    <AvatarUpload />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditJobModal;

