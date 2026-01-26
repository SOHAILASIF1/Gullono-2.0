import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-tr from-amber-200 to-amber-100 text-gray-800 pt-10 px-4 md:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-gray-300">
        
        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-red-900">Contact Us</h2>
          <div className="flex items-center gap-3">
            <FaLocationDot className="text-red-700" />
            <p>FBexpress, D-17, Islamabad</p>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-red-700" />
            <p>+92 306 3683343</p>
          </div>
          <div className="flex items-center gap-3">
            <MdEmail className="text-red-700" />
            <p>sohilsuf123@gmail.com</p>
          </div>
        </div>

        {/* Information Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-red-900">Information</h2>
          <ul className="space-y-2 text-gray-700">
            <li><Link to="/help" className="hover:text-red-600 transition">Help</Link></li>
            <li><Link to="/policy" className="hover:text-red-600 transition">Return & Exchange Policy</Link></li>
            <li><Link to="/terms" className="hover:text-red-600 transition">Terms of Sale</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-red-900">Company</h2>
          <ul className="space-y-2 text-gray-700">
            <li><Link to="/" className="hover:text-red-600 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-red-600 transition">About</Link></li>
            <li><Link to="/contactUs" className="hover:text-red-600 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-red-900">Follow Us</h2>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-700 text-2xl transition"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-600 text-2xl transition"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-600 text-2xl transition"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-800 text-2xl transition"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-600 mt-6 pb-4">
        © {new Date().getFullYear()} FBexpress. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
