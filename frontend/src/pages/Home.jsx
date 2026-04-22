import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaUniversity,
  FaGraduationCap,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import Universities from "./Universities";
import About from "./About";
import Contact from "./Contact";

export default function Home() {
  const location = useLocation();

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullText = "A Smart Platform for Exploring Universities in KPK";

  // Scroll to section if coming from navbar
  useEffect(() => {
    const scrollToId = location.state?.scrollTo;
    if (scrollToId) {
      const section = document.getElementById(scrollToId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true); // typing finished
    }
  }, [currentIndex]);

  return (
    <>
      {/* HERO SECTION */}
      <section
        id="home"
        className="bg-gradient-to-r from-slate-800 to-slate-700 text-white relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight min-h-[4rem] md:min-h-[6rem]">
            {displayText}
            {!isTypingComplete && (
              <span className="animate-pulse inline-block ml-1 text-blue-400">
                |
              </span>
            )}
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            UniSelection helps students explore universities, compare programs,
            check fee structures, and view admission details, all in one smart
            platform.
          </p>

          {/* Search Section */}
          <div className="relative max-w-xl mx-auto mb-10">
            {/* 
        BACKEND NOTE:
        Later connect this input with:
        - useState for searchQuery
        - onChange handler
        - API call to backend (Node + Express)
        Example endpoint: GET /api/universities?search=value
      */}

            <input
              type="text"
              placeholder="Search university, city, or program..."
              className="w-full px-5 py-4 pr-32 bg-slate-800 border border-slate-600 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {/* 
        BACKEND NOTE:
        On click:
        - Send request to backend
        - Fetch filtered universities from MongoDB
        - Navigate to /universities page with results
      */}
            <button className="absolute right-2 top-2 bottom-2 px-6 bg-slate-600 hover:bg-slate-700 rounded-lg font-semibold transition">
              Search
            </button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            {/* 
        AUTH NOTE:
        This will connect to:
        - Login page
        - Later implement JWT authentication
        - After login redirect to dashboard
      */}
            <Link
              to="/login"
              className="bg-white text-slate-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition shadow-lg"
            >
              Get Started
            </Link>

            <Link
              to="/universities"
              className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-slate-900 transition"
            >
              Browse Universities
            </Link>
          </div>

          {/* Trust Line */}
          <div className="text-gray-400 text-sm">
            Trusted by students across Khyber Pakhtunkhwa
          </div>
        </div>
      </section>

      <Universities />
      <About />
      <Contact />
    </>
  );
}
