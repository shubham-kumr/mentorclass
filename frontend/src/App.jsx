import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FindMentors from './pages/FindMentors';
import Sessions from './pages/Sessions';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import BecomeMentor from './pages/BecomeMentor';
import MentorSignup from './pages/MentorSignup';
import MentorProfile from './pages/MentorProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mentor-signup" element={<MentorSignup />} />
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="mentors" element={<FindMentors />} />
              <Route path="mentors/:mentorId" element={<MentorProfile />} />
              <Route path="sessions" element={<Sessions />} />
              <Route path="settings" element={<Settings />} />
              <Route path="become-mentor" element={<BecomeMentor />} />
            </Routes>
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App; 