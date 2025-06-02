import { useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { verifyToken } from '@/store/authSlice';
import type { AppDispatch, RootState } from '@/store/store';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean; // true for protected routes, false for public routes (login/register)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Verify token on component mount
    dispatch(verifyToken());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        // Redirect to login if route requires auth and user is not authenticated
        router.push('/auth/login');
      } else if (!requireAuth && isAuthenticated) {
        // Redirect to dashboard if route is public (login/register) and user is authenticated
        router.push('/users');
      }
    }
  }, [loading, isAuthenticated, requireAuth, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          {/* Logo/Icon */}
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl animate-pulse">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>

          {/* Loading Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 max-w-md mx-auto">
            <div className="space-y-6">
              {/* Animated Loading Spinner */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                </div>
              </div>

              {/* Loading Text */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h3>
                <p className="text-gray-600 text-sm">Verifying your authentication status</p>
              </div>

              {/* Loading Skeleton */}
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded-full animate-pulse w-4/5"></div>
                <div className="h-3 bg-gray-200 rounded-full animate-pulse w-3/5"></div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8">
            <p className="text-sm text-gray-500">Space Omid Dashboard</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything while redirecting
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  // Render children if authentication check passes
  return <>{children}</>;
};

export default ProtectedRoute; 