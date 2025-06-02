import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchUserDetails } from '@/store/userSlice';
import type { AppDispatch, RootState } from '@/store/store';

const UserDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id && typeof id === 'string') {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        dispatch(fetchUserDetails(id));
      }
    }
  }, [dispatch, id]);

  // Modern Loading State with Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button Skeleton */}
          <div className="mb-8">
            <div className="h-10 bg-gray-200 rounded-xl w-32 animate-pulse"></div>
          </div>

          {/* Main Card Skeleton */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border animate-pulse">
            {/* Header Section Skeleton */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 bg-gray-200 rounded-3xl"></div>
              <div className="flex-1">
                <div className="h-8 bg-gray-200 rounded w-48 mb-3"></div>
                <div className="h-5 bg-gray-200 rounded w-64"></div>
              </div>
            </div>

            {/* Details Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                </div>
              ))}
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="h-12 bg-gray-200 rounded-xl w-28"></div>
              <div className="h-12 bg-gray-200 rounded-xl w-28"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modern Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-xl border text-center">
            <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Unable to load user</h3>
            <p className="text-gray-600 mb-8">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => dispatch(fetchUserDetails(id as string))}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Try Again
              </button>
              <Link
                href="/users"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Back to Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User Not Found State
  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-xl border text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">User not found</h3>
            <p className="text-gray-600 mb-8">The user you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/users"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Back Button */}
        <div className="mb-8">
          <Link
            href="/users"
            className="inline-flex items-center px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Team Members
          </Link>
        </div>

        {/* Modern User Detail Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header Section with Avatar and Basic Info */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl overflow-hidden ring-6 ring-white/30 shadow-2xl">
                  <img
                    className="w-full h-full object-cover"
                    src={userDetails.avatar}
                    alt={`${userDetails.first_name} ${userDetails.last_name}`}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg"></div>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {userDetails.first_name} {userDetails.last_name}
                </h1>
                <p className="text-blue-100 text-lg mb-4">{userDetails.email}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Active
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                    Team Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="p-8">
            {/* User Details Grid */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">First Name</dt>
                  <dd className="text-lg font-semibold text-gray-900 bg-gray-50 rounded-xl px-4 py-3">
                    {userDetails.first_name}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Last Name</dt>
                  <dd className="text-lg font-semibold text-gray-900 bg-gray-50 rounded-xl px-4 py-3">
                    {userDetails.last_name}
                  </dd>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email Address</dt>
                  <dd className="text-lg font-semibold text-gray-900 bg-gray-50 rounded-xl px-4 py-3 flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {userDetails.email}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">User ID</dt>
                  <dd className="text-lg font-semibold text-gray-900 bg-gray-50 rounded-xl px-4 py-3 font-mono">
                    #{userDetails.id}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Status</dt>
                  <dd className="bg-gray-50 rounded-xl px-4 py-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Active
                    </span>
                  </dd>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-100">
              <Link
                href={`/users/${userDetails.id}/edit`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </Link>
              <button
                onClick={() => navigator.clipboard.writeText(userDetails.email)}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Email
              </button>
              <button
                onClick={() => window.open(`mailto:${userDetails.email}`, '_blank')}
                className="inline-flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage; 