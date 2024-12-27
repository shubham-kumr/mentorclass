import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-hot-toast';

const MentorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mentorProfile: {
      bio: '',
      expertise: '',
      experience: '',
      socials: {
        github: '',
        linkedin: ''
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Split expertise string into array
      const expertiseArray = formData.mentorProfile.expertise
        .split(',')
        .map(item => item.trim());

      const response = await axios.post('/auth/signup', {
        ...formData,
        role: 'mentor',
        mentorProfile: {
          ...formData.mentorProfile,
          expertise: expertiseArray
        }
      });

      toast.success('Mentor account created successfully!');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.response?.data?.message || 'Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create Mentor Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.mentorProfile.bio}
                onChange={(e) => setFormData({
                  ...formData,
                  mentorProfile: { ...formData.mentorProfile, bio: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expertise (comma-separated)
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="React, Node.js, JavaScript"
                value={formData.mentorProfile.expertise}
                onChange={(e) => setFormData({
                  ...formData,
                  mentorProfile: { ...formData.mentorProfile, expertise: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <textarea
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.mentorProfile.experience}
                onChange={(e) => setFormData({
                  ...formData,
                  mentorProfile: { ...formData.mentorProfile, experience: e.target.value }
                })}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorSignup; 