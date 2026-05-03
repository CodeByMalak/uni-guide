import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UniversityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/universities/${id}`);
        setUniversity(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching university details:", err);
        setError("Unable to connect to the server or university not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
        <h2 className="text-3xl font-bold mb-4 text-red-500">University Not Found</h2>
        <p className="text-slate-700">{error || "The university you are looking for does not exist."}</p>
        <button
          className="mt-6 text-blue-600 hover:underline"
          onClick={() => navigate("/universities")}
        >
          ← Back to Universities
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <button
          className="mb-8 text-slate-500 hover:text-blue-600 transition-colors flex items-center font-medium"
          onClick={() => navigate(-1)}
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-slate-100 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10 opacity-70"></div>
          
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">{university.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium">
              <span className="flex items-center bg-slate-100 px-4 py-1.5 rounded-full">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {university.city}, {university.province}
              </span>
              <span className="flex items-center bg-emerald-50 px-4 py-1.5 rounded-full text-emerald-700">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                {university.type} Sector
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-8 h-1 bg-blue-500 rounded-full mr-3"></span>
                Key Information
              </h3>
              <ul className="space-y-6">
                <li className="flex flex-col">
                  <span className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-1">Admission Last Date</span>
                  <span className="text-lg text-slate-800 font-semibold">{university.lastDate || 'Not specified'}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-1">Fee Structure</span>
                  <span className="text-lg text-slate-800 font-semibold">{university.fees || 'Contact for details'}</span>
                </li>
                {university.website && (
                  <li className="flex flex-col">
                    <span className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-1">Official Website</span>
                    <a href={university.website.startsWith('http') ? university.website : `https://${university.website}`} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 font-semibold hover:underline inline-flex items-center">
                      Visit Website
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-8 h-1 bg-emerald-500 rounded-full mr-3"></span>
                Programs Offered
              </h3>
              {university.programs && university.programs.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {university.programs.map((program, index) => (
                    <span key={index} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200">
                      {program}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                  Program details are currently being updated.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
