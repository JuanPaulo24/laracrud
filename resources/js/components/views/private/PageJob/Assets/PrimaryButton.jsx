import { Button } from "antd";
import React from "react";

export const PrimaryButton = ({ onClick, icon, children, ...props }) => (
    <Button
        type="primary"
        onClick={onClick}
        icon={icon}
        style={{
            fontFamily: "Kumbh Sans",
            ...props.style
        }}
        {...props}
    >
        {children}
    </Button>
);
