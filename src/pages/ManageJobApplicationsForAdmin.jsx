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

  const [resumeModal, setResumeModal] = useState(null); // stores resume URL

  // UI‑only status map
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get(
          "https://server-node-cjss.onrender.com/applications"
        );

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

  // 🗑 Delete Application
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    try {
      await API.delete(
        `https://server-node-cjss.onrender.com/applications/${id}`
      );

      setApplications((prev) => prev.filter((app) => app._id !== id));
      setFilteredApps((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  // ⭐ Shortlist (UI only)
  const handleShortlist = (id) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: "Shortlisted",
    }));
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
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        {/* MAIN CONTAINER */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-8 md:p-10">
            {/* HEADER */}
            <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-white">
                  Job Applications
                </h1>
                <p className="text-sky-200 mt-2">
                  Search, filter & manage candidate submissions.
                </p>
              </div>
              <div className="text-sky-100 text-sm">
                Total:{" "}
                <span className="font-semibold">
                  {filteredApps.length} application
                  {filteredApps.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* 🔍 SEARCH + FILTER */}
            <div className="flex flex-wrap gap-4 mb-8">
              <input
                type="text"
                placeholder="Search by name, email, job title..."
                className="flex-1 px-4 py-3 rounded-xl bg-slate-800/60 text-white border border-sky-400/30 placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="px-4 py-3 rounded-xl bg-slate-800/60 border border-purple-400/30 text-white"
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
              >
                {jobTitles.map((title, i) => (
                  <option key={i} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>

            {/* APPLICATION LIST */}
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
                        <div className="bg-slate-900/80 rounded-2xl p-6 backdrop-blur-xl shadow-lg border border-white/10">
                          <div className="flex justify-between flex-wrap gap-2">
                            <div>
                              <h2 className="text-2xl text-white font-bold">
                                {app.jobTitle}
                              </h2>
                              <p className="text-sky-200 mt-1">
                                {app.firstName} {app.lastName}
                              </p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              {/* Status */}
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  currentStatus === "New"
                                    ? "bg-blue-500/20 text-blue-200 border border-blue-400/40"
                                    : "bg-emerald-500/20 text-emerald-200 border border-emerald-400/40"
                                }`}
                              >
                                {currentStatus}
                              </span>

                              <span className="px-3 py-1 h-fit rounded-full text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                                {new Date(app.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sky-100 mt-4">
                            <p>
                              <b>Email:</b> {app.email}
                            </p>
                            <p>
                              <b>Phone:</b> {app.phone}
                            </p>
                            <p>
                              <b>Qualification:</b> {app.qualification}
                            </p>
                            <p>
                              <b>Applied:</b>{" "}
                              {new Date(app.createdAt).toLocaleString()}
                            </p>
                          </div>

                          {/* ACTIONS */}
                          <div className="flex gap-3 mt-5 flex-wrap">
                            <button
                              onClick={() => setResumeModal(app.resumeUrl)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-900 font-semibold shadow hover:scale-105 transition"
                            >
                              📄 View Resume
                            </button>

                            {/* NEW: Open in new tab */}
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
                              onClick={() => handleDelete(app._id)}
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

        {/* 🔵 RESUME MODAL POPUP */}
        {resumeModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
            <div className="bg-white rounded-2xl shadow-2xl p-4 w-[80%] h-[80%] relative flex flex-col">
              {/* Close button */}
              <button
                onClick={() => setResumeModal(null)}
                className="absolute top-3 right-3 text-black text-xl font-bold hover:text-red-600"
              >
                ✖
              </button>

              {/* Iframe */}
              <iframe
                src={`${resumeModal}#toolbar=1&navpanes=0`}
                className="w-full h-full rounded-lg border border-gray-300"
                title="Resume Viewer"
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>

      <Footer />
    </>
  );
}
