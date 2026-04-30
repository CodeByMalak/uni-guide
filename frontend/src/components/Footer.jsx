import { Link } from "react-router-dom";
import { FaGraduationCap, FaFacebook, FaInstagram, FaTwitter, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Description Column */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center space-x-2 mb-6">
            <div className="bg-blue-500 p-1.5 rounded-full">
              <FaGraduationCap className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold tracking-tight">UniSelector</span>
          </Link>
          <p className="text-slate-400 leading-relaxed mb-8">
            Providing accurate and up-to-date information about universities in KPK to help students make informed decisions.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all"><FaGlobe /></a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all"><FaFacebook /></a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all"><FaInstagram /></a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all"><FaTwitter /></a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/universities" className="hover:text-blue-400 transition-colors">Universities</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="text-lg font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="text-lg font-bold mb-6">Stay Updated</h4>
          <p className="text-slate-400 mb-6">Subscribe to get the latest admission alerts.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email address" className="bg-slate-800 border-none rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500" />
            <button className="bg-blue-600 hover:bg-blue-500 px-4 rounded-xl font-bold transition-all">→</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} UniSelector. Built with ❤️ for KPK students.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
}
