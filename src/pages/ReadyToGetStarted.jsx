// src/pages/ViewContacts.jsx

import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import API from "../api/axios";

export default function ViewContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expandedId, setExpandedId] = useState(null);

  // 🟡 DELETE CONFIRM POPUP
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // 🟢 SUCCESS POPUP
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // 🔴 ERROR POPUP
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await API.get("/contact");
        setContacts(res.data.contacts || []);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const deleteContact = async () => {
    try {
      await API.delete(`/contact/${deleteId}`);

      setContacts((prev) => prev.filter((c) => c._id !== deleteId));

      setSuccessMessage("Contact message deleted.");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    } catch (err) {
      console.error("Delete error:", err);

      setErrorMessage("Failed to delete message");
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }

    setConfirmDelete(false);
    setDeleteId(null);
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
                            onClick={() => handleDeleteConfirm(c._id)}
                            className="bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs px-3 py-1 rounded-full shadow transition"
                          >
                            Delete
                          </button>
                        </div>

                        <p className="text-gray-300 text-xs mb-3">
                          {formatDate(c.createdAt)}
                        </p>

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

      {/* DELETE CONFIRM POPUP */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999]">
          <div className="bg-white text-slate-900 px-8 py-6 w-[350px] rounded-2xl shadow-2xl animate-pop text-center">
            <h2 className="text-xl font-bold mb-2">Delete Message?</h2>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete this message?
            </p>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-gray-300 text-gray-900 font-semibold hover:bg-gray-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={deleteContact}
                className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999]">
          <div className="bg-white text-slate-900 px-8 py-6 rounded-2xl shadow-2xl animate-pop">
            <h2 className="text-2xl font-bold mb-2">🎉 Success!</h2>
            <p className="text-md">{successMessage}</p>
          </div>
        </div>
      )}

      {/* ERROR POPUP */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999]">
          <div className="bg-red-600 text-white px-8 py-6 rounded-2xl shadow-2xl animate-pop">
            <h2 className="text-2xl font-bold mb-2">⚠ Error</h2>
            <p className="text-md">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slideUp { animation: slideUp .6s ease-out forwards; }

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
