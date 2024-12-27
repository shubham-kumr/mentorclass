import { useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';

const Settings = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

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
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      return toast.error('New passwords do not match');
    }

    try {
      const response = await axios.put('/api/user/settings', formData);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Settings updated successfully');
      
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update settings');
    }
  };

  const handleBecomeMentor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/user/become-mentor', { mentorProfile });
      const updatedUser = { ...user, role: 'mentor', mentorProfile };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Successfully became a mentor!');
      window.location.reload(); // Reload to update navigation
    } catch (error) {
      toast.error('Failed to become a mentor');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

        {/* Basic Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-medium mb-4">Change Password</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Become a Mentor Section
        {user.role === 'mentee' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Become a Mentor</h2>
            <form onSubmit={handleBecomeMentor} className="space-y-6">
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
                  Become a Mentor
                </button>
              </div>
            </form>
          </div>
        )} */}
      </div>
    </DashboardLayout>
  );
};

export default Settings; 