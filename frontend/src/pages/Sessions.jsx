import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from '../utils/axios';
import DashboardLayout from '../components/DashboardLayout';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoomLink, setZoomLink] = useState('');
  const [editingSession, setEditingSession] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const isMentor = user?.role === 'mentor';

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const endpoint = isMentor ? '/sessions/mentor-sessions' : '/sessions/mentee-sessions';
      const response = await axios.get(endpoint);
      console.log('Sessions:', response.data);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast.error('Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleSessionAction = async (sessionId, status) => {
    try {
      await axios.patch(`/sessions/${sessionId}`, { status });
      toast.success(`Session ${status} successfully`);
      fetchSessions();
    } catch (error) {
      console.error('Session update error:', error);
      toast.error('Failed to update session');
    }
  };

  const handleAddZoomLink = async (sessionId) => {
    try {
      await axios.patch(`/sessions/${sessionId}`, { 
        zoomLink,
        status: 'accepted' 
      });
      toast.success('Zoom link added successfully');
      setZoomLink('');
      setEditingSession(null);
      fetchSessions();
    } catch (error) {
      console.error('Error adding zoom link:', error);
      toast.error('Failed to add Zoom link');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">My Sessions</h1>

        <div className="bg-white rounded-lg shadow">
          {sessions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No sessions found
            </div>
          ) : (
            <div className="divide-y">
              {sessions.map((session) => (
                <div key={session._id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">
                        {isMentor ? session.mentee?.name : session.mentor?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(session.scheduledDate).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Status: <span className="capitalize">{session.status}</span>
                      </p>
                      {session.zoomLink && (
                        <p className="text-sm text-gray-600 mt-1">
                          Meeting Link:{' '}
                          <a 
                            href={session.zoomLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Join Zoom
                          </a>
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {isMentor && session.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleSessionAction(session._id, 'accepted')}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleSessionAction(session._id, 'rejected')}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {isMentor && session.status === 'accepted' && !session.zoomLink && (
                        <div className="flex items-center gap-2">
                          {editingSession === session._id ? (
                            <>
                              <input
                                type="text"
                                value={zoomLink}
                                onChange={(e) => setZoomLink(e.target.value)}
                                placeholder="Enter Zoom link"
                                className="px-3 py-1 border rounded text-sm"
                              />
                              <button
                                onClick={() => handleAddZoomLink(session._id)}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingSession(null);
                                  setZoomLink('');
                                }}
                                className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded hover:bg-gray-300"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setEditingSession(session._id)}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                              Add Zoom Link
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sessions; 