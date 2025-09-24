import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters long');

    try {
      setError('');
      setLoading(true);
      const result = await register(formData.name, formData.email, formData.password);
      if (!result.success) {
        setError(result.error || 'Registration failed');
        return;
      }
      navigate('/dashboard');
    } catch {
      setError('Failed to create account. Please try again.');
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
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/85">
        <div className="text-center mb-8">
          <h1 className="text-[40px] leading-tight font-extrabold text-indigo-700 tracking-tight mb-2">
            Task Manager
          </h1>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
            Create Account
          </h2>
          <p className="text-sm text-indigo-500">
            Join our task management platform
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 text-red-600 text-sm font-medium px-4 py-3 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-indigo-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full h-12 rounded-lg px-4 border border-indigo-200 text-indigo-900 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-indigo-700 mb-1">Email Address</label>
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
            <label htmlFor="password" className="block text-sm font-semibold text-indigo-700 mb-1">Password</label>
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
            <p className="mt-1 text-xs text-indigo-400">Must be at least 6 characters</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-indigo-700 mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="w-full h-12 rounded-lg px-4 border border-indigo-200 text-indigo-900 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-lg text-white font-semibold transition-colors ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-indigo-700">
          Already have an account?{' '}
          <span
            className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Sign in here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
