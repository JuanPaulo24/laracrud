// AddJobModal.jsx
import React from "react";
import {
    Modal,
    Form,
    Input,
    InputNumber,
    Upload,
    message,
    Avatar,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EmployerComboBox from "./EmployerComboBox.jsx";

const AddJobModal = ({ open, onCancel, onOk }) => {
    const [form] = Form.useForm();
    // State to hold the upload file (limited to one file)
    const [fileList, setFileList] = React.useState([]);
    // State to hold the preview image (Base64 string)
    const [previewImage, setPreviewImage] = React.useState(null);

    // Helper to convert file to Base64 so we can preview it
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    // When the upload changes, update fileList and the preview image.
    // This handler ensures only one file is kept.
    const handleUploadChange = async ({ fileList: newFileList }) => {
        // Limit to the last file (only one file allowed)
        const singleFileList = newFileList.slice(-1);
        setFileList(singleFileList);
        // Also update the Form value for the "image" field
        form.setFieldsValue({ image: singleFileList });

        if (
            singleFileList.length > 0 &&
            singleFileList[0].originFileObj
        ) {
            try {
                const base64 = await getBase64(singleFileList[0].originFileObj);
                setPreviewImage(base64);
            } catch (error) {
                console.error("Error reading file", error);
            }
        } else {
            setPreviewImage(null);
        }
    };

    // Validate that only image files are uploaded
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("You can only upload image files!");
        }
        return isImage;
    };

    const handleOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                // Format salary if needed
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

                // Append image file if provided
                if (values.image && values.image[0]?.originFileObj) {
                    formData.append("image", values.image[0].originFileObj);
                }

                try {
                    await onOk(formData);
                    form.resetFields();
                    setFileList([]);
                    setPreviewImage(null);
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
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                >
                    <Upload
                        name="image"
                        listType="picture-card"
                        fileList={fileList}
                        showUploadList={false} // Hide the default file list UI
                        beforeUpload={beforeUpload}
                        onChange={handleUploadChange}
                        customRequest={({ file, onSuccess }) => {
                            setTimeout(() => onSuccess("ok"), 0);
                        }}
                        accept="image/*"
                    >
                        {previewImage ? (
                            <Avatar shape="circle" size={64} src={previewImage} />
                        ) : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddJobModal;
