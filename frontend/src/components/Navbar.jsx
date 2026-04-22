import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaUniversity,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleScroll = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const sectionAfterNav = document.getElementById(id);
        if (sectionAfterNav) {
          sectionAfterNav.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }

    setOpen(false);
  };

  // Navigation items with icons
  const navItems = [
    { id: "home", label: "Home", icon: <FaHome className="mr-3" /> },
    {
      id: "universities",
      label: "Universities",
      icon: <FaUniversity className="mr-3" />,
    },
    { id: "about", label: "About", icon: <FaInfoCircle className="mr-3" /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope className="mr-3" /> },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-slate-900 text-white sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => handleScroll("home")}
                className="flex items-center space-x-3 p-2 hover:text-blue-400"
                aria-label="Go to Home"
              >
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white overflow-hidden">
                  <img
                    src="/logoimage1.jpg"
                    alt="UniSelection Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-lg sm:text-xl font-bold tracking-wide whitespace-nowrap">
                  UniSelection
                </span>
              </button>
            </div>

            {/* Desktop Navigation with Icons */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-4 lg:space-x-8 mr-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className="flex items-center text-sm lg:text-base font-medium hover:text-blue-400 px-3 py-2"
                    aria-label={`Go to ${item.label} section`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Login Button that links to login page */}
              <Link
                to="/login"
                className="flex items-center text-sm lg:text-base font-medium hover:text-blue-400 px-3 py-2"
                aria-label="Go to Login page"
              >
                <FaUser className="mr-2" />
                Login
              </Link>
            </div>

            {/* Mobile menu button with React Icon */}
            <div className="md:hidden">
              <button
                ref={toggleButtonRef}
                onClick={() => setOpen(!open)}
                className="p-3 hover:text-white"
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <span className="sr-only">
                  {open ? "Close menu" : "Open menu"}
                </span>
                {open ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 overflow-auto z-40">
          {/* Semi-transparent backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-80"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile menu content */}
          <div
            ref={mobileMenuRef}
            className="absolute inset-x-0 top-16 bg-slate-800"
          >
            <div className="px-4 pt-4 pb-4 space-y-1">
              {/* Navigation Items */}
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className="w-full flex items-center text-left px-4 py-3 text-base font-medium text-white hover:text-blue-400"
                  aria-label={`Go to ${item.label} section`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}

              {/* Mobile Login Button */}
              <Link
                to="/login"
                className="w-full flex items-center text-left px-4 py-3 text-base font-medium text-white hover:text-blue-400"
                aria-label="Go to Login page"
                onClick={() => setOpen(false)}
              >
                <FaUser className="mr-3" />
                Login
              </Link>

              {/* Mobile-only content */}
              <div className="border-t border-gray-700 my-4"></div>
              <div className="pt-8 mt-8">
                <div className="px-4">
                  <div className="flex items-center justify-center mb-4">
                    <p className="text-base text-center text-gray-300">
                      Explore universities in KPK with our smart Platform
                    </p>
                  </div>
                  <div className="h-20 w-20 mx-auto rounded-full bg-white overflow-hidden">
                    <img
                      src="/logoimage1.jpg"
                      alt="UniSelection Logo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-center text-gray-400 text-xs mt-2">
                    UniSelection © 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
