import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#090a0d] border-t border-white/5 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gymGreen p-2 rounded-lg text-gymDark">
                <Dumbbell className="h-6 w-6 transform -rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-wider text-white">
                GYM<span className="text-gymGreen">PRO</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover GYMPRO and change your life. We offer state-of-the-art equipment, professional trainers, and personalized fitness programs.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gymGreen hover:text-gymDark text-gray-400 transition-all duration-300">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gymGreen hover:text-gymDark text-gray-400 transition-all duration-300">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gymGreen hover:text-gymDark text-gray-400 transition-all duration-300">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-1.016-1.07-1.815-2.085-2.086C19.565 3.545 12 3.545 12 3.545s-7.565 0-9.413.532c-1.014.271-1.813 1.07-2.085 2.086C0 8.016 0 12 0 12s0 3.984.502 5.837c.272 1.016 1.07 1.815 2.085 2.086C4.435 20.455 12 20.455 12 20.455s7.565 0 9.413-.532c1.015-.271 1.813-1.07 2.085-2.086C24 15.984 24 12 24 12s0-3.984-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gymGreen hover:text-gymDark text-gray-400 transition-all duration-300">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold mb-6 tracking-wider uppercase border-l-2 border-gymGreen pl-3">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-gymGreen transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-gymGreen transition-colors">About Us</Link></li>
              <li><Link to="/essential" className="hover:text-gymGreen transition-colors">Interactive Dashboard</Link></li>
              <li><Link to="/classes" className="hover:text-gymGreen transition-colors">Our Classes</Link></li>
            </ul>
          </div>

          {/* Pages & Utils */}
          <div>
            <h4 className="text-white text-base font-bold mb-6 tracking-wider uppercase border-l-2 border-gymGreen pl-3">Helpful tools</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/bmi" className="hover:text-gymGreen transition-colors">BMI Calculator</Link></li>
              <li><Link to="/blogs" className="hover:text-gymGreen transition-colors">Fitness & Health Blogs</Link></li>
              <li><a href="#" className="hover:text-gymGreen transition-colors">Membership Plans</a></li>
              <li><a href="#" className="hover:text-gymGreen transition-colors">Support & FAQs</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-base font-bold mb-6 tracking-wider uppercase border-l-2 border-gymGreen pl-3">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gymGreen flex-shrink-0 mt-0.5" />
                <span>120 Fitness Center Avenue, Iron Bay, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gymGreen flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gymGreen flex-shrink-0" />
                <span>support@gympro.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} GYMPRO. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
