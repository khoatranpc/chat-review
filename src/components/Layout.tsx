import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="/mindx-logo.png"
                  alt="MindX Logo"
                  className="h-12 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-display text-primary">
                    MindX
                  </span>
                  <span className="text-sm text-secondary-light">
                    Technology School
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-secondary hover:text-primary font-bold transition-colors"
              >
                Home
              </Link>
              <Link to="/chat" className="btn btn-primary">
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img
                src="/mindx-logo.png"
                alt="MindX Logo"
                className="h-10 w-auto mb-4"
              />
              <p className="text-gray-600">
                Empowering young minds through technology and innovation.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-600 hover:text-primary">
                  Home
                </Link>
                <Link
                  to="/chat"
                  className="block text-gray-600 hover:text-primary"
                >
                  AI Chat
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-display text-lg mb-4">Contact</h3>
              <div className="space-y-2 text-gray-600">
                <p>Email: info@mindx.edu.vn</p>
                <p>Phone: (84) 123 456 789</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-gray-500">
            <p>© 2024 MindX Technology School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
