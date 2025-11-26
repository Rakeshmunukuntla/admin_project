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

      {/* Background and Center Layout */}
      <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-blue-100 via-cyan-200 to-green-200 flex justify-center">
        <div className="w-full max-w-6xl">
          {/* Page Title */}
          <h1 className="text-4xl font-extrabold text-neutral-900 mb-10 text-center drop-shadow-md">
            Manage Blogs
          </h1>

          {/* Glass Card Wrapper */}
          <div className="bg-white/40 backdrop-blur-lg border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-neutral-800">
                <thead>
                  <tr className="bg-white/70 border-b border-white text-neutral-700">
                    <th className="p-4">Category</th>
                    <th className="p-4">Title</th>
                    <th className="p-4 w-64">Summary</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Designation</th>
                    <th className="p-4">Published</th>
                    <th className="p-4">Read Time</th>
                    <th className="p-4">Banner</th>
                    <th className="p-4 w-72">Content</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {blogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="border-b border-white/50 hover:bg-white/50 transition"
                    >
                      <td className="p-4">{blog.category}</td>
                      <td className="p-4 font-semibold">{blog.title}</td>

                      {/* Summary Box */}
                      <td className="p-4">
                        <div className="max-h-24 overflow-y-auto bg-white/60 p-2 rounded-lg text-neutral-700 shadow-inner">
                          {blog.summary}
                        </div>
                      </td>

                      <td className="p-4">{blog.author}</td>
                      <td className="p-4">{blog.designation}</td>
                      <td className="p-4">{blog.publishedDate}</td>
                      <td className="p-4">{blog.readTime}</td>

                      {/* Banner Image */}
                      <td className="p-4">
                        <img
                          src={blog.banner}
                          alt="banner"
                          className="w-24 h-16 rounded-lg object-cover shadow"
                        />
                      </td>

                      {/* Content box */}
                      <td className="p-4">
                        <div className="max-h-28 overflow-y-auto bg-white/60 p-2 rounded-lg text-neutral-700 shadow-inner">
                          {blog.content}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="p-4 space-y-2 flex flex-col">
                        <button
                          onClick={() => navigate(`/edit-blog/${blog._id}`)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteBlog(blog._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-lg shadow hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
