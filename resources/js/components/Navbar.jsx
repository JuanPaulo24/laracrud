const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/jobs", label: "Jobs" },
    { href: "/contact", label: "Contact" },
]

function Navbar() {
    const submitHandler = () => window.location.href = '/jobs';

    return (
        <nav className="bg-white shadow w-screen">
            <div className="container mx-auto px-6 md:px-16">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-gradient-to-r from-indigo-700 to-blue-300"/>
                        <span className="tracking-widest text-indigo-950 text-xl font-black">LOGO</span>
                    </div>

                    <div className="flex items-center space-x-20 ml-[200px] hidden md:block">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="tracking-widest text-medium font-bold text-indigo-950 hover:text-indigo-600 transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <button onClick={submitHandler} className="font-bold tracking-widest w-[150px] bg-gradient-to-r from-indigo-700 to-blue-300 text-white px-4 py-2 rounded-[100px] text-sm font-medium">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

