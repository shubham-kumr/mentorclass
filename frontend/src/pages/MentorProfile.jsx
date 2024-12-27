import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';

const MentorProfile = () => {
  const { mentorId } = useParams();
  const [loading, setLoading] = useState(true);
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    fetchMentorProfile();
  }, [mentorId]);

  const fetchMentorProfile = async () => {
    try {
      const response = await axios.get(`/user/mentors/${mentorId}`);
      setMentor(response.data);
    } catch (error) {
      console.error('Error fetching mentor:', error);
      toast.error('Failed to fetch mentor profile');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSession = async () => {
    try {
      await axios.post('/sessions/request', {
        mentorId,
        scheduledDate: new Date()
      });
      
      toast.custom((t) => (
        <div className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">Session Booked!</p>
          </div>
        </div>
      ), {
        duration: 3000,
        position: 'top-center',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to request session');
    }
  };

  if (loading) return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{mentor?.name}</h1>
              <p className="text-gray-600">{mentor?.email}</p>
            </div>
            <button
              onClick={handleRequestSession}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Request Session
            </button>
          </div>
        </div>

        {/* Expertise Section */}
        {mentor?.mentorProfile?.expertise && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(mentor.mentorProfile.expertise) 
                ? mentor.mentorProfile.expertise.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))
                : mentor.mentorProfile.expertise.split(',').map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))
              }
            </div>
          </div>
        )}

        {/* Bio Section */}
        {mentor?.mentorProfile?.bio && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{mentor.mentorProfile.bio}</p>
          </div>
        )}

        {/* Experience Section */}
        {mentor?.mentorProfile?.experience && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{mentor.mentorProfile.experience}</p>
          </div>
        )}

        {/* Social Links */}
        {mentor?.mentorProfile?.socials && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Connect</h2>
            <div className="space-y-2">
              {mentor.mentorProfile.socials.github && (
                <a 
                  href={mentor.mentorProfile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {mentor.mentorProfile.socials.linkedin && (
                <a 
                  href={mentor.mentorProfile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MentorProfile; 