import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "../layout/Home.jsx";


export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

createRoot(document.getElementById("root")).render(<Routers />);


