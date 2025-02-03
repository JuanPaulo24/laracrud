import JobCards from "../views/private/PageJob/JobCards.jsx";
import Navbar from "../Navbar.jsx"
import Content from "@/components/Content.jsx";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <Navbar/>
            <Content/>
        </div>
    )
}
