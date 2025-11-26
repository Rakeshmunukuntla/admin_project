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

      <div
        className="min-h-screen flex justify-center items-start py-16 px-4
      bg-gradient-to-br from-blue-100 via-cyan-200 to-emerald-300"
      >
        <div
          className="w-full max-w-6xl bg-white/30 backdrop-blur-xl 
        border border-white/40 p-10 rounded-3xl shadow-2xl"
        >
          <h1 className="text-4xl font-extrabold text-neutral-900 mb-10 text-center drop-shadow-lg">
            Manage Jobs
          </h1>

          {/* Table Wrapper */}
          <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/80">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-neutral-200/60 border-b text-neutral-800">
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4 w-48">Skills</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Type</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job._id}
                    className="border-b hover:bg-neutral-100/60 transition"
                  >
                    <td className="p-4 font-semibold text-neutral-900">
                      {job.title}
                    </td>

                    <td className="p-4">{job.category}</td>

                    <td className="p-4">{job.experience}</td>

                    {/* Skills Box */}
                    <td className="p-4">
                      <div className="max-h-24 overflow-y-auto bg-neutral-100 p-2 rounded text-xs shadow-inner">
                        {job.skills?.join(", ")}
                      </div>
                    </td>

                    {/* New: Location field */}
                    <td className="p-4">{job.location}</td>

                    {/* New: Location Type */}
                    <td className="p-4">{job.locationType}</td>

                    {/* Buttons */}
                    <td className="p-4 text-center space-x-3">
                      <button
                        onClick={() => navigate(`/edit-job/${job._id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteJob(job._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
