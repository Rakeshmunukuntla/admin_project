// src/pages/CreateEvent.jsx
"use client";

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [organizers, setOrganizers] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("organizers", organizers);
      formData.append("location", location);
      if (imageFile) {
        formData.append("banner", imageFile);
      }

      const res = await API.post("http://localhost:5000/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to create event");
      }

      setStatus("success");

      // reset
      setTitle("");
      setSubtitle("");
      setDescription("");
      setDate("");
      setOrganizers("");
      setLocation("");
      setImageFile(null);

      // redirect to manage events after short delay
      setTimeout(() => {
        navigate("/events");
      }, 1200);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong");
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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        <div className="relative z-10 max-w-4xl mx-auto py-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 mb-3">
              Create Event
            </h1>
            <p className="text-gray-300 text-lg">
              Add a new event to power your homepage banner & event pages.
            </p>
          </div>

          {/* Card */}
          <div className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* gradient aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/40 via-purple-500/40 to-pink-500/40 opacity-60 blur-3xl pointer-events-none"></div>

            <div className="relative p-8 space-y-6">
              {status === "success" && (
                <div className="mb-4 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 text-emerald-200 px-4 py-3 text-sm">
                  ✅ Event created successfully! Redirecting to Manage Events…
                </div>
              )}

              {status === "error" && (
                <div className="mb-4 rounded-2xl border border-red-400/40 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                  ⚠ {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: title */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Annual Tech Innovation Summit 2025"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Shaping the future of AI, Cloud & Digital Experience"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Write a compelling description of the event, agenda, audience, value, etc."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  ></textarea>
                </div>

                {/* Date + Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Date *
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      placeholder="20 Dec 2025 • 10:00 AM IST"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="CJSS HQ, Hyderabad / Virtual"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                </div>

                {/* Organizers */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Organizers (comma separated)
                  </label>
                  <input
                    type="text"
                    value={organizers}
                    onChange={(e) => setOrganizers(e.target.value)}
                    placeholder="CJSS Technologies, SAP Practice, AEM Guild"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Example:{" "}
                    <span className="italic">Team A, Team B, Partner X</span>
                  </p>
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Banner Image (for homepage & event page)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0] || null)}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500/80 file:text-slate-900 hover:file:bg-sky-400 cursor-pointer"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Recommended: 1920×1080 JPG / WEBP for hero banner.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 text-slate-900 font-semibold shadow-lg hover:shadow-pink-500/40 hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Creating event…" : "Create Event"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/events")}
                    className="px-6 py-3 rounded-xl border border-white/30 text-gray-200 hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
