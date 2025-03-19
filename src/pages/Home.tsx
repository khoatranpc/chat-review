import { Link } from "react-router-dom";
import { FiMessageSquare, FiUpload, FiCpu, FiStar } from "react-icons/fi";

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-display text-secondary mb-6 animate-float">
          Learn & Play with AI
        </h1>
        <p className="text-xl text-secondary-light mb-8 max-w-2xl mx-auto">
          Discover the magic of learning with our friendly AI assistant! Ask
          questions, share your homework, and learn in a fun way! 🌟
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/chat"
            className="btn btn-primary text-lg inline-flex items-center"
          >
            Start Your Adventure
            <FiStar className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
        <div className="card group pt-12 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-accent-yellow rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform">
              <FiMessageSquare className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-display mb-4 text-secondary">
              Ask & Learn
            </h3>
            <p className="text-secondary-light">
              Ask any question and get friendly, easy-to-understand answers from
              your AI buddy!
            </p>
          </div>
        </div>

        <div className="card group pt-12 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-accent-blue rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform">
              <FiUpload className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-display mb-4 text-secondary">
              Share & Explore
            </h3>
            <p className="text-secondary-light">
              Share your homework or interesting documents and let's explore
              them together!
            </p>
          </div>
        </div>

        <div className="card group pt-12 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-accent-green rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform">
              <FiCpu className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-display mb-4 text-secondary">
              Learn Smart
            </h3>
            <p className="text-secondary-light">
              Get smart help that adapts to your way of learning and makes
              studying fun!
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 rounded-3xl p-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-display text-secondary mb-6">
          Ready to Start Learning? 🚀
        </h2>
        <p className="text-xl text-secondary-light mb-8">
          Join thousands of young learners on an exciting journey of discovery!
        </p>
        <Link
          to="/chat"
          className="btn btn-secondary text-lg inline-flex items-center"
        >
          Begin Your Journey
          <FiMessageSquare className="ml-2" />
        </Link>
      </div>
    </div>
  );
}
