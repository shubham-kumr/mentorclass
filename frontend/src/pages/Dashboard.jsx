import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import EditProfileModal from '../components/EditProfileModal';

const MentorDashboard = () => {
  const [stats, setStats] = useState({
    totalSessions: 0,
    pendingRequests: 0,
    completedSessions: 0
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/sessions/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Failed to fetch dashboard stats');
      }
    };

    fetchStats();

    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchMentorData();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/user/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const fetchMentorData = async () => {
    try {
      console.log('Starting mentor data fetch...');
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const [statsRes, requestsRes] = await Promise.all([
        axios.get('/sessions/stats'),
        axios.get('/sessions/requests')
      ]);

      console.log('Stats response:', statsRes.data);
      console.log('Requests response:', requestsRes.data);

      setStats(statsRes.data);
      setRecentRequests(requestsRes.data);
    } catch (error) {
      console.error('Mentor dashboard error:', error.response || error);
      toast.error(error.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSessionAction = async (sessionId, status) => {
    try {
      console.log('Attempting session update:', { sessionId, status });

      const response = await axios.patch(`/sessions/${sessionId}`, {
        status
      });

      console.log('Session update response:', response.data);

      if (response.data) {
        toast.success(`Session ${status} successfully`);
        
        // Refresh data
        try {
          const [statsRes, requestsRes] = await Promise.all([
            axios.get('/sessions/stats'),
            axios.get('/sessions/requests')
          ]);

          console.log('Refresh data:', {
            stats: statsRes.data,
            requests: requestsRes.data
          });

          setStats(statsRes.data);
          setRecentRequests(requestsRes.data);
        } catch (refreshError) {
          console.error('Error refreshing data:', refreshError);
          toast.error('Updated session but failed to refresh data');
        }
      }
    } catch (error) {
      console.error('Session update error:', {
        message: error.message,
        response: error.response?.data
      });
      
      const errorMessage = error.response?.data?.message || 'Failed to update session';
      toast.error(errorMessage);
    }
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    // Update local storage user data
    const user = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({
      ...user,
      mentorProfile: updatedProfile.mentorProfile
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mentor Dashboard</h1>
        <button
          onClick={() => setShowEditProfile(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>

      {/* Mentor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Total Sessions</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalSessions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Pending Requests</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingRequests}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Completed Sessions</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completedSessions}</p>
        </div>
      </div>

      {/* Recent Session Requests */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Session Requests</h2>
          <Link 
            to="/dashboard/sessions"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="space-y-4">
          {recentRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No pending requests</p>
          ) : (
            recentRequests.slice(0, 3).map((request) => (
              <div key={request._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{request.mentee?.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(request.scheduledDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: <span className="capitalize">{request.status}</span>
                    </p>
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSessionAction(request._id, 'accepted')}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleSessionAction(request._id, 'rejected')}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/sessions"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Manage Sessions</h3>
          <p className="text-gray-600">View and manage all your mentoring sessions</p>
        </Link>
        <Link
          to="/dashboard/settings"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Update Profile</h3>
          <p className="text-gray-600">Update your mentor profile and availability</p>
        </Link>
      </div>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        currentProfile={profile?.mentorProfile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

const MenteeDashboard = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await axios.get('/user/mentors');
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      toast.error('Failed to fetch mentors');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSession = async (mentorId, mentorName) => {
    try {
      await axios.post('/sessions/request', {
        mentorId,
        scheduledDate: new Date()
      });
      
      // Show success popup
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Available Mentors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              {/* Mentor Name and Basic Info */}
              <div>
                <h3 className="text-lg font-semibold">{mentor.name}</h3>
                <p className="text-sm text-gray-500">{mentor.email}</p>
              </div>

              {/* Mentor Profile Info */}
              {mentor.mentorProfile && (
                <>
                  {mentor.mentorProfile.expertise && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Expertise</h4>
                      <p className="text-sm text-gray-600">
                        {Array.isArray(mentor.mentorProfile.expertise) 
                          ? mentor.mentorProfile.expertise.join(', ')
                          : mentor.mentorProfile.expertise || 'Not specified'}
                      </p>
                    </div>
                  )}

                  {mentor.mentorProfile.bio && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Bio</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {mentor.mentorProfile.bio}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4">
                <Link
                  to={`/dashboard/mentors/${mentor._id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => handleRequestSession(mentor._id, mentor.name)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  Request Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mentors.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">No mentors available at the moment</p>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    console.log('Stored user data:', userData);
    console.log('Stored token:', token);

    if (!userData || !token) {
      console.log('No user data or token found');
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  return (
    <DashboardLayout>
      {user.role === 'mentor' ? <MentorDashboard /> : <MenteeDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard; 