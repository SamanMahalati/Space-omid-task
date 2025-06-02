import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='white'%3e%3cpath d='m0 2 2-2M0 18l2-2m28 14 2-2m-10-10 2-2'/%3e%3c/svg%3e")`
      }}></div>
      
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-12 xl:px-16">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl">UserVault</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/users" className="text-white/80 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/users" className="text-white/80 hover:text-white transition-colors">
            Users
          </Link>
          <Link href="#" className="text-white/80 hover:text-white transition-colors">
            Analytics
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
          {/* Hero Badge */}
          <div className="inline-flex items-center py-2.5 px-3 gap-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-white/90 text-sm font-medium">Live & Secure</span>
          </div>

          {/* Main heading */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight px-2 sm:px-4">
              <span className="block mb-2 sm:mb-4">Manage Users</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Effortlessly
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 lg:px-6">
              A modern, intuitive platform for streamlined user management with advanced analytics and seamless workflows.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-2 sm:px-4">
              <Link 
                href="/users"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl min-w-[160px] justify-center"
              >
                <span className="mr-2">Get Started</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <button className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 min-w-[160px] justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 110 5H9V10z" />
                </svg>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Feature cards */}
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl mx-auto w-full max-w-sm">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-6 sm:mb-8 mx-auto">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-5 text-center">Lightning Fast</h3>
                <p className="text-white/70 text-sm sm:text-base text-center leading-relaxed">Optimized performance for instant user management operations.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl mx-auto w-full max-w-sm">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6 sm:mb-8 mx-auto">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-5 text-center">Secure & Safe</h3>
                <p className="text-white/70 text-sm sm:text-base text-center leading-relaxed">Enterprise-grade security with advanced encryption protocols.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl mx-auto w-full max-w-sm">
                <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-6 sm:mb-8 mx-auto">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-5 text-center">Smart Analytics</h3>
                <p className="text-white/70 text-sm sm:text-base text-center leading-relaxed">Comprehensive insights and analytics for better decision making.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 sm:py-8 lg:py-10 px-4 sm:px-6 text-white/60 text-sm">
        <p>&copy; 2024 UserVault. Built with modern web technologies.</p>
      </footer>
    </div>
  );
};

export default Home;
