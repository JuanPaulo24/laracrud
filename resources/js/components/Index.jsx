import React from "react";
import JobCards from "./JobCards.jsx";

export default function Home() {
    return (
        <div className="demo" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh" ,
            backgroundColor: "#EFFAFA",
            position: "relative"
        }}>
            <header style={{
                backgroundColor: "#63BABA",
                height: "15vh",
                position: "absolute",
                top: "0",
                width: "100vw"
            }}></header>
            <JobCards/>
        </div>
    );
}
