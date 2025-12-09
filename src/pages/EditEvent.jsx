"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Header from "./Header";
import Footer from "./Footer";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // ✅ Popup state

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEventData(res.data.event);
        setImagePreview(res.data.event.image);
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to load event");
      }
    };
    load();
  }, [id]);

  const handleChange = (field, value) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const saveEvent = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData();
      form.append("title", eventData.title);
      form.append("subtitle", eventData.subtitle);
      form.append("description", eventData.description);
      form.append("date", eventData.date);
      form.append("location", eventData.location);
      form.append("organizers", eventData.organizers.join(","));

      if (newImage) form.append("banner", newImage);

      const res = await API.put(`/events/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setShowSuccess(true); // ✅ Show popup

        setTimeout(() => {
          setShowSuccess(false);
          navigate("/events"); // Redirect after popup
        }, 1800);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update event");
    } finally {
      setSaving(false);
    }
  };

  if (!eventData)
    return <p className="text-white p-10 text-xl">Loading event...</p>;

  return (
    <>
      <Header />

      <div className="min-h-screen p-10 bg-[#020617] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-slate-800/60 to-sky-900/50"></div>

        <div className="relative z-10 max-w-3xl mx-auto bg-white/10 border border-white/20 rounded-3xl p-10 backdrop-blur-xl">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400 mb-5">
            Edit Event
          </h1>

          <form onSubmit={saveEvent} className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-gray-300 text-sm">Title</label>
              <input
                type="text"
                value={eventData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full bg-slate-900/60 border border-white/20 text-white px-4 py-3 rounded-xl"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="text-gray-300 text-sm">Subtitle</label>
              <input
                type="text"
                value={eventData.subtitle}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                className="w-full bg-slate-900/60 border border-white/20 text-white px-4 py-3 rounded-xl"
              />
            </div>

            {/* Date */}
            <div>
              <label className="text-gray-300 text-sm">Date</label>
              <input
                type="text"
                value={eventData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full bg-slate-900/60 border border-white/20 text-white px-4 py-3 rounded-xl"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-gray-300 text-sm">Location</label>
              <input
                type="text"
                value={eventData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full bg-slate-900/60 border border-white/20 text-white px-4 py-3 rounded-xl"
              />
            </div>

            {/* Organizers */}
            <div>
              <label className="text-gray-300 text-sm">Organizers</label>
              <input
                type="text"
                value={eventData.organizers.join(", ")}
                onChange={(e) =>
                  handleChange(
                    "organizers",
                    e.target.value.split(",").map((x) => x.trim())
                  )
                }
                className="w-full bg-slate-900/60 border border-white/20 text-white px-4 py-3 rounded-xl"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-gray-300 text-sm">Description</label>
              <textarea
                rows={5}
                value={eventData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full bg-slate-900/60 border border-white/20 text-white px-4 py-3 rounded-xl"
              ></textarea>
            </div>

            {/* Image */}
            <div>
              <label className="text-gray-300 text-sm">Event Banner</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="text-gray-300"
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  className="w-full h-56 object-cover rounded-xl mt-3 border border-white/20"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-purple-400 text-slate-900 font-bold hover:scale-105 transition-all shadow-lg shadow-purple-500/30"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[999]">
          <div className="bg-white text-slate-900 px-8 py-6 rounded-2xl shadow-2xl animate-pop">
            <h2 className="text-2xl font-bold mb-2">🎉 Success!</h2>
            <p className="text-md">Event updated successfully</p>
          </div>
        </div>
      )}

      <Footer />

      {/* Animation CSS */}
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
