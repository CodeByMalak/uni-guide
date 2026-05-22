import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="bg-[#f0fdfa] min-h-screen pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Column: Info */}
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-teal-100">
              Connect With Us
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
              Let's Talk <br /> <span className="text-teal-600">Guidance.</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12">
              Have questions about a specific university or need help with our platform? Our team is here to support your educational journey.
            </p>

            <div className="space-y-10">
              <ContactInfoItem 
                icon={<FaEnvelope />} 
                label="Email Support" 
                value="info@uniselector.pk" 
              />
              <ContactInfoItem 
                icon={<FaPhoneAlt />} 
                label="Direct Line" 
                value="+92 91 1234567" 
              />
              <ContactInfoItem 
                icon={<FaMapMarkerAlt />} 
                label="Our Office" 
                value="University Road, Peshawar, KPK" 
              />
            </div>

            <div className="mt-16 flex items-center gap-6">
               <SocialLink icon={<FaFacebook />} />
               <SocialLink icon={<FaTwitter />} />
               <SocialLink icon={<FaLinkedin />} />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:w-2/3">
             <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-teal-100/60 shadow-2xl shadow-teal-200/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-60" />
                
                <h3 className="text-2xl font-black text-slate-900 mb-10 relative z-10">Send a Message</h3>
                
                <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Full Name</label>
                         <input 
                           type="text" 
                           placeholder="John Doe"
                           className="w-full bg-teal-50/40 border-2 border-transparent rounded-[1.2rem] px-8 py-5 font-bold focus:bg-white focus:border-teal-200 outline-none transition-all"
                         />
                      </div>
                      <div>
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Email Address</label>
                         <input 
                           type="email" 
                           placeholder="john@example.com"
                           className="w-full bg-teal-50/40 border-2 border-transparent rounded-[1.2rem] px-8 py-5 font-bold focus:bg-white focus:border-teal-200 outline-none transition-all"
                         />
                      </div>
                   </div>

                   <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Subject</label>
                      <input 
                        type="text" 
                        placeholder="Inquiry about Admission"
                        className="w-full bg-teal-50/40 border-2 border-transparent rounded-[1.2rem] px-8 py-5 font-bold focus:bg-white focus:border-teal-200 outline-none transition-all"
                      />
                   </div>

                   <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Your Message</label>
                      <textarea 
                        rows="5"
                        placeholder="How can we help you today?"
                        className="w-full bg-teal-50/40 border-2 border-transparent rounded-[2rem] px-8 py-6 font-bold focus:bg-white focus:border-teal-200 outline-none transition-all resize-none"
                      />
                   </div>

                   <button className="bg-teal-600 text-white px-12 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-teal-700 shadow-2xl shadow-teal-600/25 transition-all flex items-center gap-4 active:scale-95">
                      <FaPaperPlane />
                      Send Message Now
                   </button>
                </form>
             </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-32 rounded-[3.5rem] h-[400px] bg-teal-100/40 overflow-hidden relative group">
           <div className="absolute inset-0 bg-teal-900/5 z-10" />
           <img 
             src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
             className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
             alt="Peshawar Map"
           />
           <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="bg-white p-8 rounded-[2rem] shadow-2xl flex flex-col items-center border border-teal-100">
                 <FaMapMarkerAlt className="text-4xl text-teal-600 mb-4" />
                 <span className="font-black text-slate-900">Peshawar, KPK</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-6 group">
       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-xl shadow-teal-200/30 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
          {icon}
       </div>
       <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
          <p className="text-lg font-black text-slate-900">{value}</p>
       </div>
    </div>
  );
}

function SocialLink({ icon }) {
  return (
    <a href="#" className="w-12 h-12 rounded-xl bg-white border border-teal-100 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:border-teal-200 hover:shadow-xl transition-all">
       {icon}
    </a>
  );
}
