import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Home from "../layouts/Home.jsx";


export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}


