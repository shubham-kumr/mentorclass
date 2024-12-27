import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';

const BecomeMentor = () => {
  const navigate = useNavigate();
  const [mentorProfile, setMentorProfile] = useState({
    bio: '',
    experience: '',
    expertise: '',
    projects: '',
    socials: {
      linkedin: '',
      github: '',
      twitter: ''
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/user/become-mentor', { mentorProfile });
      const updatedUser = { ...JSON.parse(localStorage.getItem('user')), role: 'mentor', mentorProfile };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Successfully became a mentor!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to become a mentor');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Become a Mentor</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                value={mentorProfile.bio}
                onChange={(e) => setMentorProfile({ ...mentorProfile, bio: e.target.value })}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <textarea
                value={mentorProfile.experience}
                onChange={(e) => setMentorProfile({ ...mentorProfile, experience: e.target.value })}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share your professional experience..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expertise
              </label>
              <input
                type="text"
                value={mentorProfile.expertise}
                onChange={(e) => setMentorProfile({ ...mentorProfile, expertise: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., JavaScript, React, Node.js (comma separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Projects
              </label>
              <textarea
                value={mentorProfile.projects}
                onChange={(e) => setMentorProfile({ ...mentorProfile, projects: e.target.value })}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="List your notable projects..."
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Social Links</h3>
              <div>
                <label className="block text-sm text-gray-600">LinkedIn</label>
                <input
                  type="url"
                  value={mentorProfile.socials.linkedin}
                  onChange={(e) => setMentorProfile({
                    ...mentorProfile,
                    socials: { ...mentorProfile.socials, linkedin: e.target.value }
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">GitHub</label>
                <input
                  type="url"
                  value={mentorProfile.socials.github}
                  onChange={(e) => setMentorProfile({
                    ...mentorProfile,
                    socials: { ...mentorProfile.socials, github: e.target.value }
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Twitter</label>
                <input
                  type="url"
                  value={mentorProfile.socials.twitter}
                  onChange={(e) => setMentorProfile({
                    ...mentorProfile,
                    socials: { ...mentorProfile.socials, twitter: e.target.value }
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BecomeMentor; 