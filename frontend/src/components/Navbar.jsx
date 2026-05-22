import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaGraduationCap,
  FaBars,
  FaTimes,
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/universities" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 py-3 ${scrolled
        ? "bg-zinc-900/95 backdrop-blur-xl shadow-lg border-b border-zinc-800"
        : "bg-zinc-900 border-b border-zinc-800/50"
        }`}
    >
      <div className="w-full px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-2.5 rounded-xl transition-all duration-300 bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-600/50 shadow-md group-hover:scale-105">
            <FaGraduationCap className="text-lg text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Uni<span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">Selector</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-5 py-2.5 rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-300 ease-in-out active:scale-95 border ${location.pathname === link.path
                ? "text-white bg-zinc-800/70 border-zinc-700/40 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/35 border-transparent hover:scale-[1.02]"
                }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Divider */}
          <div className="ml-4 pl-4 border-l border-zinc-800 flex items-center">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl transition-all duration-300 bg-zinc-800/40 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-white text-sm font-bold shadow-md border border-zinc-600/30">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <FaChevronDown className={`text-[10px] transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''} text-zinc-500`} />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 py-3 animate-fadeIn origin-top-right overflow-hidden">
                    <div className="px-5 py-3 border-b border-zinc-800/60 mb-1">
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <p className="text-xs text-zinc-500 font-medium truncate">{user.email}</p>
                    </div>

                    <Link to="/profile" className="flex items-center space-x-3 px-5 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors">
                      <FaUser className="text-xs text-zinc-500" />
                      <span className="text-sm font-medium">My Profile</span>
                    </Link>
                    <Link to="/favorites" className="flex items-center space-x-3 px-5 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors">
                      <FaHeart className="text-xs text-zinc-500" />
                      <span className="text-sm font-medium">My Favorites</span>
                    </Link>
                    <Link to="/profile" className="flex items-center space-x-3 px-5 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors">
                      <FaCog className="text-xs text-zinc-500" />
                      <span className="text-sm font-medium">Settings</span>
                    </Link>

                    <div className="mt-1 pt-1 border-t border-zinc-800/65">
                      <button
                        onClick={logout}
                        className="flex items-center space-x-3 w-full px-5 py-2.5 text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <FaSignOutAlt className="text-xs" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95 bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-950 hover:from-white hover:to-zinc-100 shadow-md hover:shadow-lg shadow-zinc-950/20"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="p-2.5 rounded-xl transition-all bg-zinc-800/40 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white"
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed inset-0 top-0 h-screen bg-zinc-950 z-50 animate-fadeIn flex flex-col">
          {/* Mobile Header */}
          <div className="flex justify-between items-center p-6 border-b border-zinc-800/60">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-600/50 shadow-md">
                <FaGraduationCap className="text-white text-lg" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Uni<span className="text-zinc-400">Selector</span>
              </span>
            </Link>
            <button onClick={() => setOpen(false)} className="p-2.5 bg-zinc-800 rounded-xl text-zinc-400 border border-zinc-800 hover:text-white">
              <FaTimes size={18} />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex-grow p-6 space-y-2 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-6 py-4 rounded-xl font-semibold text-lg transition-all ${location.pathname === link.path
                  ? "text-white bg-zinc-800/60 border-l-2 border-zinc-400"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Footer */}
          <div className="p-6 border-t border-zinc-800/60 bg-zinc-950">
            {user ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 mb-1">
                  <Link
                    to="/profile"
                    className="flex items-center justify-center gap-2 py-3.5 bg-zinc-800/40 rounded-xl border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <FaUser size={13} className="text-zinc-500" />
                    <span className="text-sm font-semibold">Profile</span>
                  </Link>
                  <Link
                    to="/favorites"
                    className="flex items-center justify-center gap-2 py-3.5 bg-zinc-800/40 rounded-xl border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <FaHeart size={13} className="text-zinc-500" />
                    <span className="text-sm font-semibold">Favorites</span>
                  </Link>
                </div>

                <div className="flex items-center gap-4 p-4 bg-zinc-800/10 rounded-xl border border-zinc-800/40">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-600/40 text-white font-bold flex items-center justify-center text-xl shadow-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-zinc-200 truncate text-sm">{user.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="w-full bg-rose-500/10 text-rose-400 py-3.5 rounded-xl font-semibold text-base border border-rose-500/10 transition-colors hover:bg-rose-500/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-950 text-center py-3.5 rounded-xl font-bold text-lg shadow-md hover:from-white hover:to-zinc-100 transition-all"
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
