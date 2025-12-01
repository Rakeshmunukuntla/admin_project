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

  // const textOnlyRegex = /^[A-Za-z\s]*$/;
  const textOnlyRegex = /^[A-Za-z\s()\/-]*$/;

  // Load blog data
  useEffect(() => {
    API.get(`/blogs/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  // VALIDATION
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

  // SUBMIT
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

      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    } catch (err) {
      showToast("Error updating blog", "error");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-cyan-200 to-emerald-300 p-10">
        <div className="max-w-3xl w-full bg-white/30 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-neutral-900">
            Edit Blog
          </h2>

          {/* CURRENT IMAGE PREVIEW */}
          {form.banner && (
            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-2">
                🖼 Current Banner
              </p>
              <img
                src={form.banner}
                alt="Current Banner"
                className="w-full h-64 object-cover rounded-xl shadow"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NEW BANNER UPLOAD */}
            <div>
              <label className="block mb-1 font-semibold text-neutral-800">
                🖼 Upload New Banner
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full p-2 rounded-xl border bg-white/70 
                  file:bg-purple-600 file:text-white file:px-4 file:py-2 
                  file:mr-4 file:rounded-lg"
                onChange={(e) => setNewBanner(e.target.files[0])}
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block mb-1 font-semibold">📂 Category</label>
              <select
                className="w-full p-3 border rounded-xl bg-white/70"
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
              <label className="block mb-1 font-semibold">📝 Title</label>
              <input
                placeholder="Enter blog title"
                className="w-full p-3 border rounded-xl bg-white/70"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && (
                <p className="text-red-600 text-sm">{errors.title}</p>
              )}
            </div>

            {/* SUMMARY */}
            <div>
              <label className="block mb-1 font-semibold">🗒 Summary</label>
              <textarea
                rows={3}
                placeholder="Short summary"
                className="w-full p-3 border rounded-xl bg-white/70"
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
              {errors.summary && (
                <p className="text-red-600 text-sm">{errors.summary}</p>
              )}
            </div>

            {/* AUTHOR */}
            <div>
              <label className="block mb-1 font-semibold">👤 Author</label>
              <input
                placeholder="Author name"
                className="w-full p-3 border rounded-xl bg-white/70"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
              {errors.author && (
                <p className="text-red-600 text-sm">{errors.author}</p>
              )}
            </div>

            {/* DESIGNATION */}
            <div>
              <label className="block mb-1 font-semibold">
                💼 Author Designation
              </label>
              <input
                placeholder="Example: Senior Developer"
                className="w-full p-3 border rounded-xl bg-white/70"
                value={form.designation}
                onChange={(e) =>
                  setForm({ ...form, designation: e.target.value })
                }
              />
              {errors.designation && (
                <p className="text-red-600 text-sm">{errors.designation}</p>
              )}
            </div>

            {/* DATE */}
            <div>
              <label className="block mb-1 font-semibold">
                📅 Published Date
              </label>
              <input
                type="date"
                className="w-full p-3 border rounded-xl bg-white/70"
                value={form.publishedDate}
                onChange={(e) =>
                  setForm({ ...form, publishedDate: e.target.value })
                }
              />
              {errors.publishedDate && (
                <p className="text-red-600 text-sm">{errors.publishedDate}</p>
              )}
            </div>

            {/* READ TIME */}
            <div>
              <label className="block mb-1 font-semibold">⏱ Read Time</label>
              <input
                placeholder="Example: 5 min"
                className="w-full p-3 border rounded-xl bg-white/70"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
              />
              {errors.readTime && (
                <p className="text-red-600 text-sm">{errors.readTime}</p>
              )}
            </div>

            {/* CONTENT */}
            <div>
              <label className="block mb-1 font-semibold">✍ Content</label>
              <textarea
                rows={6}
                placeholder="Write your blog content..."
                className="w-full p-3 border rounded-xl bg-white/70"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
              {errors.content && (
                <p className="text-red-600 text-sm">{errors.content}</p>
              )}
            </div>

            {/* SUBMIT */}
            <button className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-semibold shadow-lg">
              Update Blog
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
