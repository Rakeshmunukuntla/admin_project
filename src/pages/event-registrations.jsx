"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function EventRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  const fetchRegistrations = async () => {
    const res = await fetch("http://localhost:5000/events/registrations/all");
    const data = await res.json();
    setRegistrations(data.registrations || []);
  };

  const deleteRegistration = async (id) => {
    if (window.confirm("Delete this registration?")) {
      await fetch(`http://localhost:5000/events/registrations/${id}`, {
        method: "DELETE",
      });
      fetchRegistrations();
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <>
      <Header />

      {/* STYLISH BACKGROUND SAME AS MANAGE JOBS */}
      <div
        className="min-h-screen p-8 relative overflow-hidden flex justify-center items-start"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 w-full max-w-7xl p-6">
          <h1 className="text-4xl font-extrabold text-white mb-10 text-center drop-shadow-xl">
            Event Registrations
          </h1>

          {/* CARDS GRID */}
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
                {/* NAME */}
                <h2
                  className="text-2xl font-extrabold 
                  bg-gradient-to-r from-purple-400 to-pink-400 
                  bg-clip-text text-transparent mb-2"
                >
                  {reg.fullName}
                </h2>

                {/* EMAIL */}
                <p className="text-gray-300 mt-2">
                  <span className="font-semibold text-purple-300">Email:</span>{" "}
                  {reg.email}
                </p>

                {/* PHONE */}
                <p className="text-gray-300 mt-1">
                  <span className="font-semibold text-purple-300">Phone:</span>{" "}
                  {reg.phone || "-"}
                </p>

                {/* ORGANIZATION */}
                <p className="text-gray-300 mt-1">
                  <span className="font-semibold text-purple-300">
                    Organization:
                  </span>{" "}
                  {reg.organization || "-"}
                </p>

                {/* JOB TITLE */}
                <p className="text-gray-300 mt-1">
                  <span className="font-semibold text-purple-300">
                    Job Title:
                  </span>{" "}
                  {reg.jobTitle || "-"}
                </p>

                {/* EVENT TITLE */}
                <div
                  className="mt-4 bg-white/10 p-3 rounded-xl 
                    border border-white/10 text-gray-200 text-sm shadow-inner"
                >
                  <strong className="text-purple-300">Event:</strong>
                  <p className="mt-1">{reg.eventId?.title}</p>
                </div>

                {/* DATE */}
                <p className="mt-3 text-sm text-gray-400">
                  Registered: {new Date(reg.createdAt).toLocaleDateString()}
                </p>

                {/* DELETE BUTTON */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => deleteRegistration(reg._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl 
                      hover:bg-red-700 transition-all shadow-lg 
                      hover:shadow-red-500/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* EMPTY STATE */}
            {registrations.length === 0 && (
              <p className="text-gray-400 text-xl col-span-full text-center">
                No registrations found.
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
