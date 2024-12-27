import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';

const FindMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await axios.get('/api/user/mentors');
      setMentors(response.data);
    } catch (error) {
      toast.error('Failed to fetch mentors');
    } finally {
      setLoading(false);
    }
  };

  const requestSession = async (mentorId) => {
    try {
      const scheduledDate = new Date(); // You might want to add a date picker here
      await axios.post('/api/sessions/request', {
        mentorId,
        scheduledDate
      });
      toast.success('Session requested successfully');
    } catch (error) {
      toast.error('Failed to request session');
    }
  };

  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.mentorProfile.occupation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Find Mentors</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search mentors by name or occupation..."
            className="w-full px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                <div>
                  <h3 className="font-semibold text-lg">{mentor.name}</h3>
                  <p className="text-gray-600">{mentor.mentorProfile.occupation}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Expertise:</p>
                <div className="flex flex-wrap gap-2">
                  {mentor.mentorProfile.expertise.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{mentor.mentorProfile.bio}</p>

              <div className="flex gap-2">
                {mentor.mentorProfile.socials.linkedin && (
                  <a 
                    href={mentor.mentorProfile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    LinkedIn
                  </a>
                )}
                {mentor.mentorProfile.socials.github && (
                  <a 
                    href={mentor.mentorProfile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    GitHub
                  </a>
                )}
              </div>

              <button
                onClick={() => requestSession(mentor._id)}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Request Session
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FindMentors; 