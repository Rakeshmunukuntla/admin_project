import React, { useEffect, useMemo, useState } from "react";
import API from "../api/axios"; // your axios instance (or replace with fetch)
import Header from "./Header";
import Footer from "./Footer";

export default function StartConversation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const [sortOrder, setSortOrder] = useState("new"); // "new" | "old"
  const [expandedId, setExpandedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // fetch conversations
  const fetchConversations = async () => {
    setLoading(true);
    try {
      const res = await API.get("/conversations"); // ensure baseURL is set in API or use full URL
      const data =
        res.data && res.data.conversations ? res.data.conversations : [];
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

  // delete handler
  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this conversation?");
    if (!ok) return;
    try {
      setDeletingId(id);
      await API.delete(`/conversations/${id}`);
      // optimistic UI: remove locally
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete. Check console.");
    } finally {
      setDeletingId(null);
    }
  };

  // derived (search + sort)
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
      <Header></Header>
      <div className="min-h-screen p-8 bg-gradient-to-b from-slate-900 via-indigo-950 to-sky-900">
        <div className="max-w-6xl mx-auto relative z-10">
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
                Conversations
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                All submissions from “Start a conversation”.
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <input
                aria-label="Search conversations"
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
                className="px-3 py-2 rounded-xl bg-white/6 border border-white/12 text-white "
              >
                <option className="bg-black" value="new">
                  Newest → Oldest
                </option>
                <option className="bg-black" value="old">
                  Oldest → Newest
                </option>
              </select>
              <div className="px-3 py-2 text-sm text-slate-300">
                Total:{" "}
                <span className="font-semibold text-white">
                  {filtered.length}
                </span>
              </div>
            </div>
          </header>

          {/* grid */}
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
                  // generate a couple of tags heuristics
                  const tags = [
                    c.status || "new",
                    c.email && c.email.includes("@")
                      ? "verified-email"
                      : "no-email",
                  ];
                  return (
                    <article
                      key={c._id}
                      className="relative rounded-2xl p-5 border border-white/10 bg-gradient-to-br from-white/6 to-white/3 backdrop-blur-md shadow-lg transform transition duration-400 hover:-translate-y-1 hover:shadow-2xl"
                      style={{
                        // subtle glass gradient + inset glow
                        boxShadow:
                          "0 10px 30px rgba(2,6,23,0.6), inset 0 0 30px rgba(255,255,255,0.02)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {c.email}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[11px] text-slate-300">
                              {formatDateTime(c.createdAt)}
                            </span>

                            {/* status badge */}
                            <span
                              className={`text-[11px] px-2 py-1 rounded-full font-medium ${
                                c.status === "closed"
                                  ? "bg-emerald-500/20 text-emerald-200"
                                  : c.status === "in_progress"
                                  ? "bg-amber-500/20 text-amber-200"
                                  : "bg-blue-500/20 text-blue-200"
                              }`}
                            >
                              {c.status || "new"}
                            </span>

                            {/* unread badge */}
                            {!c.read && (
                              <span className="ml-1 inline-block px-2 py-0.5 bg-pink-500/20 text-pink-200 rounded-full text-[11px]">
                                unread
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* expand */}
                          <button
                            onClick={() =>
                              setExpandedId(isExpanded ? null : c._id)
                            }
                            className="px-3 py-2 rounded-xl bg-white/6 text-white/90 hover:bg-white/8 border border-white/6"
                            title="Expand / Collapse"
                          >
                            {isExpanded ? "Collapse" : "View"}
                          </button>

                          {/* delete — premium gradient button */}
                          <button
                            onClick={() => handleDelete(c._id)}
                            disabled={deletingId === c._id}
                            className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-white"
                            style={{
                              background:
                                "linear-gradient(90deg,#ff6b6b,#ff3d3d)",
                              boxShadow: "0 8px 20px rgba(255,61,61,0.18)",
                              border: "1px solid rgba(255,255,255,0.06)",
                            }}
                            title="Delete"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden
                            >
                              <path
                                d="M3 6h18"
                                stroke="white"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6"
                                stroke="white"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10 11v6M14 11v6"
                                stroke="white"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {deletingId === c._id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>

                      {/* initiative preview */}
                      <div className="mt-4 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {isExpanded ? (
                          <p>{c.initiative}</p>
                        ) : (
                          <p className="line-clamp-3">{c.initiative}</p>
                        )}
                      </div>

                      {/* tags row */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((t, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-1 rounded-md bg-white/6 text-white/80 border border-white/6"
                          >
                            {t}
                          </span>
                        ))}
                        {/* example priority tag */}
                        {c.initiative && c.initiative.length > 240 && (
                          <span className="text-[11px] px-2 py-1 rounded-md bg-rose-600/20 text-rose-200 border border-rose-600/20">
                            Long message
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* pagination */}
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
                    className="px-3 py-2 rounded-xl bg-white/6 text-white/90"
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  <div className="px-3 py-2 text-white/90 rounded-xl bg-white/6">
                    {page}
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-2 rounded-xl bg-white/6 text-white/90"
                    disabled={page >= totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
