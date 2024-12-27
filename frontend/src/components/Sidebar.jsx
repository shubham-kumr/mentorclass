import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const MentorLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Sessions', path: '/dashboard/sessions', icon: '📅' },
  { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' }
];

const MenteeLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  // { name: 'Find Mentors', path: '/dashboard/mentors', icon: '🔍' },
  { name: 'Sessions', path: '/dashboard/sessions', icon: '📅' },
  { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const links = user?.role === 'mentor' ? MentorLinks : MenteeLinks;

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">MentorClass</h1>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-3 text-gray-700 rounded-lg ${
                  location.pathname === link.path ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Become a Mentor Button */}
          {user?.role === 'mentee' && (
            <Link
              to="/dashboard/become-mentor"
              className="flex items-center px-4 py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <span className="mr-3">👨‍🏫</span>
              Become a Mentor
            </Link>
          )}
        </nav>

        {/* User Profile and Logout Section */}
        <div className="p-4 border-t mt-auto">
          {/* User Profile */}
          <div className="mb-4 px-4 py-3 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-xs text-gray-500 capitalize mt-1">Role: {user?.role}</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700"
          >
            <span className="mr-3">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 