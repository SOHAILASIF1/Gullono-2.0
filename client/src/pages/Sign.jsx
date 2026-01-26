import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../commen';
import { toast } from 'react-toastify';

function Sign() {
  const [data, setData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false); // 🔥 loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true); // 🔥 start loading

    try {
      const fetchData = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await fetchData.json();

      if (resData.success) {
        toast.success('Sign Up Successfully');
        navigate('/login');
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false); // 🔥 stop loading
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-amber-100 via-white to-amber-50 flex items-center justify-center z-50">
      <div className="relative bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md border border-amber-200">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-red-500 text-xl"
        >
          <IoClose />
        </button>

        <h1 className="text-3xl font-extrabold text-amber-700 text-center mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              className="mt-1 w-full p-3 rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="mt-1 w-full p-3 rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="mt-1 w-full p-3 rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          {/* 🔥 Submit Button with Loader */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 flex items-center justify-center gap-2 text-white font-semibold rounded-md shadow-lg transition
              ${loading ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'}
            `}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <Link to={'/login'} className="text-sm text-gray-600 text-center mt-4 block">
          Already have an account?{' '}
          <span className="text-orange-500 hover:underline">Login</span>
        </Link>
      </div>
    </div>
  );
}

export default Sign;
