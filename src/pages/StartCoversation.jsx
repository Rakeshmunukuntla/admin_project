import React, { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import Header from "./Header";
import Footer from "./Footer";

export default function StartConversation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const [sortOrder, setSortOrder] = useState("new");
  const [expandedId, setExpandedId] = useState(null);

  // DELETE POPUP STATE
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // SUCCESS POPUP
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ERROR POPUP
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchConversations = async () => {
    try {
      const res = await API.get("/conversations");
      const data = res.data?.conversations || [];
      setItems(data);
    } catch (err) {
      console.error("Error fetching conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // open delete confirmation modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  // perform delete
  const handleDelete = async () => {
    try {
      await API.delete(`/conversations/${deleteId}`);

      // remove locally
      setItems((prev) => prev.filter((i) => i._id !== deleteId));

      // success popup
      setSuccessMessage("Conversation deleted successfully!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    } catch (err) {
      console.error("Delete failed:", err);

      // error popup
      setErrorMessage("Failed to delete conversation.");
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }

    setConfirmDelete(false);
    setDeleteId(null);
  };

  // Filtering + Sorting
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items.filter((c) => {
      if (!q) return true;
      return (
        (c.email || "").toLowerCase().includes(q) ||
        (c.initiative || "").toLowerCase().includes(q)
      );
    });

    list.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sortOrder === "new" ? db - da : da - db;
    });

    return list;
  }, [items, query, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = filtered.slice((page - 1) * perPage, page * perPage);

  const formatDateTime = (d) => {
    const date = new Date(d);
    return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <>
      <Header />

      <div className="min-h-screen p-8 bg-gradient-to-b from-slate-900 via-indigo-950 to-sky-900">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
                Conversations
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                All submissions from “Start a conversation”.
              </p>
            </div>

            {/* Search + Sort */}
            <div className="flex gap-3 items-center">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by email or message…"
                className="px-4 py-2 rounded-xl bg-white/6 border border-white/12 placeholder-slate-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white/6 border border-white/12 text-white"
              >
                <option value="new">Newest → Oldest</option>
                <option value="old">Oldest → Newest</option>
              </select>

              <div className="px-3 py-2 text-sm text-slate-300">
                Total:{" "}
                <span className="font-semibold text-white">
                  {filtered.length}
                </span>
              </div>
            </div>
          </header>

          {/* CONTENT */}
          {loading ? (
            <div className="p-8 rounded-2xl bg-white/6 border border-white/10 text-center text-slate-300">
              Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white/6 border border-white/10 text-center text-slate-300">
              No conversations yet.
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                {current.map((c) => {
                  const isExpanded = expandedId === c._id;

                  return (
                    <article
                      key={c._id}
                      className="relative rounded-2xl p-5 border border-white/10 bg-gradient-to-br from-white/6 to-white/3 backdrop-blur-md shadow-lg hover:-translate-y-1 hover:shadow-2xl transition duration-400"
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Info */}
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {c.email}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[11px] text-slate-300">
                              {formatDateTime(c.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {/* Expand */}
                          <button
                            onClick={() =>
                              setExpandedId(isExpanded ? null : c._id)
                            }
                            className="px-3 py-2 rounded-xl bg-white/6 text-white/90 hover:bg-white/8 border border-white/6"
                          >
                            {isExpanded ? "Collapse" : "View"}
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDeleteClick(c._id)}
                            className="ml-2 px-3 py-2 rounded-xl font-semibold text-white"
                            style={{
                              background:
                                "linear-gradient(90deg,#ff6b6b,#ff3d3d)",
                              boxShadow: "0 8px 20px rgba(255,61,61,0.18)",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {isExpanded ? (
                          c.initiative
                        ) : (
                          <p className="line-clamp-3">{c.initiative}</p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* PAGINATION */}
              <div className="mt-8 flex items-center justify-between">
                <div className="text-slate-300">
                  Showing{" "}
                  <span className="font-semibold text-white">
                    {(page - 1) * perPage + 1}
                  </span>{" "}
                  -{" "}
                  <span className="font-semibold text-white">
                    {Math.min(page * perPage, filtered.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-white">
                    {filtered.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-2 rounded-xl bg-white/6 text-white/90"
                  >
                    Prev
                  </button>

                  <div className="px-3 py-2 text-white/90 rounded-xl bg-white/6">
                    {page}
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="px-3 py-2 rounded-xl bg-white/6 text-white/90"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 🟡 DELETE CONFIRMATION POPUP */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999]">
          <div className="bg-white text-slate-900 px-8 py-6 w-[360px] rounded-2xl shadow-2xl animate-pop text-center">
            <h2 className="text-xl font-bold mb-2">Delete Conversation?</h2>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete this conversation?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2 rounded-xl bg-gray-300 text-gray-900 font-semibold hover:bg-gray-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[1000]">
          <div className="bg-white text-slate-900 px-8 py-6 rounded-2xl shadow-2xl animate-pop">
            <h2 className="text-2xl font-bold mb-2">🎉 Success!</h2>
            <p className="text-md">{successMessage}</p>
          </div>
        </div>
      )}

      {/* 🔴 ERROR POPUP */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[1000]">
          <div className="bg-red-600 text-white px-8 py-6 rounded-2xl shadow-2xl animate-pop">
            <h2 className="text-2xl font-bold mb-2">⚠ Error</h2>
            <p className="text-md">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop {
          animation: pop .25s ease-out;
        }
      `}</style>

      <Footer />
    </>
  );
}
