import React, { useState } from 'react';
import SummaryApi from '../commen';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(SummaryApi.sendEmail.url, {
        method: SummaryApi.sendEmail.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setStatus('✅ Message sent successfully!');
        setFormData({ fullName: '', email: '', message: '' });
      } else {
        setStatus('❌ Failed to send message. Try again.');
      }
    } catch (err) {
      setStatus('❌ An error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-blue-200 animate-fade-in">
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-700">📬 Get in Touch</h2>
        <p className="text-center text-gray-600 mb-8">
          We'd love to hear from you! Please fill out the form below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              placeholder="Write your message here..."
              className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-300"
          >
            Send Message
          </button>
        </form>
        {status && (
          <div className="mt-6 text-center text-sm text-green-600 animate-pulse">
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
