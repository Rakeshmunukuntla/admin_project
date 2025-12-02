import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import ManageBlogs from "./pages/ManageBlogs";
import CreateJob from "./pages/CreateJob";
import ManageJobs from "./pages/ManageJobs";
import EditBlog from "./pages/EditBlog";
import EditJob from "./pages/EditJob";
import ManageJobApplications from "./pages/ManageJobApplicationsForAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-blog" element={<CreateBlog />} />

        <Route path="/blogs" element={<ManageBlogs />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/jobs" element={<ManageJobs />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/job-applications" element={<ManageJobApplications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
