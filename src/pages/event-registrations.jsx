"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import API from "../api/axios"; // ⭐ using axios now

export default function EventRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  // POPUP STATES
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ⭐ Fetch registrations using Axios
  const fetchRegistrations = async () => {
    try {
      const res = await API.get("/events/registrations/all");
      setRegistrations(res.data.registrations || []);
    } catch (err) {
      console.error("Error fetching registrations:", err);
    }
  };

  // ⭐ Delete using Axios
  const deleteRegistration = async () => {
    try {
      await API.delete(`/events/registrations/${deleteId}`);

      setSuccessMessage("Registration deleted successfully!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);

      fetchRegistrations();
    } catch (err) {
      console.error("Delete error:", err);

      setErrorMessage("Failed to delete registration");
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }

    setConfirmDelete(false);
    setDeleteId(null);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <>
      <Header />

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
            Event Registrations
          </h1>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {registrations.map((reg) => (
              <div
                key={reg._id}
                className="p-6 rounded-3xl shadow-2xl 
                bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                text-white border border-white/10 
                hover:scale-[1.02] transition-all duration-300 
                hover:shadow-purple-500/20"
              >
                <h2
                  className="text-2xl font-extrabold 
                  bg-gradient-to-r from-purple-400 to-pink-400 
                  bg-clip-text text-transparent mb-2"
                >
                  {reg.fullName}
                </h2>

                <p className="text-gray-300 mt-2">
                  <span className="font-semibold text-purple-300">Email:</span>{" "}
                  {reg.email}
                </p>

                <p className="text-gray-300 mt-1">
                  <span className="font-semibold text-purple-300">Phone:</span>{" "}
                  {reg.phone || "-"}
                </p>

                <p className="text-gray-300 mt-1">
                  <span className="font-semibold text-purple-300">
                    Organization:
                  </span>{" "}
                  {reg.organization || "-"}
                </p>

                <p className="text-gray-300 mt-1">
                  <span className="font-semibold text-purple-300">
                    Job Title:
                  </span>{" "}
                  {reg.jobTitle || "-"}
                </p>

                <div
                  className="mt-4 bg-white/10 p-3 rounded-xl 
                    border border-white/10 text-gray-200 text-sm shadow-inner"
                >
                  <strong className="text-purple-300">Event:</strong>
                  <p className="mt-1">{reg.eventId?.title}</p>
                </div>

                <p className="mt-3 text-sm text-gray-400">
                  Registered: {new Date(reg.createdAt).toLocaleDateString()}
                </p>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      setDeleteId(reg._id);
                      setConfirmDelete(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl 
                      hover:bg-red-700 transition-all shadow-lg 
                      hover:shadow-red-500/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {registrations.length === 0 && (
              <p className="text-gray-400 text-xl col-span-full text-center">
                No registrations found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 🟡 DELETE CONFIRMATION POPUP */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999]">
          <div className="bg-white text-slate-900 px-8 py-6 w-[350px] rounded-2xl shadow-2xl animate-pop text-center">
            <h2 className="text-xl font-bold mb-2">Delete Registration?</h2>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete this registration?
            </p>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-gray-300 text-gray-900 font-semibold hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={deleteRegistration}
                className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999]">
          <div className="bg-white text-slate-900 px-8 py-6 rounded-2xl shadow-2xl animate-pop">
            <h2 className="text-2xl font-bold mb-2">🎉 Success!</h2>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* 🔴 ERROR POPUP */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999]">
          <div className="bg-red-600 text-white px-8 py-6 rounded-2xl shadow-2xl animate-pop">
            <h2 className="text-2xl font-bold mb-2">⚠ Error</h2>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes pop {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop {
          animation: pop 0.25s ease-out;
        }
      `}</style>
    </>
  );
}
