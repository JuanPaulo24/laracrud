import Navbar from "@/components/Navbar.jsx";
import ContactContent from "@/components/views/public/PageContact/ContactContent.jsx";

export default function Contact() {
    return (
        <div className="flex flex-col items-center">
            <Navbar/>
            <ContactContent/>
        </div>
    )
}
