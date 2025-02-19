'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Adjust path based on your structure
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  ClipboardList, 
  GraduationCap, 
  BarChart 
} from 'lucide-react';

const Student = () => {
  const { user, logout } = useAuth(); // Access user and logout from AuthContext
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/'); // Redirect to the home page or login page if not logged in
    }
  }, [user, router]);

  if (!user) {
    return null; // Optionally show a loading state while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-200 flex flex-col antialiased">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <GraduationCap className="text-blue-600 w-8 h-8" />
          <h2 className="text-xl font-semibold text-gray-800">Student Portal</h2>
        </div>
        <button 
          onClick={logout}
          className="group flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
        >
          <LogOut className="w-5 h-5 group-hover:animate-pulse" />
          <span>Logout</span>
        </button>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl flex flex-col items-center justify-center">
        <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name || 'Student'}</h1>
            <p className="text-gray-500">Manage your academic journey</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a 
              href="/studentexam" 
              className="group bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-col items-center space-y-2">
                <ClipboardList className="w-8 h-8 text-green-600 group-hover:animate-bounce" />
                <span className="text-green-800 font-semibold">Take Exam</span>
              </div>
            </a>

            <a 
              href="/result" 
              className="group bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-lg p-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-col items-center space-y-2">
                <BarChart className="w-8 h-8 text-yellow-600 group-hover:animate-pulse" />
                <span className="text-yellow-800 font-semibold">View Results</span>
              </div>
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-md py-4 text-center">
        <p className="text-sm text-gray-500">
          © 2024 Student Portal. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Student;
