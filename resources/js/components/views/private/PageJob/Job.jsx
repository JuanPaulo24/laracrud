import Navbar from "@/components/Navbar.jsx";
import JobListing from "@/components/views/private/PageJob/JobListing.jsx";
import JobCards from "@/components/views/private/PageJob/JobCards.jsx";

export default function Contact() {
    return (
        <div className="flex flex-col items-center">
            <Navbar/>
            <JobCards/>
        </div>
    )
}
