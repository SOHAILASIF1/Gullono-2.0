import React, { useContext, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../commen';
import { toast } from 'react-toastify';
import { Context } from '../App';

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // 🔥 loading state
  const { fetchUser } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true); // 🔥 start loader

    try {
      const fetchData = await fetch(SummaryApi.login.url, {
        method: SummaryApi.login.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const resData = await fetchData.json();

      if (resData.success) {
        toast.success("Login Successfully");
        await fetchUser();
        navigate("/");
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // 🔥 stop loader
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-orange-200 animate-fade-in">

        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-orange-600 hover:bg-orange-100 p-2 rounded-full"
        >
          <IoClose size={24} />
        </button>

        <h1 className="lg:text-3xl text-lg font-extrabold text-orange-700 mb-6 text-center">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
              required
              disabled={loading}
            />
          </div>

          {/* 🔥 Login Button with Loader */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-2 flex items-center justify-center gap-2 rounded-lg font-semibold tracking-wide text-white transition
              ${loading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}
            `}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <Link to={'/signin'} className="text-sm text-gray-600 text-center mt-4 block">
          Don't have an account?{" "}
          <span className="text-orange-500 hover:underline">Sign up</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
