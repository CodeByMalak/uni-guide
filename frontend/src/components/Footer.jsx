import { Link } from "react-router-dom";
import {
  AiOutlineGlobal,
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">UniSelection</h2>
            <p className="text-sm leading-relaxed">
              A centralized university information platform helping students
              across Khyber Pakhtunkhwa explore programs, compare universities,
              and make informed academic decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/universities"
                  className="hover:text-white transition"
                >
                  Universities
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: uniselectionkpk@gmail.com</li>
              <li>Phone: 0334-5525242</li>
              <li>WhatsApp: 0308-8130852</li>
            </ul>
          </div>

          {/* Social / Future Expansion */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <p className="text-sm mb-4">
              Follow us for university updates and admission alerts.
            </p>

            <div className="flex space-x-4 text-2xl text-gray-400">
              <AiOutlineGlobal className="hover:text-white cursor-pointer" />
              <AiFillFacebook className="hover:text-white cursor-pointer" />
              <AiFillInstagram className="hover:text-white cursor-pointer" />
              <AiOutlineTwitter className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} UniSelection. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
