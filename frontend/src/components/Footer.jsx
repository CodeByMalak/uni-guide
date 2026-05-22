import { Link } from "react-router-dom";
import { FaGraduationCap, FaFacebook, FaInstagram, FaTwitter, FaGlobe, FaArrowRight, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-100/60 text-slate-600 pt-24 pb-12 border-t border-zinc-200 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-zinc-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              <div className="bg-zinc-800 p-2.5 rounded-2xl shadow-lg shadow-zinc-800/20 group-hover:scale-110 transition-transform duration-500">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                Uni<span className="text-zinc-800">Selector</span>
              </span>
            </Link>
            <p className="text-slate-500 leading-relaxed mb-10 text-lg font-medium">
              The most trusted educational guide for Peshawar and KPK. We bridge the gap between students and their future universities.
            </p>
            <div className="flex space-x-4">
              {[FaGlobe, FaFacebook, FaInstagram, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-800 transition-all duration-300 group">
                  <Icon className="text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Platform</h4>
            <ul className="space-y-4">
              {["Home", "Universities", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(" ", "")}`} className="text-slate-500 hover:text-zinc-800 transition-colors font-bold text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Resources</h4>
            <ul className="space-y-4">
              {["Help Center", "Privacy Policy", "Terms of Service", "Member Perks"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-zinc-800 transition-colors font-bold text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Newsletter Column */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Get In Touch</h4>
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4 text-slate-500">
                <FaMapMarkerAlt className="text-zinc-600" />
                <span className="font-medium text-sm">Hayatabad, Peshawar, KPK</span>
              </div>
              <div className="flex items-center gap-4 text-slate-500">
                <FaEnvelope className="text-zinc-600" />
                <span className="font-medium text-sm">contact@uniselector.edu</span>
              </div>
            </div>
            
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email for alerts" 
                className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all pr-16 font-medium text-slate-900 placeholder-slate-400" 
              />
              <button className="absolute right-2 top-2 bottom-2 bg-zinc-800 hover:bg-zinc-600 px-4 rounded-xl transition-all flex items-center justify-center">
                <FaArrowRight className="text-white text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 text-[10px] font-black uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} UniSelector</span>
            <span className="w-1 h-1 bg-zinc-300 rounded-full" />
            <span>Built for Peshawar Students</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-zinc-800 transition-colors">Security</a>
            <a href="#" className="hover:text-zinc-800 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-800 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
