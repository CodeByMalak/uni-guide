import { useParams, useNavigate } from "react-router-dom";

export default function UniversityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const universities = [
    {
      id: 1,
      name: "University of Peshawar",
      city: "Peshawar",
      description: "One of the oldest universities in KPK with programs in science, arts, and humanities.",
      established: "1950",
      students: "20,000",
      website: "https://www.uop.edu.pk",
    },
    {
      id: 2,
      name: "Agriculture University Peshawar",
      city: "Peshawar",
      description: "Specialized in agricultural studies and research.",
      established: "1981",
      students: "7,000",
      website: "https://aup.edu.pk",
    },
    {
      id: 3,
      name: "Islamia College University Peshawar",
      city: "Peshawar",
      description: "Known for humanities, sciences, and vibrant campus life.",
      established: "1913",
      students: "10,000",
      website: "https://www.icup.edu.pk",
    },
    {
      id: 4,
      name: "UET Peshawar",
      city: "Peshawar",
      description: "Famous for engineering programs and technology research.",
      established: "1980",
      students: "8,500",
      website: "https://www.uetpeshawar.edu.pk",
    },
    // Add more dummy data if needed
  ];

  const university = universities.find((uni) => uni.id === parseInt(id));

  if (!university) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
        <h2 className="text-3xl font-bold mb-4 text-red-500">University Not Found</h2>
        <p className="text-slate-700">The university you are looking for does not exist.</p>
        <button
          className="mt-6 text-blue-600 hover:underline"
          onClick={() => navigate("/universities")}
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">{university.name}</h1>
      <p className="text-lg text-slate-700 mb-2">📍 {university.city}</p>
      <p className="text-slate-700 mb-4">{university.description}</p>

      <div className="mb-6">
        <p><strong>Established:</strong> {university.established}</p>
        <p><strong>Students:</strong> {university.students}</p>
        <p>
          <strong>Website:</strong>{" "}
          <a href={university.website} target="_blank" className="text-blue-600 hover:underline">
            {university.website}
          </a>
        </p>
      </div>

      <button
        className="mt-6 text-blue-600 hover:underline"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>
    </div>
  );
}
