'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Access login from AuthContext
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = { email, password };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.user); // Save user data to context
        switch (result.user.role) {
          case 'student':
            router.push('/studentexam');
            break;
          case 'teacher':
            router.push('/teacher');
            break;
          case 'mentor':
            router.push('/mentor');
            break;
          case 'eduvocate-sub-admin':
            router.push('/subadmin');
            break;
          case 'eduvocate-super-admin':
            router.push('/superadmin');
            break;
          case 'company-representative':
            router.push('/companyrepresentative');
            break;
          default:
            setError('Unknown role');
            break;
        }
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainbg absolute inset-0 flex items-center justify-center min-h-screen">
      <div className="absolute inset-0 z-0 mainbg filter brightness-50 blur-sm"></div>
      <div className="w-full max-w-md p-8 rounded-xl shadow-xl bg-white/90 backdrop-blur-sm mx-4 md:mx-0 transform transition-all duration-300 hover:shadow-2xl relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Enter your details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02]"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="flex justify-between items-center space-x-2">
            <p className="text-gray-600">Don't have an account? <a href="/signup" className="text-blue-600 hover:text-blue-800 hover:underline">Create an account</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
