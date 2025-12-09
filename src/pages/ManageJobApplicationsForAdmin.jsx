import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import API from "../api/axios";

export default function ManageJobApplications() {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState("All");

  const [resumeModal, setResumeModal] = useState(null);

  const [statusMap, setStatusMap] = useState({});

  // -------------------------------
  // ⭐ POPUP STATES
  // -------------------------------
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/applications");

        const apps = Array.isArray(res.data)
          ? res.data
          : res.data.applications || [];

        setApplications(apps);
        setFilteredApps(apps);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // 🔍 Search & Filter Logic
  useEffect(() => {
    let filtered = [...applications];

    if (search.trim() !== "") {
      filtered = filtered.filter((app) =>
        `${app.firstName} ${app.lastName} ${app.email} ${app.jobTitle}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (selectedJob !== "All") {
      filtered = filtered.filter((app) => app.jobTitle === selectedJob);
    }

    setFilteredApps(filtered);
  }, [search, selectedJob, applications]);

  // 🟦 Unique job titles
  const jobTitles = ["All", ...new Set(applications.map((a) => a.jobTitle))];

  // -------------------------------
  // 🔥 OPEN DELETE POPUP
  // -------------------------------
  const openDeletePopup = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  // -------------------------------
  // 🗑 DELETE CONFIRMED
  // -------------------------------
  const deleteApplication = async () => {
    try {
      await API.delete(`/applications/${deleteId}`);

      setApplications((prev) => prev.filter((a) => a._id !== deleteId));
      setFilteredApps((prev) => prev.filter((a) => a._id !== deleteId));

      setSuccessMessage("Application deleted successfully!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to delete application");
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
    }

    setConfirmDelete(false);
    setDeleteId(null);
  };

  // ⭐ Shortlist (UI only)
  const handleShortlist = (id) => {
    setStatusMap((prev) => ({ ...prev, [id]: "Shortlisted" }));
  };

  return (
    <>
      <Header />

      {/* Background */}
      <div
        className="min-h-screen p-8 relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header section */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl p-8 md:p-10">
            <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Job Applications
                </h1>
                <p className="text-sky-200 mt-2 text-lg">
                  Search, filter & manage candidate submissions.
                </p>
              </div>

              <div className="text-sky-100 text-lg font-semibold">
                Total:{" "}
                <span className="text-cyan-300 font-bold">
                  {filteredApps.length}
                </span>
              </div>
            </div>

            {/* SEARCH + FILTER */}
            <div className="flex flex-wrap gap-4 mb-8">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 px-4 py-3 rounded-xl bg-slate-800/60 text-white border border-cyan-400/40 placeholder-gray-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="px-4 py-3 rounded-xl bg-slate-800/60 border border-purple-400/30 text-white"
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
              >
                {jobTitles.map((title) => (
                  <option key={title}>{title}</option>
                ))}
              </select>
            </div>

            {/* LIST */}
            {loading ? (
              <p className="text-sky-100 text-lg">Loading...</p>
            ) : filteredApps.length === 0 ? (
              <p className="text-sky-100 text-lg">No applications found.</p>
            ) : (
              <div className="space-y-6">
                {filteredApps.map((app, index) => {
                  const currentStatus = statusMap[app._id] || "New";

                  return (
                    <div
                      key={app._id}
                      className="animate-slideUp"
                      style={{ animationDelay: `${index * 0.12}s` }}
                    >
                      <div className="bg-gradient-to-r from-cyan-400/50 via-indigo-400/50 to-purple-400/50 p-[1px] rounded-2xl">
                        <div className="bg-slate-900/80 p-6 rounded-2xl shadow-lg border border-white/10">
                          {/* Header Row */}
                          <div className="flex justify-between flex-wrap">
                            <div>
                              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                {app.jobTitle}
                              </h2>

                              <p className="text-cyan-200 text-xl mt-1">
                                {app.firstName} {app.lastName}
                              </p>
                            </div>

                            <div className="flex flex-col items-end">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-bold ${
                                  currentStatus === "New"
                                    ? "bg-blue-600/30 text-blue-200"
                                    : "bg-emerald-600/30 text-emerald-200"
                                }`}
                              >
                                {currentStatus}
                              </span>

                              <span className="px-3 py-1 rounded-full text-sm bg-cyan-600/20 text-cyan-200 border border-cyan-400/40 font-bold mt-1">
                                {new Date(app.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sky-100 mt-4">
                            <p>
                              <strong className="text-cyan-300">Email:</strong>{" "}
                              {app.email}
                            </p>
                            <p>
                              <strong className="text-cyan-300">Phone:</strong>{" "}
                              {app.phone}
                            </p>
                            <p>
                              <strong className="text-cyan-300">
                                Qualification:
                              </strong>{" "}
                              {app.qualification}
                            </p>
                            <p>
                              <strong className="text-cyan-300">
                                Applied:
                              </strong>{" "}
                              {new Date(app.createdAt).toLocaleString()}
                            </p>
                          </div>

                          {/* ACTION BUTTONS */}
                          <div className="flex gap-3 mt-5 flex-wrap">
                            <button
                              onClick={() => setResumeModal(app.resumeUrl)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 
                                text-slate-900 font-semibold shadow hover:scale-105 transition"
                            >
                              📄 View Resume
                            </button>

                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-xl border border-sky-300/50 text-sky-100 hover:bg-sky-500/10 transition"
                            >
                              🔗 Download
                            </a>

                            <button
                              onClick={() => handleShortlist(app._id)}
                              className="px-4 py-2 rounded-xl bg-emerald-600/80 text-white font-semibold hover:bg-emerald-500 transition"
                            >
                              ⭐ Shortlist
                            </button>

                            <button
                              onClick={() => openDeletePopup(app._id)}
                              className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition"
                            >
                              🗑 Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RESUME MODAL */}
        {resumeModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
            <div className="bg-white rounded-2xl shadow-2xl p-4 w-[80%] h-[80%] relative flex flex-col">
              <button
                onClick={() => setResumeModal(null)}
                className="absolute top-3 right-3 text-black text-xl font-bold hover:text-red-600"
              >
                ✖
              </button>

              <iframe
                src={`${resumeModal}#toolbar=1&navpanes=0`}
                className="w-full h-full rounded-lg border border-gray-300"
                title="Resume Viewer"
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------- DELETE POPUP ------------------------- */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-xl w-[360px] animate-pop text-center">
            <h2 className="text-xl font-bold mb-2">Delete Application?</h2>
            <p className="text-gray-600 mb-5">
              Are you sure you want to remove this job application?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2 bg-gray-300 rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={deleteApplication}
                className="flex-1 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-[1000]">
          <div className="bg-white px-8 py-6 rounded-2xl shadow-xl animate-pop">
            <h2 className="text-2xl font-bold mb-1">🎉 Success!</h2>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* ERROR POPUP */}
      {showError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-[1000]">
          <div className="bg-red-600 text-white px-8 py-6 rounded-2xl shadow-xl animate-pop">
            <h2 className="text-xl font-bold mb-1">⚠ Error</h2>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop { animation: pop 0.25s ease-out; }
      `}</style>

      <Footer />
    </>
  );
}
