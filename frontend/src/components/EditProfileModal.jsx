import { useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-hot-toast';

const EditProfileModal = ({ isOpen, onClose, currentProfile, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    bio: currentProfile?.bio || '',
    expertise: Array.isArray(currentProfile?.expertise) 
      ? currentProfile.expertise.join(', ')
      : currentProfile?.expertise || '',
    experience: currentProfile?.experience || '',
    projects: currentProfile?.projects || '',
    socials: {
      linkedin: currentProfile?.socials?.linkedin || '',
      github: currentProfile?.socials?.github || '',
      twitter: currentProfile?.socials?.twitter || ''
    }
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert expertise string to array
      const expertiseArray = formData.expertise.split(',').map(item => item.trim());

      const response = await axios.put('/user/mentor-profile', {
        ...formData,
        expertise: expertiseArray
      });

      toast.success('Profile updated successfully');
      onProfileUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expertise (comma-separated)
            </label>
            <input
              type="text"
              value={formData.expertise}
              onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="React, Node.js, JavaScript"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience
            </label>
            <textarea
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your professional experience..."
            />
          </div>

          {/* Projects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projects
            </label>
            <textarea
              value={formData.projects}
              onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="List your notable projects..."
            />
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Social Links</h3>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">LinkedIn</label>
              <input
                type="url"
                value={formData.socials.linkedin}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, linkedin: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">GitHub</label>
              <input
                type="url"
                value={formData.socials.github}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, github: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Twitter</label>
              <input
                type="url"
                value={formData.socials.twitter}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, twitter: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal; 