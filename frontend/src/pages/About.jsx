import { FaBullseye, FaGlobeAmericas, FaRocket, FaGraduationCap } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-[#f0fdfa] min-h-screen pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-teal-100">
            <FaGraduationCap /> Empowering Students
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 tracking-tighter leading-tight">
            The Digital Guide to <span className="text-teal-600">KPK Education</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium leading-relaxed">
            UniSelector is a specialized digital platform designed to simplify the university discovery process in Khyber Pakhtunkhwa. We bridge the gap between complex institutional data and student needs.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <AboutCard 
            icon={<FaBullseye className="text-teal-600" />}
            title="Our Mission"
            description="To provide students with centralized, accurate, and transparent university information in one high-performance platform."
            color="teal"
          />
          <AboutCard 
            icon={<FaGlobeAmericas className="text-cyan-600" />}
            title="Our Vision"
            description="To become the most trusted digital authority for higher education exploration and university comparison in the region."
            color="cyan"
          />
          <AboutCard 
            icon={<FaRocket className="text-rose-600" />}
            title="Our Goal"
            description="To eliminate information barriers, reducing confusion and saving students valuable time during their admission journey."
            color="rose"
          />
        </div>

        {/* Detailed Story Section */}
        <div className="bg-teal-50/60 border border-teal-100 rounded-[3rem] p-12 md:p-20 text-slate-800 relative overflow-hidden shadow-xl shadow-teal-500/5">
           <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Why we built UniSelector?</h2>
                 <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8">
                   Every year, thousands of students in KPK struggle to find reliable information about admission dates, fee structures, and program eligibility across different campuses. 
                 </p>
                 <p className="text-slate-600 text-lg font-medium leading-relaxed">
                   We created this platform as a final year project to solve this exact problem, combining modern web technology with verified institutional data.
                 </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <StatBox label="Universities" value="50+" />
                 <StatBox label="Cities Covered" value="12+" />
                 <StatBox label="Data Points" value="1k+" />
                 <StatBox label="Student Focus" value="100%" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function AboutCard({ icon, title, description, color }) {
  const bgClass = color === 'teal' ? 'bg-teal-50 border-teal-100' : 
                  color === 'cyan' ? 'bg-cyan-50 border-cyan-100' : 'bg-rose-50 border-rose-100';

  return (
    <div className="bg-white p-12 rounded-[2.5rem] border border-teal-100/60 shadow-xl shadow-teal-200/20 hover:translate-y-[-10px] transition-all duration-500 group">
      <div className={`w-20 h-20 ${bgClass} rounded-3xl flex items-center justify-center text-3xl mb-10 shadow-xl shadow-teal-100/50 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-6">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="bg-white border border-teal-100 p-8 rounded-[2rem] text-center shadow-lg shadow-teal-500/5">
       <p className="text-4xl font-black text-slate-900 mb-2">{value}</p>
       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600">{label}</p>
    </div>
  );
}
