export default function About() {
  return (
    <section id="about" className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            About UniSelection
          </h2>
        </div>

        {/* Main Description */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-gray-700 text-lg leading-relaxed">
            UniSelection is a student-focused digital platform designed to
            simplify the process of exploring universities in Khyber
            Pakhtunkhwa. Our system provides structured and up-to-date
            information about academic programs, fee structures, admission
            criteria, and eligibility requirements, helping students make
            informed and confident decisions about their higher education
            journey.
          </p>
        </div>

        {/* Mission / Vision / Goal */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">
              🎯 Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To provide students with centralized, accurate, and transparent
              university information in one accessible platform.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">
              🌍 Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become the most trusted digital guide for higher education
              exploration and university comparison in Khyber Pakhtunkhwa.
            </p>
          </div>

          {/* Goal */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">
              🚀 Our Goal
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To streamline the university selection process by reducing
              confusion and saving students valuable time and effort.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-600"></div>
    </section>
  );
}
