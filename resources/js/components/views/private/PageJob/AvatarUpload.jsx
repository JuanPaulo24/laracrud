import React, { useEffect } from "react";
import { Upload, Avatar, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AvatarUpload = ({ value, onChange }) => {
    const [fileList, setFileList] = React.useState([]);
    const [previewImage, setPreviewImage] = React.useState(null);

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    useEffect(() => {
        if (value) {
            setFileList(value);
            if (value.length > 0 && value[0].originFileObj) {
                getBase64(value[0].originFileObj)
                    .then(setPreviewImage)
                    .catch(console.error);
            }
        } else {
            setFileList([]);
            setPreviewImage(null);
        }
    }, [value]);

    const handleUploadChange = async ({ fileList: newFileList }) => {
        const singleFileList = newFileList.slice(-1);
        setFileList(singleFileList);
        onChange?.(singleFileList);

        if (singleFileList.length > 0 && singleFileList[0].originFileObj) {
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

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("You can only upload image files!");
        }
        return isImage;
    };

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            fileList={fileList}
            showUploadList={false}
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
    );
};

export default AvatarUpload;
