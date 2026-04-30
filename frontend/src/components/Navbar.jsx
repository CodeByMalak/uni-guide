import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled || location.pathname !== "/" ? "bg-slate-900/95 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-blue-600 p-2 rounded-full shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
            <FaGraduationCap className="text-white text-xl" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            UniSelector
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          <Link to="/" className={`font-medium transition-colors ${location.pathname === "/" ? "text-blue-400" : "text-slate-300 hover:text-blue-400"}`}>Home</Link>
          <Link to="/universities" className={`font-medium transition-colors ${location.pathname === "/universities" ? "text-blue-400" : "text-slate-300 hover:text-blue-400"}`}>Universities</Link>
          <Link to="/about" className={`font-medium transition-colors ${location.pathname === "/about" ? "text-blue-400" : "text-slate-300 hover:text-blue-400"}`}>About</Link>
          <Link to="/contact" className={`font-medium transition-colors ${location.pathname === "/contact" ? "text-blue-400" : "text-slate-300 hover:text-blue-400"}`}>Contact</Link>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-white p-2 focus:outline-none">
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-2xl border-t border-slate-800 px-6 py-8 space-y-6 shadow-2xl absolute w-full left-0 animate-fadeIn">
          <Link to="/" className="block text-slate-300 font-medium hover:text-blue-400 text-lg">Home</Link>
          <Link to="/universities" className="block text-slate-300 font-medium hover:text-blue-400 text-lg">Universities</Link>
          <Link to="/about" className="block text-slate-300 font-medium hover:text-blue-400 text-lg">About Us</Link>
          <Link to="/contact" className="block text-slate-300 font-medium hover:text-blue-400 text-lg">Contact</Link>
          <Link to="/login" className="block bg-blue-600 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg">Login</Link>
        </div>
      )}
    </nav>
  );
}
