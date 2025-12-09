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
import ViewResumes from "./pages/ViewResumes";
import StartCoversation from "./pages/StartCoversation";
import Ready from "./pages/ReadyToGetStarted";
import AddEvent from "./pages/AddEvent";
import EventMange from "./pages/ManageEvents";
import EditEvent from "./pages/EditEvent";
import EventRegistrations from "./pages/event-registrations";

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
        <Route path="/view-resumes" element={<ViewResumes />}></Route>
        <Route
          path="/start-conversation"
          element={<StartCoversation />}
        ></Route>
        <Route path="/ready-to-get-started" element={<Ready></Ready>}></Route>
        <Route path="/create-event" element={<AddEvent></AddEvent>}></Route>
        <Route path="/events" element={<EventMange></EventMange>}></Route>
        <Route path="/events/:id" element={<EditEvent></EditEvent>}></Route>
        <Route
          path="/event-registrations"
          element={<EventRegistrations></EventRegistrations>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
