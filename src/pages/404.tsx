import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';
import type { RootState } from '@/store/store';

export default function Custom404() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isClient, setIsClient] = useState(false);

  // Ensure this only runs on client side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(isAuthenticated ? '/users' : '/auth/login');
    }
  };

  // Show loading state during hydration to prevent mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 max-w-lg mx-auto">
            <div className="mx-auto h-20 w-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl animate-pulse">
              <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is authenticated, show 404 with header
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 max-w-lg mx-auto">
              {/* 404 Icon */}
              <div className="mx-auto h-20 w-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you may have entered an incorrect URL.
                  </p>
                </div>

                {/* User info if authenticated */}
                {user && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          You're still logged in as {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-blue-600">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Go Back
                  </button>
                  
                  <Link
                    href="/users"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7" />
                    </svg>
                    Go to Dashboard
                  </Link>
                </div>

                {/* Quick links */}
                <div>
                  <p className="text-sm text-gray-500 mb-3">Quick Links:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link href="/users" className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                      Team Members
                    </Link>
                    <Link href="/users/create" className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                      Add Member
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show 404 without header
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 max-w-lg mx-auto">
          {/* 404 Icon */}
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you may have entered an incorrect URL.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={goBack}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Go Back
              </button>
              
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 