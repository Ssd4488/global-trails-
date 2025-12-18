import React from 'react';
import { useAuth } from '../app/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Layout, User } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center text-indigo-600">
                <Layout className="h-8 w-8" />
                <span className="ml-2 font-bold text-xl text-slate-900">NexusApp</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center px-3 py-1 bg-slate-100 rounded-full">
                <User className="h-4 w-4 text-slate-500 mr-2" />
                <span className="text-sm font-medium text-slate-700">
                  {currentUser?.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
          <div className="p-6 bg-white border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-slate-500">
              Welcome back! You are securely logged in.
            </p>
          </div>
          <div className="p-6 bg-slate-50">
            <div className="border-2 border-dashed border-slate-300 rounded-lg h-96 flex items-center justify-center">
               <div className="text-center">
                 <Layout className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                 <h3 className="text-lg font-medium text-slate-900">Your content goes here</h3>
                 <p className="text-slate-500">Start building your application features.</p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;