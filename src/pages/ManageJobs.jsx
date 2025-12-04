import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Footer from "./Footer";
import Header from "./Header";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    const res = await API.get("/jobs");
    setJobs(res.data);
  };

  const deleteJob = async (id) => {
    if (window.confirm("Delete this job?")) {
      await API.delete(`/jobs/${id}`);
      fetchJobs();
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Header />

      {/* ------------------- SAME BACKGROUND AS DASHBOARD ------------------- */}
      <div
        className="min-h-screen p-8 relative overflow-hidden flex justify-center items-start"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 w-full max-w-7xl p-6">
          <h1 className="text-4xl font-extrabold text-white mb-10 text-center drop-shadow-xl">
            Manage Jobs
          </h1>

          {/* ---------- ATTRACTIVE CARD GRID ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="p-6 rounded-3xl shadow-2xl 
                  bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                  text-white border border-white/10 
                  hover:scale-[1.02] transition-all duration-300 
                  hover:shadow-cyan-500/20"
              >
                {/* TITLE */}
                <h2
                  className="text-2xl font-extrabold 
                  bg-gradient-to-r from-cyan-400 to-blue-400 
                  bg-clip-text text-transparent mb-2"
                >
                  {job.title}
                </h2>

                {/* CATEGORY */}
                <p
                  className="text-sm bg-blue-600/20 text-blue-300 
                    inline-block px-3 py-1 rounded-full font-semibold"
                >
                  {job.category}
                </p>

                {/* EXPERIENCE */}
                <p className="mt-4 text-gray-300">
                  <span className="font-semibold text-cyan-300">
                    Experience:
                  </span>{" "}
                  {job.experience}
                </p>

                {/* LOCATION */}
                <p className="mt-1 text-gray-300">
                  <span className="font-semibold text-cyan-300">Location:</span>{" "}
                  {job.location}{" "}
                  <span className="text-purple-300">({job.locationType})</span>
                </p>

                {/* SKILLS */}
                <div
                  className="mt-4 bg-white/10 p-3 rounded-xl 
                    border border-white/10 text-gray-200 text-sm shadow-inner"
                >
                  <strong className="text-cyan-300">Skills:</strong>
                  <p className="mt-1">{job.skills?.join(", ")}</p>
                </div>

                {/* DESCRIPTION */}
                <div
                  className="mt-4 bg-white/5 p-3 rounded-xl 
                    border border-white/10 text-gray-200 text-sm"
                >
                  <strong className="text-purple-300">Description:</strong>
                  <p className="mt-1 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => navigate(`/edit-job/${job._id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl 
                      hover:bg-blue-700 transition-all shadow-lg 
                      hover:shadow-blue-500/30"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteJob(job._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl 
                      hover:bg-red-700 transition-all shadow-lg 
                      hover:shadow-red-500/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
