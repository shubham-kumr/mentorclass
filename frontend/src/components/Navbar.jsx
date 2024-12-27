import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="px-4 py-3 flex justify-between items-center max-w-7xl mx-auto">
      <Link to="/" className="text-xl font-bold">MentorClass</Link>
      <div className="flex gap-4">
        <Link 
          to="/about" 
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          About
        </Link>
        <Link 
          to="/login" 
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 