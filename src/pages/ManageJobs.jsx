import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Footer from "./Footer";
import Header from "./Header";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // Delete Confirmation Popup
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Success Popup
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Error Popup
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to load jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Open delete pop-up
  const openDeletePopup = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  // Delete job
  const deleteJob = async () => {
    try {
      await API.delete(`/jobs/${deleteId}`);
      fetchJobs();

      setSuccessMessage("Job deleted successfully!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    } catch (err) {
      console.error("Delete failed:", err);

      setErrorMessage("Failed to delete job");
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }

    setConfirmDelete(false);
    setDeleteId(null);
  };

  return (
    <>
      <Header />

      {/* BG */}
      <div
        className="min-h-screen p-8 relative overflow-hidden flex justify-center items-start"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        <div className="relative z-10 w-full max-w-7xl p-6">
          <h1 className="text-4xl font-extrabold text-white mb-10 text-center drop-shadow-xl">
            Manage Jobs
          </h1>

          {/* JOB LIST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="p-6 rounded-3xl shadow-2xl bg-gradient-to-br 
                from-slate-900 via-slate-800 to-slate-900 text-white border 
                border-white/10 hover:scale-[1.02] transition-all duration-300 
                hover:shadow-cyan-500/20"
              >
                {/* Title */}
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {job.title}
                </h2>

                {/* Category */}
                <p className="text-sm bg-blue-600/20 text-blue-300 inline-block px-3 py-1 rounded-full font-semibold">
                  {job.category}
                </p>

                {/* Experience */}
                <p className="mt-4 text-gray-300">
                  <span className="font-semibold text-cyan-300">
                    Experience:
                  </span>{" "}
                  {job.experience}
                </p>

                {/* Location */}
                <p className="mt-1 text-gray-300">
                  <span className="font-semibold text-cyan-300">Location:</span>{" "}
                  {job.location}{" "}
                  <span className="text-purple-300">({job.locationType})</span>
                </p>

                {/* Skills */}
                <div className="mt-4 bg-white/10 p-3 rounded-xl border border-white/10 text-gray-200 text-sm shadow-inner">
                  <strong className="text-cyan-300">Skills:</strong>
                  <p className="mt-1">{job.skills?.join(", ")}</p>
                </div>

                {/* Description */}
                <div className="mt-4 bg-white/5 p-3 rounded-xl border border-white/10 text-gray-200 text-sm">
                  <strong className="text-purple-300">Description:</strong>
                  <p className="mt-1 whitespace-pre-line">{job.description}</p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => navigate(`/edit-job/${job._id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => openDeletePopup(job._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🟡 DELETE CONFIRMATION POPUP */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[900]">
          <div className="bg-white text-slate-900 px-8 py-6 w-[360px] rounded-2xl shadow-2xl animate-pop text-center">
            <h2 className="text-xl font-bold mb-2">Delete Job?</h2>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete this job posting?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2 bg-gray-300 text-gray-900 rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={deleteJob}
                className="flex-1 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[999]">
          <div className="bg-white text-slate-900 px-8 py-6 rounded-2xl shadow-2xl animate-pop">
            <h2 className="text-2xl font-bold mb-2">🎉 Success!</h2>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* 🔴 ERROR POPUP */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[999]">
          <div className="bg-red-600 text-white px-8 py-6 rounded-2xl shadow-2xl animate-pop">
            <h2 className="text-xl font-bold mb-2">⚠ Error!</h2>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* animation */}
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop {
          animation: pop 0.25s ease-out;
        }
      `}</style>

      <Footer />
    </>
  );
}
