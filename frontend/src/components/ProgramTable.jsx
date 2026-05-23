import { FaGraduationCap, FaCoins, FaRegCalendarAlt } from "react-icons/fa";

export default function ProgramTable({ programs }) {
  if (!programs || programs.length === 0) {
    return (
      <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-100">
        <FaGraduationCap className="text-4xl text-slate-200 mx-auto mb-3" />
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
          No programs listed at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-slate-100 rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-2">
                  <FaGraduationCap className="text-slate-400 text-sm" />
                  Academic Program
                </span>
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-2">
                  <FaCoins className="text-slate-400 text-sm" />
                  Tuition Fee
                </span>
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-2">
                  <FaRegCalendarAlt className="text-slate-400 text-sm" />
                  Admission Deadline
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {programs.map((program, index) => {
              // Handle both string programs and object programs
              const name = typeof program === "string"
                ? program
                : (program?.name || "N/A");
              const fee = typeof program === "string"
                ? "Check Website"
                : (program?.fee || "Check Website");
              const deadline = typeof program === "string"
                ? "TBA"
                : (program?.deadline || "TBA");

              return (
                <tr
                  key={`program-${index}`}
                  className="hover:bg-slate-50/70 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-300 flex-shrink-0" />
                      <span className="font-extrabold text-slate-800 text-sm">{name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <FaCoins className="text-emerald-500 text-[10px]" />
                      {fee}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                      <FaRegCalendarAlt className="text-rose-400 text-[10px]" />
                      {deadline}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
