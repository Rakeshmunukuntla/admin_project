import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Delete Confirmation Popup
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Success Popup
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Error Popup
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Open popup
  const openDeletePopup = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  // Delete blog
  const deleteBlog = async () => {
    try {
      await API.delete(`/blogs/${deleteId}`);
      fetchBlogs();

      setSuccessMessage("Blog deleted successfully!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    } catch (err) {
      console.error("Delete failed:", err);

      setErrorMessage("Failed to delete blog");
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }

    setConfirmDelete(false);
    setDeleteId(null);
  };

  return (
    <>
      <Header />

      {/* Background */}
      <div
        className="min-h-screen p-10 relative overflow-hidden flex justify-center"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        <div className="relative z-10 w-full max-w-6xl">
          <h1 className="text-4xl font-extrabold text-white mb-10 text-center drop-shadow-xl">
            Manage Blogs
          </h1>

          <div className="space-y-10">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col md:flex-row items-center gap-6 p-6 
                bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                rounded-3xl shadow-2xl border border-white/10 
                hover:scale-[1.01] transition-all duration-300"
              >
                {/* TEXT SECTION */}
                <div className="flex-1 text-white space-y-3">
                  <p className="inline-block px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 text-sm font-semibold">
                    {blog.category}
                  </p>

                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {blog.title}
                  </h2>

                  <p className="text-gray-300 leading-relaxed">
                    <span className="font-semibold text-cyan-300">
                      Summary:{" "}
                    </span>
                    {blog.summary}
                  </p>

                  <p className="text-gray-300">
                    <span className="font-semibold text-purple-300">
                      Author:
                    </span>{" "}
                    {blog.author} ({blog.designation})
                  </p>

                  <p className="text-gray-300">
                    <span className="font-semibold text-cyan-300">
                      Published:
                    </span>{" "}
                    {blog.publishedDate}
                  </p>

                  <p className="text-gray-300">
                    <span className="font-semibold text-cyan-300">
                      Read Time:
                    </span>{" "}
                    {blog.readTime}
                  </p>

                  <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-gray-100 text-sm shadow-inner">
                    <strong className="text-purple-300">Content:</strong>
                    <p className="mt-1 whitespace-pre-line leading-relaxed">
                      {blog.content}
                    </p>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => navigate(`/edit-blog/${blog._id}`)}
                      className="px-4 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeletePopup(blog._id)}
                      className="px-4 py-2 bg-red-600 rounded-xl text-white hover:bg-red-700 transition shadow-lg hover:shadow-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* BANNER IMAGE */}
                <div className="w-full md:w-72 flex-shrink-0">
                  <img
                    src={blog.banner}
                    alt="Blog Banner"
                    className="w-full h-56 rounded-2xl object-cover shadow-2xl border border-white/20"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🟡 DELETE CONFIRMATION POPUP */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[900]">
          <div className="bg-white text-slate-900 px-8 py-6 w-[360px] rounded-2xl shadow-2xl animate-pop text-center">
            <h2 className="text-xl font-bold mb-2">Delete Blog?</h2>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete this blog post?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2 bg-gray-300 text-gray-900 rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={deleteBlog}
                className="flex-1 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[999]">
          <div className="bg-white text-slate-900 px-8 py-6 rounded-2xl shadow-2xl animate-pop">
            <h2 className="text-2xl font-bold mb-2">🎉 Success!</h2>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* 🔴 ERROR POPUP */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[999]">
          <div className="bg-red-600 text-white px-8 py-6 rounded-2xl shadow-2xl animate-pop">
            <h2 className="text-xl font-bold mb-2">⚠ Error!</h2>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* POPUP ANIMATION */}
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop {
          animation: pop 0.25s ease-out;
        }
      `}</style>

      <Footer />
    </>
  );
}
