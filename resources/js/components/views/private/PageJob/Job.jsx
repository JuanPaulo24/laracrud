import Navbar from "@/components/Navbar.jsx";
import JobListing from "@/components/views/private/PageJob/JobListing.jsx";

export default function Contact() {
    return (
        <div className="flex flex-col items-center">
            <Navbar/>
            <JobListing/>
        </div>
    )
}
