import { useState } from "react";
import UniversityCard from "../components/UniversityCard";
import SearchBar from "../components/SearchBar";

export default function Universities() {
  // Dummy data
  const [universities] = useState([
    { id: 1, name: "University of Peshawar", city: "Peshawar" },
    { id: 2, name: "Agriculture University Peshawar" , city: "Peshawar" },
    { id: 3, name: "Islamia College University Peshawar", city: "Peshawar" },
    { id: 4, name: "UET Peshawr", city: "Peshawar" },
    { id: 5, name: "IM Science University Peshawr", city: "Peshawr" },
    { id: 6, name: "City University Peshawr", city: "Peshawr" },
    { id: 7, name: "CECOS University Of IT and Emerging Science Peshawr", city: "Peshawr" },
    { id: 8, name: "Iqra National University Peshawr", city: "Peshawr" },
    { id: 9, name: "Sarhad University Peshawr", city: "Peshawr" },
    { id: 10,name: "Khyber Medical University Peshawr", city: "Peshawr" },
    { id: 11,name: "Abasyn University Peshawr", city: "Peshawr" },
    { id: 12,name: "Qurtuba University Of Science and Information Technology Peshawr", city: "Peshawr" },
  ]);

  const [search, setSearch] = useState("");

  // Filter universities based on search
  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
   
     <section id="universities">
       <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-slate-900 mb-6 text-center">
        Universities 
      </h1>

      {/* Reusable SearchBar */}
      {/* <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search universities..."
      /> */}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredUniversities.map((uni) => (
          <UniversityCard
            key={uni.id}
            id={uni.id}
            name={uni.name}
            city={uni.city}
          />
        ))}
      </div>
    </div>
     </section>
    
  );
}
