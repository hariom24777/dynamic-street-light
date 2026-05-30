import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Cpu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation Array
  const NAV_LINKS = [
    { to: "/", label: "Dashboard" },
    { to: "/overview", label: "Project Overview" },
  ];

  // handle bg scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <nav className="bg-zinc-950 border-b border-zinc-900 sticky top-0 z-50 text-zinc-200">
      <div className="w-full mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* LEFT */}
          <div className="flex items-center gap-2 z-80">
            <Cpu className="w-5 h-5 text-amber-400" />
            <span className="font-bold tracking-wider uppercase text-sm">
              Dynamic Street Light System
            </span>
            <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
              | Dept. of ECE
            </span>
          </div>

          {/* CENTER/RIGHT */}
          <div className="hidden md:flex gap-5 lg:gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition duration-300 text-xs lg:text-sm font-semibold uppercase tracking-wider ${
                    isActive
                      ? "text-amber-400 border-b-2 border-amber-400 pb-1"
                      : "text-zinc-400 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800 text-[10px] font-mono text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ONLINE
          </div>

          {/* Mobile Hamburger Icon Using your exact custom line mechanics */}
          <button
            onClick={toggleSidebar}
            className="md:hidden flex flex-col gap-1.75 items-end cursor-pointer z-80 focus:outline-none"
            aria-label="Toggle Menu"
            aria-controls="mobile-menu"
          >
            <div
              className={`h-0.75 bg-current rounded-full transition-all duration-300 opacity-75 ${
                isOpen ? "w-6 -rotate-45 translate-y-1.25" : "w-7"
              }`}
            />
            <div
              className={`h-0.75 bg-current rounded-full transition-all duration-300 opacity-75 ${
                isOpen ? "w-6 rotate-45 -translate-y-1.25" : "w-5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menubar for Mobile */}
      <aside
        id="mobile-menu"
        className={`fixed top-0 inset-0 w-full h-screen bg-zinc-950 z-65 flex justify-center transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-black px-2 py-13 flex flex-col gap-4 w-full">
          <p className="text-zinc-600 uppercase mb-4 border-b border-zinc-900 pb-4">
            
          </p>

          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `py-2 px-4 text-base sm:text-lg font-bold uppercase tracking-widest rounded-md transition-all duration-300 hover:bg-zinc-900 ${
                  isActive
                    ? "text-amber-400"
                    : "text-zinc-500 hover:text-zinc-200"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;
