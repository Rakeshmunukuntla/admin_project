// import { useState } from "react";
// import API from "../api/axios";
// import Footer from "./Footer";
// import Header from "./Header";
// import { useNavigate } from "react-router-dom";
// import { showToast } from "../toast";

// export default function CreateBlog() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     category: "blogs",
//     title: "",
//     summary: "",
//     author: "",
//     designation: "",
//     publishedDate: "",
//     content: "",
//     readTime: "",
//   });

//   const [banner, setBanner] = useState(null);

//   const [errors, setErrors] = useState({});

//   // 🔥 TEXT-ONLY VALIDATION
//   const textOnlyRegex = /^[A-Za-z\s]*$/;

//   const validateForm = () => {
//     let newErrors = {};

//     if (!form.title.trim()) newErrors.title = "Title is required";
//     else if (!textOnlyRegex.test(form.title))
//       newErrors.title = "Only alphabets allowed";

//     if (!form.summary.trim()) newErrors.summary = "Summary is required";

//     if (!form.author.trim()) newErrors.author = "Author is required";
//     else if (!textOnlyRegex.test(form.author))
//       newErrors.author = "Only alphabets allowed";

//     if (!form.designation.trim())
//       newErrors.designation = "Designation is required";

//     if (!form.publishedDate)
//       newErrors.publishedDate = "Published date is required";

//     if (!form.readTime.trim()) newErrors.readTime = "Read time is required";

//     if (!form.content.trim()) newErrors.content = "Content is required";

//     if (!banner) newErrors.banner = "Banner image is required";

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const fd = new FormData();

//     Object.keys(form).forEach((key) => {
//       fd.append(key, form[key]);
//     });

//     fd.append("banner", banner);

//     try {
//       await API.post("/blogs", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // alert("Blog Created!");
//       showToast("Blog created successfully!", "success");
//       // navigate("/blogs");
//       setTimeout(() => {
//         navigate("/blogs");
//       }, 2000);
//     } catch (err) {
//       alert("Error creating blog");
//     }
//   };

//   return (
//     <>
//       <Header />

//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-cyan-200 to-emerald-300 py-16 px-4">
//         <div className="w-full max-w-3xl bg-white/30 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-xl">
//           <h2 className="text-3xl font-bold text-neutral-900 text-center mb-10">
//             Create Blog
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* CATEGORY */}
//             <div>
//               <label className="block mb-1 font-semibold text-neutral-800">
//                 Category
//               </label>
//               <select
//                 className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
//                 value={form.category}
//                 onChange={(e) => setForm({ ...form, category: e.target.value })}
//               >
//                 <option value="blogs">Blogs</option>
//                 <option value="whitepapers">Whitepapers</option>
//                 <option value="publications">Publications</option>
//               </select>
//             </div>

//             {/* TITLE */}
//             <div>
//               <input
//                 placeholder="Title"
//                 className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//               />
//               {errors.title && (
//                 <p className="text-red-600 text-sm mt-1">{errors.title}</p>
//               )}
//             </div>

//             {/* SUMMARY */}
//             <div>
//               <textarea
//                 placeholder="Summary"
//                 rows={3}
//                 className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
//                 value={form.summary}
//                 onChange={(e) => setForm({ ...form, summary: e.target.value })}
//               />
//               {errors.summary && (
//                 <p className="text-red-600 text-sm mt-1">{errors.summary}</p>
//               )}
//             </div>

//             {/* AUTHOR */}
//             <div>
//               <input
//                 placeholder="Author"
//                 className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
//                 value={form.author}
//                 onChange={(e) => setForm({ ...form, author: e.target.value })}
//               />
//               {errors.author && (
//                 <p className="text-red-600 text-sm mt-1">{errors.author}</p>
//               )}
//             </div>

//             {/* DESIGNATION */}
//             <div>
//               <input
//                 placeholder="Designation"
//                 className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
//                 value={form.designation}
//                 onChange={(e) =>
//                   setForm({ ...form, designation: e.target.value })
//                 }
//               />
//               {errors.designation && (
//                 <p className="text-red-600 text-sm mt-1">
//                   {errors.designation}
//                 </p>
//               )}
//             </div>

//             {/* DATE */}
//             <div>
//               <input
//                 type="date"
//                 className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
//                 value={form.publishedDate}
//                 onChange={(e) =>
//                   setForm({ ...form, publishedDate: e.target.value })
//                 }
//               />
//               {errors.publishedDate && (
//                 <p className="text-red-600 text-sm mt-1">
//                   {errors.publishedDate}
//                 </p>
//               )}
//             </div>

//             {/* READ TIME */}
//             <div>
//               <input
//                 placeholder="Read Time (e.g., 5 min)"
//                 className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
//                 value={form.readTime}
//                 onChange={(e) => setForm({ ...form, readTime: e.target.value })}
//               />
//               {errors.readTime && (
//                 <p className="text-red-600 text-sm mt-1">{errors.readTime}</p>
//               )}
//             </div>

//             {/* CONTENT */}
//             <div>
//               <textarea
//                 placeholder="Content"
//                 rows={6}
//                 className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
//                 value={form.content}
//                 onChange={(e) => setForm({ ...form, content: e.target.value })}
//               />
//               {errors.content && (
//                 <p className="text-red-600 text-sm mt-1">{errors.content}</p>
//               )}
//             </div>

//             {/* IMAGE UPLOAD */}
//             <div>
//               <label className="block mb-1 font-semibold text-neutral-800">
//                 Upload Banner Image
//               </label>

//               <input
//                 type="file"
//                 accept="image/*"
//                 className="block w-full text-sm text-neutral-800
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-lg file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-purple-600 file:text-white
//                     hover:file:bg-purple-700 bg-white/70 p-2 rounded-xl border border-neutral-300"
//                 onChange={(e) => setBanner(e.target.files[0])}
//               />
//               {errors.banner && (
//                 <p className="text-red-600 text-sm mt-1">{errors.banner}</p>
//               )}
//             </div>

//             {/* SUBMIT */}
//             <button className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-semibold transition shadow-lg">
//               Create Blog
//             </button>
//           </form>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

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

  // const textOnlyRegex = /^[A-Za-z\s]*$/;
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

    Object.keys(form).forEach((key) => {
      fd.append(key, form[key]);
    });

    fd.append("banner", banner);

    try {
      await API.post("/blogs", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("Blog created successfully!", "success");

      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    } catch (err) {
      alert("Error creating blog");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-cyan-200 to-emerald-300 py-16 px-4">
        <div className="w-full max-w-3xl bg-white/30 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-10">
            Create Blog
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* CATEGORY */}
            <div>
              <label className="block mb-1 font-semibold text-neutral-800">
                📂 Category
              </label>
              <select
                className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
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
              <label className="block mb-1 font-semibold text-neutral-800">
                📝 Title
              </label>
              <input
                placeholder="Enter blog title"
                className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* SUMMARY */}
            <div>
              <label className="block mb-1 font-semibold text-neutral-800">
                🗒 Summary
              </label>
              <textarea
                placeholder="Short description..."
                rows={3}
                className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
              {errors.summary && (
                <p className="text-red-600 text-sm mt-1">{errors.summary}</p>
              )}
            </div>

            {/* AUTHOR */}
            <div>
              <label className="block mb-1 font-semibold text-neutral-800">
                👤 Author
              </label>
              <input
                placeholder="Author name"
                className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
              {errors.author && (
                <p className="text-red-600 text-sm mt-1">{errors.author}</p>
              )}
            </div>

            {/* DESIGNATION */}
            <div>
              <label className="block mb-1 font-semibold text-neutral-800">
                💼 Author Designation
              </label>
              <input
                placeholder="Example: Senior Developer"
                className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
                value={form.designation}
                onChange={(e) =>
                  setForm({ ...form, designation: e.target.value })
                }
              />
              {errors.designation && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.designation}
                </p>
              )}
            </div>

            {/* DATE */}
            <div>
              <label className="block mb-1 font-semibold text-neutral-800">
                📅 Published Date
              </label>
              <input
                type="date"
                className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
                value={form.publishedDate}
                onChange={(e) =>
                  setForm({ ...form, publishedDate: e.target.value })
                }
              />
              {errors.publishedDate && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.publishedDate}
                </p>
              )}
            </div>

            {/* READ TIME */}
            <div>
              <label className="block mb-1 font-semibold text-neutral-800">
                ⏱ Read Time
              </label>
              <input
                placeholder="Example: 5 min"
                className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
              />
              {errors.readTime && (
                <p className="text-red-600 text-sm mt-1">{errors.readTime}</p>
              )}
            </div>

            {/* CONTENT */}
            <div>
              <label className="block mb-1 font-semibold text-neutral-800">
                ✍ Content
              </label>
              <textarea
                placeholder="Write your blog content..."
                rows={6}
                className="w-full p-3 border border-neutral-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-400"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
              {errors.content && (
                <p className="text-red-600 text-sm mt-1">{errors.content}</p>
              )}
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block mb-1 font-semibold text-neutral-800">
                🖼 Upload Banner Image
              </label>

              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-neutral-800
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-600 file:text-white
                    hover:file:bg-purple-700 bg-white/70 p-2 rounded-xl border border-neutral-300"
                onChange={(e) => setBanner(e.target.files[0])}
              />
              {errors.banner && (
                <p className="text-red-600 text-sm mt-1">{errors.banner}</p>
              )}
            </div>

            {/* SUBMIT */}
            <button className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-semibold transition shadow-lg">
              Create Blog
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
