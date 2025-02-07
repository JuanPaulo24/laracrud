// EditJobModal.jsx (updated)
import React from "react";
import { useEffect } from "react";
import {Modal, Form, Input, InputNumber} from "antd";
import { useJobManager } from "./JobManager.jsx";
import EmployerComboBox from "./EmployerComboBox.jsx";

const EditJobModal = ({ open, onCancel, onOk, initialValues }) => {
    const [form] = Form.useForm();
    const { employers = [] } = useJobManager(); // Default empty array

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                onOk({
                    ...initialValues, // Use initialValues from props
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
                    <InputNumber
                        formatter={(value) => {
                            // Check if the value already starts with ₱
                            if (value.startsWith('₱')) {
                                return value;
                            }
                            return `₱${value === '' ? '' : value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
                        }}
                        parser={(value) => value.replace(/\₱|,/g, '')}
                    />
                </Form.Item>
                <Form.Item
                    name="employer_id"
                    label="Employer"
                    rules={[{ required: true }]}
                >
                    <EmployerComboBox />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditJobModal;
