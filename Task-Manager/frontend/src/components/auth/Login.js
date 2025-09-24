import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ServerRouter, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.error || 'Invalid credentials');
      return;
    }

    navigate('/dashboard');
  } catch (err) {
    setError(err.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};



  return (
    <div
      className="
        min-h-screen relative flex items-center justify-center overflow-hidden
        bg-fixed bg-center bg-cover
        before:absolute before:inset-0 before:bg-gradient-to-b before:from-indigo-600/35 before:to-violet-700/35
        after:pointer-events-none after:absolute after:inset-0
        after:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.15)_45%,rgba(255,255,255,0)_70%)]
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop')"
      }}
    >
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/85 ">
        <div className="text-center mb-8">
          <h1 className="text-[40px] leading-tight font-extrabold text-indigo-700 tracking-tight mb-2">
            Task Manager
          </h1>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-indigo-500">
            Log in to manage your tasks efficiently
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 text-red-600 text-sm font-medium px-4 py-3 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-indigo-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full h-12 rounded-lg px-4 border border-indigo-200 text-indigo-900 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-indigo-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full h-12 rounded-lg px-4 border border-indigo-200 text-indigo-900 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
            />
          </div>

          <button
            disabled={loading}
            className="w-full h-12 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-indigo-700">
          <p>
            Don't have an account?{' '}
            <span
              className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
