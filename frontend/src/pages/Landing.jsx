import { Link } from 'react-router-dom';

const Landing = () => {
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
      <main className="max-w-7xl mx-auto px-4 mt-56">
        <div className="text-center">
          {/* Introducing Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 mb-8">
            <span className="text-blue-600 text-sm">✨ Introducing MentorClass</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-8xl font-bold mb-6"> 
            <span className="block">Accelerate your</span>
            <span className="block text-blue-600">career and learning</span>
            <span className="block">with MentorClass</span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
            Join MentorClass and gain valuable skills through our mentors and community - Anytime, Anywhere.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Get started →
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Mentors Section */}
        <section className="mt-24 bg-blue-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Mentors in the Spotlight
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mentor Card 1 */}
            <div className="bg-pink-100 rounded-2xl p-6 relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200"
                alt="Sarah Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-center">Sarah Chen</h3>
              <p className="text-gray-600 text-center text-sm mb-2">Senior Software Engineer at Google</p>
              <p className="text-gray-700 text-sm">
                Try our free lesson plan: Design + Code your first Website. Get from idea to high-end creation, plus learn how to create animations, hosting, and more.
              </p>
            </div>

            {/* Mentor Card 2 */}
            <div className="bg-gray-100 rounded-2xl p-6 relative">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200"
                alt="Michael Rodriguez"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-center">Michael Rodriguez</h3>
              <p className="text-gray-600 text-center text-sm mb-2">Product Manager at Microsoft</p>
              <p className="text-gray-700 text-sm">
                Everything you need to know to create websites from scratch, for the end. You'll be comfortable making your own websites with custom layouts, animations, and responsive design.
              </p>
            </div>

            {/* Mentor Card 3 */}
            <div className="bg-blue-100 rounded-2xl p-6 relative">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200"
                alt="Emily Watson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-center">Emily Watson</h3>
              <p className="text-gray-600 text-center text-sm mb-2">Data Science Lead at Netflix</p>
              <p className="text-gray-700 text-sm">
                Learn responsive web design, from Science and Visual hierarchy to branding, color type, and more. This is our foundational course for learning Design + Branding.
              </p>
            </div>
          </div>
        </section>
        </main>

        

      {/* Footer */}
      <footer className="bg-purple-700 text-white py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">MentorClass</h3>
              <p className="text-sm text-gray-200">© 2024 MentorClass, Inc.</p>
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
                <li>Our Story</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 