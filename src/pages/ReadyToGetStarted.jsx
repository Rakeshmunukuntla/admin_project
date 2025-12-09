// src/pages/ViewContacts.jsx

import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import API from "../api/axios";

export default function ViewContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await API.get("http://localhost:5000/contact");
        setContacts(res.data.contacts || []);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this contact message?")) return;

    try {
      await API.delete(`http://localhost:5000/contact/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      <Header />

      <div
        className="min-h-screen p-8 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(
              0deg,
              transparent 24%,
              rgba(56,189,248,.18) 25%,
              rgba(56,189,248,.18) 26%,
              transparent 27%,
              transparent 74%,
              rgba(129,140,248,.16) 75%,
              rgba(129,140,248,.16) 76%,
              transparent 77%,
              transparent
            ),
            linear-gradient(
              90deg,
              transparent 24%,
              rgba(37,99,235,.18) 25%,
              rgba(37,99,235,.18) 26%,
              transparent 27%,
              transparent 74%,
              rgba(45,212,191,.16) 75%,
              rgba(45,212,191,.16) 76%,
              transparent 77%,
              transparent
            )`,
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-slate-900/80 to-sky-900/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10">
            {/* HEADER */}
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Contact Messages
                </h1>
                <p className="text-gray-300 text-lg">
                  All submissions from the "Ready to Get Started" form.
                </p>
              </div>

              <div className="text-gray-200 text-sm">
                Total:{" "}
                <span className="text-white font-bold">{contacts.length}</span>
              </div>
            </div>

            {/* LIST */}
            {loading ? (
              <p className="text-gray-200 text-lg">Loading...</p>
            ) : contacts.length === 0 ? (
              <p className="text-gray-200 text-lg">No messages found.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {contacts.map((c, index) => (
                  <div
                    key={c._id}
                    className="animate-slideUp"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="p-[1px] rounded-2xl bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40">
                      <div className="bg-slate-950/90 p-6 rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl">
                        {/* Top Row */}
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <p className="text-white font-semibold text-lg">
                              {c.name}
                            </p>
                            <p className="text-cyan-300 text-sm">{c.email}</p>
                          </div>

                          <button
                            onClick={() => handleDelete(c._id)}
                            className="bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs px-3 py-1 rounded-full shadow transition"
                          >
                            Delete
                          </button>
                        </div>

                        {/* Created Date */}
                        <p className="text-gray-300 text-xs mb-3">
                          {formatDate(c.createdAt)}
                        </p>

                        {/* Message */}
                        <p className="text-gray-100 text-sm break-words whitespace-pre-wrap">
                          {expandedId === c._id
                            ? c.message
                            : c.message.slice(0, 100)}
                          {c.message.length > 100 && (
                            <button
                              onClick={() =>
                                setExpandedId(
                                  expandedId === c._id ? null : c._id
                                )
                              }
                              className="text-cyan-400 ml-2 text-xs"
                            >
                              {expandedId === c._id ? "Show less" : "Read more"}
                            </button>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideUp {
          animation: slideUp .6s ease-out forwards;
        }
      `}</style>

      <Footer />
    </>
  );
}
