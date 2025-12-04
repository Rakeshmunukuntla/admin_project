import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Footer from "./Footer";
import Header from "./Header";
import { showToast } from "../toast";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    title: "",
    summary: "",
    author: "",
    designation: "",
    publishedDate: "",
    content: "",
    readTime: "",
    banner: "",
  });

  const [newBanner, setNewBanner] = useState(null);
  const [errors, setErrors] = useState({});

  const textOnlyRegex = /^[A-Za-z\s()\/-]*$/;

  useEffect(() => {
    API.get(`/blogs/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    if (newBanner) fd.append("banner", newBanner);

    try {
      await API.put(`/blogs/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("Blog updated successfully!", "success");

      setTimeout(() => navigate("/blogs"), 2000);
    } catch (err) {
      showToast("Error updating blog", "error");
    }
  };

  return (
    <>
      <Header />

      {/* ---------- Dashboard Background ---------- */}
      <div
        className="min-h-screen p-10 relative overflow-hidden flex justify-center items-center"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        {/* ---------- Form Card ---------- */}
        <div className="relative z-10 max-w-3xl w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 rounded-3xl shadow-2xl border border-white/10">
          <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Edit Blog
          </h2>

          {/* Banner preview */}
          {form.banner && (
            <div className="mb-6">
              <p className="text-cyan-300 font-semibold mb-2">Current Banner</p>
              <img
                src={form.banner}
                className="w-full h-64 object-cover rounded-xl shadow-2xl border border-white/20"
                alt="Current Banner"
              />
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NEW BANNER UPLOAD */}
            <div>
              <label className="block mb-2 font-semibold text-cyan-300">
                🖼 Upload New Banner
              </label>

              <input
                type="file"
                accept="image/*"
                className="block w-full p-2 rounded-xl bg-white/80 text-black border border-white/30
      file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded-lg
      hover:file:bg-purple-700 transition"
                onChange={(e) => setNewBanner(e.target.files[0])}
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block mb-1 font-semibold text-cyan-300">
                Category
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
                Title
              </label>
              <input
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
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
                Summary
              </label>
              <textarea
                rows={3}
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
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
                Author
              </label>
              <input
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
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
                Designation
              </label>
              <input
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
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
                Published Date
              </label>
              <input
                type="date"
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
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
                Read Time
              </label>
              <input
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
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
                Content
              </label>
              <textarea
                rows={6}
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
              {errors.content && (
                <p className="text-red-400 text-sm">{errors.content}</p>
              )}
            </div>

            {/* SUBMIT */}
            <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-semibold shadow-xl">
              Update Blog
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
