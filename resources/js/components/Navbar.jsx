import React from "react";

 const navItems = [
     { href: "#", label: "Home" },
     { href: "#", label: "About us" },
     { href: "#", label: "Course" },
     { href: "#", label: "Pricing" },
     { href: "#", label: "Contact" },
 ]

 function Navbar() {
     return (
         <nav className="bg-white shadow">
             <div className="container mx-auto px-4">
                 <div className="flex h-20 items-center justify-between">
                     <div className="flex items-center gap-6">
                         <div className="h-8 w-8 rounded bg-indigo-600" />
                         <span className="text-xl font-bold">LOGO</span>
                     </div>

                     <div className="flex items-center space-x-4 sm:space-x-6">
                         {navItems.map((item) => (
                             <a
                                 key={item.label}
                                 href={item.href}
                                 className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                             >
                                 {item.label}
                             </a>
                         ))}
                     </div>

                     <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                         Get Started
                     </button>
                 </div>
             </div>
         </nav>
     )
}

export default Navbar
