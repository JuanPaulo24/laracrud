import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../layouts/Home.jsx";
import Contact from "@/components/views/public/PageContact/Contact.jsx";
import Job from "../views/private/PageJob/Job.jsx"
import MapShow from "../views/public/MapShow.jsx";

export default function RouteList() {
    return (
        <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Job/>} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/map" element={<MapShow />} />

        </Routes>
    );
}


