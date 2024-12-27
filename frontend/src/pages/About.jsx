import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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

      {/* Hero Section */}
      <div className="min-h-screen pt-48 bg-blue-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-8xl font-bold mb-8">
            Bringing people to connect with mentors and learn new skills
          </h1>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-blue-500 mb-12">
          Why Choose MentorClass?
        </h2>
        <div className="space-y-4">
          <div className="bg-purple-100 p-4 rounded-full inline-block">
            Join 1:1 group sessions
          </div>
          <div className="bg-purple-100 p-4 rounded-full inline-block ml-32">
            Get in-depth guidance from experienced mentors
          </div>
          <div className="bg-purple-100 p-4 rounded-full inline-block">
            Accelerate your learning with personalized learning paths
          </div>
          <div className="bg-purple-100 p-4 rounded-full inline-block ml-48">
            Collaborate with peers and mentors seamlessly, anytime, anywhere
          </div>
          <div className="bg-purple-100 p-4 rounded-full inline-block ml-16">
            Engage with interactive mentor sessions and real-time feedback
          </div>
        </div>
      </div>

      {/* Meet the Creator Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Meet the Creator</h2>
        <p className="text-center text-gray-600 mb-12">
          The brains behind MentorClass - say Hi or get support
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-500 rounded-lg p-6 text-white">
            <img 
              src="/creator1.jpg" 
              alt="Team member" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold">SHUBHAM KUMAR</h3>
            <p className="text-sm">BACKEND DEVELOPER</p>
          </div>
          <div className="bg-purple-500 rounded-lg p-6 text-white">
            <img 
              src="/creator2.jpg" 
              alt="Team member" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold">KIRTI WARDHAN SINGH</h3>
            <p className="text-sm">FRONTEND DEVELOPER</p>
          </div>
          <div className="bg-red-500 rounded-lg p-6 text-white">
            <img 
              src="/creator3.jpg" 
              alt="Team member" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold">YOGESH PRATAP SINGH</h3>
            <p className="text-sm">UI/UX DESIGNER</p>
          </div>
          <div className="bg-green-500 rounded-lg p-6 text-white">
            <img 
              src="/creator4.jpg" 
              alt="Team member" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold">VISHNU HARI GUPTA</h3>
            <p className="text-sm">REPRESENTATIVE</p>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-yellow-400 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold">How is MentorClass different from other mentorship platforms?</h3>
              <p className="text-gray-600">We offer personalized mentorship with experienced professionals tailored to your needs.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold">How can I book a session with a mentor?</h3>
              <p className="text-gray-600">Simply browse our mentor list and click on the Book Session button to choose your time.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold">Can I become a mentor on MentorClass?</h3>
              <p className="text-gray-600">Yes, you can apply to be a mentor by filling out our application form.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-blue-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Keep up to date with MentorClass by joining our newsletter!</h2>
          <div className="flex justify-center gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 rounded-lg text-black"
            />
            <button className="bg-black text-white px-6 py-2 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">MentorClass</h3>
            <p className="text-sm">© 2024 MentorClass Inc.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li>Mentorship Programs</li>
              <li>Specialties</li>
              <li>Resources</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About; 