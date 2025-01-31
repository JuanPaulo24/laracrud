import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Index from "./Index.jsx";


export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
            </Routes>
        </Router>
    );
}


