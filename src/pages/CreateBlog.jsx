import { useState } from "react";
import API from "../api/axios";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { showToast } from "../toast";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "blogs",
    title: "",
    summary: "",
    author: "",
    designation: "",
    publishedDate: "",
    content: "",
    readTime: "",
  });

  const [banner, setBanner] = useState(null);
  const [errors, setErrors] = useState({});

  const textOnlyRegex = /^[A-Za-z\s()\/-]*$/;

  const validateForm = () => {
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    else if (!textOnlyRegex.test(form.title))
      newErrors.title = "Only alphabets allowed";

    if (!form.summary.trim()) newErrors.summary = "Summary is required";

    if (!form.author.trim()) newErrors.author = "Author is required";
    else if (!textOnlyRegex.test(form.author))
      newErrors.author = "Only alphabets allowed";

    if (!form.designation.trim())
      newErrors.designation = "Designation is required";

    if (!form.publishedDate)
      newErrors.publishedDate = "Published date is required";

    if (!form.readTime.trim()) newErrors.readTime = "Read time is required";

    if (!form.content.trim()) newErrors.content = "Content is required";

    if (!banner) newErrors.banner = "Banner image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    fd.append("banner", banner);

    try {
      await API.post("/blogs", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("Blog created successfully!", "success");

      setTimeout(() => navigate("/blogs"), 2000);
    } catch (err) {
      alert("Error creating blog");
    }
  };

  return (
    <>
      <Header />

      {/* ---------- MATCHES DASHBOARD BACKGROUND ---------- */}
      <div
        className="min-h-screen p-10 relative flex justify-center items-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        {/* ---------- FORM CARD ---------- */}
        <div className="relative z-10 w-full max-w-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 rounded-3xl shadow-2xl border border-white/10">
          <h2
            className="text-4xl font-extrabold text-center mb-10
            bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            Create Blog
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 text-white">
            {/* CATEGORY */}
            <div>
              <label className="block mb-1 font-semibold text-cyan-300">
                📂 Category
              </label>
              <select
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="blogs">Blogs</option>
                <option value="whitepapers">Whitepapers</option>
                <option value="publications">Publications</option>
              </select>
            </div>

            {/* TITLE */}
            <div>
              <label className="block mb-1 font-semibold text-cyan-300">
                📝 Title
              </label>
              <input
                placeholder="Enter blog title"
                className="w-full p-3 bg-white/80 text-black border rounded-xl"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title}</p>
              )}
            </div>

            {/* SUMMARY */}
            <div>
              <label className="block mb-1 font-semibold text-cyan-300">
                🗒 Summary
              </label>
              <textarea
                rows={3}
                className="w-full p-3 bg-white/80 text-black border rounded-xl"
                placeholder="Short description..."
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
              {errors.summary && (
                <p className="text-red-400 text-sm">{errors.summary}</p>
              )}
            </div>

            {/* AUTHOR */}
            <div>
              <label className="block mb-1 font-semibold text-cyan-300">
                👤 Author
              </label>
              <input
                placeholder="Author name"
                className="w-full p-3 bg-white/80 text-black border rounded-xl"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
              {errors.author && (
                <p className="text-red-400 text-sm">{errors.author}</p>
              )}
            </div>

            {/* DESIGNATION */}
            <div>
              <label className="block mb-1 font-semibold text-cyan-300">
                💼 Author Designation
              </label>
              <input
                placeholder="Senior Developer"
                className="w-full p-3 bg-white/80 text-black border rounded-xl"
                value={form.designation}
                onChange={(e) =>
                  setForm({ ...form, designation: e.target.value })
                }
              />
              {errors.designation && (
                <p className="text-red-400 text-sm">{errors.designation}</p>
              )}
            </div>

            {/* DATE */}
            <div>
              <label className="block mb-1 font-semibold text-cyan-300">
                📅 Published Date
              </label>
              <input
                type="date"
                className="w-full p-3 bg-white/80 text-black border rounded-xl"
                value={form.publishedDate}
                onChange={(e) =>
                  setForm({ ...form, publishedDate: e.target.value })
                }
              />
              {errors.publishedDate && (
                <p className="text-red-400 text-sm">{errors.publishedDate}</p>
              )}
            </div>

            {/* READ TIME */}
            <div>
              <label className="block mb-1 font-semibold text-cyan-300">
                ⏱ Read Time
              </label>
              <input
                placeholder="5 min"
                className="w-full p-3 bg-white/80 text-black border rounded-xl"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
              />
              {errors.readTime && (
                <p className="text-red-400 text-sm">{errors.readTime}</p>
              )}
            </div>

            {/* CONTENT */}
            <div>
              <label className="block mb-1 font-semibold text-cyan-300">
                ✍ Content
              </label>
              <textarea
                rows={6}
                className="w-full p-3 bg-white/80 text-black border rounded-xl"
                placeholder="Write your blog content..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
              {errors.content && (
                <p className="text-red-400 text-sm">{errors.content}</p>
              )}
            </div>

            {/* BANNER UPLOAD */}
            <div>
              <label className="block mb-1 font-semibold text-cyan-300">
                🖼 Upload Banner Image
              </label>

              <input
                type="file"
                accept="image/*"
                className="block w-full p-2 bg-white/80 border rounded-xl text-black
                  file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded-lg 
                  hover:file:bg-purple-700 transition"
                onChange={(e) => setBanner(e.target.files[0])}
              />
              {errors.banner && (
                <p className="text-red-400 text-sm">{errors.banner}</p>
              )}
            </div>

            {/* SUBMIT */}
            <button className="w-full py-3 mt-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-semibold shadow-lg">
              Create Blog
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
