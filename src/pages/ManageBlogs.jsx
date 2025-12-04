import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    const res = await API.get("/blogs");
    setBlogs(res.data);
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Header />

      {/* ---------- SAME BACKGROUND AS DASHBOARD ---------- */}
      <div
        className="min-h-screen p-10 relative overflow-hidden flex justify-center"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl">
          <h1 className="text-4xl font-extrabold text-white mb-10 text-center drop-shadow-xl">
            Manage Blogs
          </h1>

          {/* CARD LIST */}
          <div className="space-y-10">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col md:flex-row items-center gap-6 
                  bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                  p-6 rounded-3xl shadow-2xl border border-white/10 
                  hover:scale-[1.01] transition-all duration-300"
              >
                {/* -------- LEFT CONTENT SECTION -------- */}
                <div className="flex-1 text-white space-y-3">
                  {/* Category */}
                  <p className="inline-block px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 text-sm font-semibold">
                    {blog.category}
                  </p>

                  {/* Title */}
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {blog.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-gray-300 leading-relaxed">
                    <span className="font-semibold text-cyan-300">
                      Summary:
                    </span>{" "}
                    {blog.summary}
                  </p>

                  {/* Author */}
                  <p className="text-gray-300">
                    <span className="font-semibold text-purple-300">
                      Author:
                    </span>{" "}
                    {blog.author} ({blog.designation})
                  </p>

                  {/* Published */}
                  <p className="text-gray-300">
                    <span className="font-semibold text-cyan-300">
                      Published:
                    </span>{" "}
                    {blog.publishedDate}
                  </p>

                  {/* Read Time */}
                  <p className="text-gray-300">
                    <span className="font-semibold text-cyan-300">
                      Read Time:
                    </span>{" "}
                    {blog.readTime}
                  </p>

                  {/* Content */}
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-gray-100 text-sm shadow-inner">
                    <strong className="text-purple-300">Content:</strong>
                    <p className="mt-1 whitespace-pre-line leading-relaxed">
                      {blog.content}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => navigate(`/edit-blog/${blog._id}`)}
                      className="px-4 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="px-4 py-2 bg-red-600 rounded-xl text-white hover:bg-red-700 transition shadow-lg hover:shadow-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* -------- RIGHT IMAGE SECTION -------- */}
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

      <Footer />
    </>
  );
}
