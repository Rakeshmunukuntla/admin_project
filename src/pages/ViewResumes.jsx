// // src/components/ViewResumes.jsx

// import { useEffect, useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import API from "../api/axios";

// export default function ViewResumes() {
//   const [resumes, setResumes] = useState([]);
//   const [filteredResumes, setFilteredResumes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");
//   const [resumeModal, setResumeModal] = useState(null);

//   useEffect(() => {
//     const fetchResumes = async () => {
//       try {
//         const res = await API.get("http://localhost:5000/resumes");

//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data.resumes || [];

//         setResumes(data);
//         setFilteredResumes(data);
//       } catch (err) {
//         console.error("Error fetching resumes:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResumes();
//   }, []);

//   // ⭐ DATE FILTER ONLY (no search, no extra filters)
//   useEffect(() => {
//     let filtered = [...resumes];

//     if (dateFrom || dateTo) {
//       filtered = filtered.filter((r) => {
//         if (!r.createdAt) return false;

//         const created = new Date(r.createdAt);
//         const onlyDate = new Date(
//           created.getFullYear(),
//           created.getMonth(),
//           created.getDate()
//         );

//         if (dateFrom) {
//           const from = new Date(dateFrom);
//           if (onlyDate < from) return false;
//         }

//         if (dateTo) {
//           const to = new Date(dateTo);
//           if (onlyDate > to) return false;
//         }

//         return true;
//       });
//     }

//     setFilteredResumes(filtered);
//   }, [dateFrom, dateTo, resumes]);

//   const formatDateTime = (d) => {
//     if (!d) return "—";
//     const date = new Date(d);
//     return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     })}`;
//   };

//   const formatSize = (bytes) => {
//     if (!bytes) return "";
//     const kb = bytes / 1024;
//     if (kb < 1024) return `${kb.toFixed(0)} KB`;
//     const mb = kb / 1024;
//     return `${mb.toFixed(2)} MB`;
//   };

//   return (
//     <>
//       <Header />

//       <div
//         className="min-h-screen p-8 relative overflow-hidden"
//         style={{
//           backgroundImage:
//             "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
//           backgroundSize: "80px 80px",
//           backgroundColor: "#020617",
//         }}
//       >
//         {/* dashboard overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

//         <div className="relative z-10 max-w-6xl mx-auto">
//           <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-8 md:p-10">
//             {/* HEADER */}
//             <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end">
//               <div>
//                 <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-1">
//                   Uploaded Resumes
//                 </h1>
//                 <p className="text-lg text-gray-300">
//                   Browse, view and download resumes submitted via the careers
//                   site.
//                 </p>
//               </div>

//               <div className="text-gray-300 text-sm">
//                 Total:{" "}
//                 <span className="text-white font-semibold">
//                   {filteredResumes.length}
//                 </span>
//               </div>
//             </div>

//             {/* DATE FILTERS */}
//             <div className="flex flex-wrap gap-4 mb-8">
//               <div className="flex flex-col text-xs text-gray-300">
//                 <label className="mb-1">From date</label>
//                 <input
//                   type="date"
//                   className="px-3 py-2 rounded-xl bg-slate-900/70 text-white border border-blue-400/40 focus:ring-2 focus:ring-cyan-400"
//                   value={dateFrom}
//                   onChange={(e) => setDateFrom(e.target.value)}
//                 />
//               </div>

//               <div className="flex flex-col text-xs text-gray-300">
//                 <label className="mb-1">To date</label>
//                 <input
//                   type="date"
//                   className="px-3 py-2 rounded-xl bg-slate-900/70 text-white border border-blue-400/40 focus:ring-2 focus:ring-cyan-400"
//                   value={dateTo}
//                   onChange={(e) => setDateTo(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* LIST */}
//             {loading ? (
//               <p className="text-gray-200 text-lg">Loading...</p>
//             ) : filteredResumes.length === 0 ? (
//               <p className="text-gray-200 text-lg">No resumes found.</p>
//             ) : (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {filteredResumes.map((resume, index) => {
//                   const displayName =
//                     resume.originalName ||
//                     resume.fileName ||
//                     resume.name ||
//                     "resume.pdf";

//                   return (
//                     <div
//                       key={resume._id || index}
//                       className="animate-slideUp"
//                       style={{ animationDelay: `${index * 0.07}s` }}
//                     >
//                       <div className="bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 p-[1px] rounded-2xl">
//                         <div className="bg-slate-950/90 rounded-2xl p-4 h-full flex flex-col justify-between border border-white/10 backdrop-blur-xl shadow-xl">
//                           {/* TOP */}
//                           <div>
//                             <div className="flex justify-between items-start mb-3">
//                               <div className="flex gap-2 items-center">
//                                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center text-xl shadow">
//                                   📄
//                                 </div>

//                                 <div className="max-w-[180px]">
//                                   <p className="text-sm font-semibold text-white truncate">
//                                     {displayName}
//                                   </p>
//                                   <p className="text-[11px] text-gray-300 mt-1">
//                                     {resume.mimeType}
//                                   </p>
//                                 </div>
//                               </div>

//                               <div className="text-[10px] text-gray-300 text-right">
//                                 <strong className="text-gray-200">
//                                   {formatSize(resume.size)}
//                                 </strong>
//                                 <br />
//                                 <span>ID: {resume._id?.slice(-6)}</span>
//                               </div>
//                             </div>

//                             {/* DATES */}
//                             <p className="text-[11px] text-gray-200">
//                               Created: {formatDateTime(resume.createdAt)}
//                             </p>
//                           </div>

//                           {/* ACTION BUTTONS */}
//                           <div className="flex gap-2 mt-4 flex-wrap">
//                             <button
//                               onClick={() => setResumeModal(resume.resumeUrl)}
//                               className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-slate-900 font-semibold text-xs hover:scale-105 transition"
//                             >
//                               View
//                             </button>

//                             <a
//                               href={resume.resumeUrl}
//                               download
//                               className="flex-1 px-3 py-2 rounded-xl border border-blue-300/70 text-gray-100 text-xs text-center hover:bg-blue-500/10 transition"
//                             >
//                               Download
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* MODAL VIEWER */}
//         {resumeModal && (
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
//             <div className="bg-white rounded-2xl shadow-2xl p-4 w-[80%] h-[80%] relative">
//               <button
//                 onClick={() => setResumeModal(null)}
//                 className="absolute top-3 right-3 text-xl font-bold hover:text-red-600"
//               >
//                 ✖
//               </button>

//               <iframe
//                 src={`${resumeModal}#toolbar=1&navpanes=0`}
//                 className="w-full h-full border rounded-xl"
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//         .animate-slideUp {
//           animation: slideUp 0.7s ease-out forwards;
//         }
//       `}</style>

//       <Footer />
//     </>
//   );
// }

// src/components/ViewResumes.jsx
import { useEffect, useState, useMemo } from "react";
import Header from "./Header";
import Footer from "./Footer";
import API from "../api/axios";

export default function ViewResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filteredResumes, setFilteredResumes] = useState([]);

  // filters
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [fileType, setFileType] = useState("all");
  const [sortOrder, setSortOrder] = useState("new");

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const [resumeModal, setResumeModal] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get("/resumes");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.resumes || [];

        setResumes(data);
        setFilteredResumes(data);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  // ⭐ ALL FILTER LOGIC (search + date + fileType + sort) — NO UI CHANGE
  const processedData = useMemo(() => {
    let list = [...resumes];

    // search filter
    if (search.trim() !== "") {
      list = list.filter((r) => {
        const name = r.originalName || r.fileName || r.name || "resume.pdf";
        return (
          name.toLowerCase().includes(search.toLowerCase()) ||
          (r.mimeType || "").toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    // file type filter
    if (fileType !== "all") {
      list = list.filter((r) =>
        (r.mimeType || "").toLowerCase().includes(fileType)
      );
    }

    // date filter
    if (dateFrom || dateTo) {
      list = list.filter((r) => {
        const created = new Date(r.createdAt);
        const onlyDate = new Date(
          created.getFullYear(),
          created.getMonth(),
          created.getDate()
        );

        if (dateFrom) {
          const from = new Date(dateFrom);
          if (onlyDate < from) return false;
        }
        if (dateTo) {
          const to = new Date(dateTo);
          if (onlyDate > to) return false;
        }
        return true;
      });
    }

    // sorting
    list.sort((a, b) => {
      const da = new Date(a.createdAt);
      const db = new Date(b.createdAt);
      return sortOrder === "new" ? db - da : da - db;
    });

    return list;
  }, [search, dateFrom, dateTo, fileType, sortOrder, resumes]);

  // pagination calculations
  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = processedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    setFilteredResumes(processedData);
  }, [processedData]);

  const formatDateTime = (d) => {
    if (!d) return "—";
    const date = new Date(d);
    return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const formatSize = (bytes) => {
    if (!bytes) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <>
      <Header />

      <div
        className="min-h-screen p-8 relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
            {/* HEADER */}
            <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end">
              <div>
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-1">
                  Uploaded Resumes
                </h1>
                <p className="text-lg text-gray-300">
                  Browse, view and download resumes submitted via careers page.
                </p>
              </div>

              <div className="text-gray-300 text-sm">
                Total:
                <span className="text-white font-semibold">
                  {" "}
                  {processedData.length}
                </span>
              </div>
            </div>

            {/* FILTER BAR (Search + File Type + Sort) */}
            <div className="flex flex-wrap items-end gap-4 mb-8">
              <input
                type="text"
                placeholder="Search resumes…"
                className="px-4 py-2 rounded-xl bg-slate-900/70 text-white border border-purple-400/40"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

              <select
                className="px-4 py-2 rounded-xl bg-slate-900/70 text-white border border-cyan-400/40"
                value={fileType}
                onChange={(e) => {
                  setFileType(e.target.value);
                  setPage(1);
                }}
              >
                <option value="all">All types</option>
                <option value="pdf">PDF</option>
                <option value="doc">DOC / DOCX</option>
              </select>

              <select
                className="px-3 py-2 rounded-xl bg-slate-900/70 text-white border border-blue-400/40"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="new">Newest → Oldest</option>
                <option value="old">Oldest → Newest</option>
              </select>
            </div>

            {/* DATE FILTERS */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex flex-col text-xs text-gray-300">
                <label className="mb-1">From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900/70 border border-blue-400/40 text-white"
                />
              </div>

              <div className="flex flex-col text-xs text-gray-300">
                <label className="mb-1">To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900/70 border border-blue-400/40 text-white"
                />
              </div>
            </div>

            {/* LIST */}
            {loading ? (
              <p className="text-gray-200 text-lg">Loading…</p>
            ) : paginatedData.length === 0 ? (
              <p className="text-gray-200 text-lg">No resumes found.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedData.map((resume, index) => {
                  const name =
                    resume.originalName ||
                    resume.fileName ||
                    resume.name ||
                    "resume.pdf";

                  return (
                    <div
                      key={resume._id || index}
                      className="animate-slideUp"
                      style={{ animationDelay: `${index * 0.07}s` }}
                    >
                      <div className="bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 p-[1px] rounded-2xl">
                        <div className="bg-slate-950/90 rounded-2xl p-4 h-full border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                          {/* top */}
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex gap-2 items-center">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center text-xl shadow">
                                  📄
                                </div>

                                <div className="max-w-[180px]">
                                  <p className="text-sm font-semibold text-white truncate">
                                    {name}
                                  </p>
                                  <p className="text-[11px] text-gray-300 mt-1">
                                    {resume.mimeType}
                                  </p>
                                </div>
                              </div>

                              <div className="text-[10px] text-gray-300 text-right">
                                <strong className="text-gray-200">
                                  {formatSize(resume.size)}
                                </strong>
                                <br />
                                <span>ID: {resume._id?.slice(-6)}</span>
                              </div>
                            </div>

                            <p className="text-[11px] text-gray-200">
                              Created: {formatDateTime(resume.createdAt)}
                            </p>
                          </div>

                          {/* buttons */}
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() => setResumeModal(resume.resumeUrl)}
                              className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-slate-900 font-semibold text-xs hover:scale-105 transition"
                            >
                              View
                            </button>

                            <a
                              download
                              href={resume.resumeUrl}
                              className="flex-1 px-3 py-2 rounded-xl border border-blue-300/70 text-gray-100 text-xs text-center hover:bg-blue-500/10"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-10">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 text-sm bg-slate-900/60 text-white rounded-xl border border-white/10 disabled:opacity-30"
                >
                  Prev
                </button>

                <span className="text-gray-300 text-sm">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 text-sm bg-slate-900/60 text-white rounded-xl border border-white/10 disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MODAL */}
        {resumeModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
            <div className="bg-white rounded-2xl shadow-2xl p-4 w-[80%] h-[80%] relative">
              <button
                onClick={() => setResumeModal(null)}
                className="absolute top-3 right-3 text-xl font-bold hover:text-red-600"
              >
                ✖
              </button>

              <iframe
                src={`${resumeModal}#toolbar=1&navpanes=0`}
                className="w-full h-full rounded-xl"
              />
            </div>
          </div>
        )}
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.7s ease-out forwards;
        }
      `}</style>

      <Footer />
    </>
  );
}
