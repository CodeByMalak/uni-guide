import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaGraduationCap,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaHeart,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const userMenuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || location.pathname !== "/"
          ? "bg-slate-900/95 backdrop-blur-md py-3 shadow-xl border-b border-white/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 p-2.5 rounded-2xl shadow-lg shadow-blue-600/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <FaGraduationCap className="text-white text-xl" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">
            Uni<span className="text-blue-400">Selector</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          {[
            { name: "Home", path: "/" },
            { name: "Universities", path: "/universities" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-blue-400 bg-blue-400/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* User Section (Logged In vs Logged Out) */}
          <div className="ml-6 pl-6 border-l border-white/10">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-1.5 pr-4 rounded-2xl transition-all duration-300 border border-white/10"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center text-white font-bold shadow-inner">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs text-slate-400 font-medium leading-none mb-1">Welcome,</p>
                    <p className="text-sm text-white font-bold leading-none">{user.name}</p>
                  </div>
                  <FaChevronDown className={`text-xs text-slate-400 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl py-3 animate-fadeIn scale-100 origin-top-right backdrop-blur-xl">
                    <div className="px-5 py-3 border-b border-white/5 mb-2">
                      <p className="text-sm text-white font-bold">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    
                    <Link to="/profile" className="flex items-center space-x-3 px-5 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      <FaUser className="text-blue-400" />
                      <span className="text-sm font-bold">My Profile</span>
                    </Link>
                    <Link to="/favorites" className="flex items-center space-x-3 px-5 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      <FaHeart className="text-pink-500" />
                      <span className="text-sm font-bold">My Favorites</span>
                    </Link>
                    <Link to="/settings" className="flex items-center space-x-3 px-5 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      <FaCog className="text-slate-400" />
                      <span className="text-sm font-bold">Settings</span>
                    </Link>
                    
                    <div className="mt-2 pt-2 border-t border-white/5">
                      <button
                        onClick={logout}
                        className="flex items-center space-x-3 w-full px-5 py-3 text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <FaSignOutAlt />
                        <span className="text-sm font-bold">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-black text-sm tracking-wide transition-all duration-300 shadow-xl shadow-blue-600/30 active:scale-95 flex items-center space-x-2"
              >
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-white p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {open && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-slate-950/95 backdrop-blur-2xl z-40 animate-fadeIn">
          <div className="p-8 space-y-4">
            {user && (
              <div className="mb-8 p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-black text-xl">{user.name}</p>
                  <p className="text-slate-400 text-sm truncate">{user.email}</p>
                </div>
              </div>
            )}

            {[
              { name: "Home", path: "/" },
              { name: "Universities", path: "/universities" },
              { name: "About Us", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block p-4 text-white font-bold text-xl hover:text-blue-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="pt-4 mt-4 border-t border-white/10 space-y-4">
                <Link to="/favorites" className="block p-4 text-slate-300 font-bold text-lg">My Favorites</Link>
                <button
                  onClick={logout}
                  className="w-full bg-red-500/10 text-red-500 py-4 rounded-2xl font-black text-lg shadow-lg border border-red-500/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block bg-blue-600 text-white text-center py-5 rounded-2xl font-black text-xl shadow-2xl shadow-blue-600/30 mt-8"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}


