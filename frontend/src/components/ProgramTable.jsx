export default function ProgramTable({ programs }) {
  return (
    <div className="overflow-x-auto">
      {programs && programs.length > 0 ? (
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-slate-200">
            <tr>
              <th className="px-6 py-3 text-left">Program</th>
              <th className="px-6 py-3 text-left">Fee</th>
              <th className="px-6 py-3 text-left">Admission Deadline</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4">{program.name}</td>
                <td className="px-6 py-4">{program.fee}</td>
                <td className="px-6 py-4">{program.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No programs available.</p>
      )}
    </div>
  );
}
