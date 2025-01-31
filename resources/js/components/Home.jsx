import React from "react";
import JobCards from "./JobCards.jsx";

export default function Home() {
    return (
        <div className="demo" style={{
            backgroundColor: "#F2F2F2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <header style={{
                backgroundColor: "#5964E0",
                height: "15vh",
                width: "100vw",
            }}>
                <h1 style={{
                    color: "white",
                    textAlign: "center",
                    lineHeight: "15vh",
                    fontFamily: "Kumbh Sans, sans-serif",
                    fontSize: "28px",
                    fontWeight: 700,
                }}>devjobs</h1>
            </header>
            <JobCards/>
        </div>
    );
}
