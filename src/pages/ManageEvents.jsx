"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import API from "../api/axios";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("new");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("http://localhost:5000/events");
        const data = res.data.events || [];
        setEvents(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setErrorMsg("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let list = [...events];

    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.title?.toLowerCase().includes(term) ||
          e.subtitle?.toLowerCase().includes(term) ||
          e.location?.toLowerCase().includes(term)
      );
    }

    list.sort((a, b) => {
      const da = new Date(a.createdAt);
      const db = new Date(b.createdAt);
      return sortOrder === "new" ? db - da : da - db;
    });

    setFiltered(list);
    setCurrentPage(1);
  }, [events, search, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageItems = filtered.slice(startIndex, startIndex + pageSize);

  const formatDateTime = (d) => {
    if (!d) return "—";
    const date = new Date(d);
    return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await API.delete(`http://localhost:5000/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete event");
    }
  };

  return (
    <>
      <Header />

      <div
        className="min-h-screen p-8 relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-8 md:p-10 mt-4 mb-6">
            <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 mb-1">
                  Manage Events
                </h1>
                <p className="text-gray-300 text-lg">
                  View, search, edit and delete upcoming & past events.
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <p className="text-sm text-gray-300">
                  Total:{" "}
                  <span className="font-semibold text-white">
                    {filtered.length}
                  </span>
                </p>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900/70 text-white border border-sky-400/50 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="new">Newest → Oldest</option>
                  <option value="old">Oldest → Newest</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-950/80 border border-white/15 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>

            {/* Events List */}
            {loading ? (
              <p className="text-gray-200 text-lg">Loading events…</p>
            ) : errorMsg ? (
              <p className="text-red-300">{errorMsg}</p>
            ) : filtered.length === 0 ? (
              <p className="text-gray-200">No events found.</p>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  {currentPageItems.map((event, index) => (
                    <div
                      key={event._id}
                      className="relative group animate-slideUp"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="bg-gradient-to-r from-sky-500/60 via-purple-500/60 to-pink-500/60 p-[1px] rounded-2xl">
                        <div className="bg-slate-950/90 rounded-2xl border border-white/10 overflow-hidden">
                          {event.image && (
                            <div className="h-40 w-full overflow-hidden">
                              <img
                                src={event.image}
                                alt={event.title}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>
                          )}

                          <div className="p-5 flex flex-col h-full">
                            <h2 className="text-lg font-semibold text-white">
                              {event.title}
                            </h2>

                            <p className="text-xs text-sky-300">
                              {event.subtitle}
                            </p>

                            <p className="text-xs text-gray-300 mt-1">
                              📅 {event.date}
                            </p>

                            <p className="text-xs text-gray-300">
                              📍 {event.location}
                            </p>

                            <p className="text-sm text-gray-200 mt-3 line-clamp-3">
                              {event.description}
                            </p>

                            <div className="mt-auto pt-3 flex justify-between border-t border-white/10">
                              {/* EDIT → goes to Edit page */}
                              <button
                                onClick={() => navigate(`/events/${event._id}`)}
                                className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 text-slate-900 hover:scale-105 transition"
                              >
                                Edit
                              </button>

                              {/* DELETE */}
                              <button
                                onClick={() => handleDelete(event._id)}
                                className="px-3 py-2 rounded-xl text-xs border border-red-400/70 text-red-300 hover:bg-red-500/10 hover:scale-105 transition ml-2"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-3 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-white/20 rounded-lg text-gray-200 disabled:opacity-40"
                  >
                    Prev
                  </button>
                  <span className="text-gray-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-white/20 rounded-lg text-gray-200 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
