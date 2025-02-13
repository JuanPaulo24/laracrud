import React from "react";
import { Modal, Form, Input, InputNumber, message } from "antd";
import EmployerComboBox from "./EmployerComboBox.jsx";
import AvatarUpload from "./AvatarUpload";

const AddJobModal = ({ open, onCancel, onOk }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                if (values.salary && !String(values.salary).startsWith("₱")) {
                    values.salary = `₱${String(values.salary).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                    )}`;
                }

                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("salary", values.salary);
                formData.append("employer_id", values.employer_id);

                if (values.image && values.image[0]?.originFileObj) {
                    formData.append("image", values.image[0].originFileObj);
                }

                try {
                    await onOk(formData);
                    form.resetFields();
                    onCancel();
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

    return (
        <Modal title="Add New Job" open={open} onOk={handleOk} onCancel={onCancel}>
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Job Title"
                    rules={[
                        { required: true, message: "Please input the job title!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="salary"
                    label="Salary"
                    rules={[
                        { required: true, message: "Please input the salary!" },
                    ]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        formatter={(value) =>
                            `₱${
                                value === "" ? "" : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }`
                        }
                        parser={(value) => value.replace(/\₱|,/g, "")}
                    />
                </Form.Item>
                <Form.Item
                    name="employer_id"
                    label="Employer"
                    rules={[
                        { required: true, message: "Please select an employer!" },
                    ]}
                >
                    <EmployerComboBox />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Job Image"
                >
                    <AvatarUpload />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddJobModal;
