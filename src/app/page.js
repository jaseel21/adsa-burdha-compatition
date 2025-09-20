import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Banner with Enhanced Overlay */}
      <div className="absolute inset-0">
        <Image 
          src="/images/banner.png" 
          alt="Banner" 
          fill
          className="object-cover object-center"
          priority
        />
        {/* Multiple layered overlays for depth */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-orange-900/40 to-red-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-20 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={50} 
                height={50}
                className="drop-shadow-lg"
              />
              <span className="text-white text-xl font-bold">Competition Portal</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link href="/about" className="text-white/80 hover:text-white transition-colors duration-200">
                About
              </Link>
              <Link href="/rules" className="text-white/80 hover:text-white transition-colors duration-200">
                Rules
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20">
        {/* Logo Section with Advanced Animation */}
        <div className="mb-12 group">
          <div className="relative transform transition-all duration-700 hover:scale-110 group-hover:rotate-3">
            <Image 
              src="/images/logo.png" 
              alt="Logo" 
              width={280} 
              height={280}
              className="drop-shadow-2xl filter transition-all duration-500 group-hover:brightness-110"
            />
            {/* Multi-layered glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full blur-2xl scale-125 -z-10 animate-pulse"></div>
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-110 -z-20 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-400/20 rounded-full blur-3xl scale-150 -z-30 animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Text Logo with Enhanced Styling */}
        <div className="mb-16 text-center relative">
          <div className="transform hover:scale-105 transition-transform duration-500">
            <Image 
              src="/images/png-text.png" 
              alt="Text" 
              width={600} 
              height={180}
              className="drop-shadow-2xl mx-auto filter brightness-110"
            />
          </div>
          {/* Subtitle */}
          <div className="mt-6">
            <p className="text-white/90 text-xl font-medium mb-2 tracking-wide">
              Join the Ultimate Burdha Competition Experience
            </p>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Register your team, get your unique code letter, and compete for glory in our professional tournament platform.
            </p>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 w-full max-w-2xl mb-12">
          <Link href="/about" className="flex-1 group">
            <button className="w-full relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 text-white font-bold py-6 px-12 rounded-2xl shadow-2xl hover:shadow-amber-500/25 transform hover:-translate-y-3 hover:scale-105 transition-all duration-400 ease-out backdrop-blur-lg border border-amber-400/30 text-xl">
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative flex items-center justify-center">
                <svg className="w-7 h-7 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Contact Us
              </span>
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-2xl bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
            </button>
          </Link>

          <Link href="/auth/login" className="flex-1 group">
            <button className="w-full relative overflow-hidden bg-gradient-to-r from-orange-800 via-red-800 to-amber-800 hover:from-orange-700 hover:via-red-700 hover:to-amber-700 text-white font-bold py-6 px-12 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-3 hover:scale-105 transition-all duration-400 ease-out backdrop-blur-lg border border-orange-400/30 text-xl">
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative flex items-center justify-center">
                <svg className="w-7 h-7 mr-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                </svg>
                Team Login
              </span>
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-2xl bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
            </button>
          </Link>
        </div>

        {/* Feature Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          <div className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 group">
            <div className="text-center">
              <div className="bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Team Registration</h3>
              <p className="text-white/70 text-sm">Register your team and get ready to compete in our exciting tournament.</p>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 group">
            <div className="text-center">
              <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Code Letters</h3>
              <p className="text-white/70 text-sm">Receive your unique code letter for competition identification and tracking.</p>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 group">
            <div className="text-center">
              <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Professional Platform</h3>
              <p className="text-white/70 text-sm">Experience our state-of-the-art competition management system.</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-red-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-10 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 rounded-full blur-lg animate-pulse delay-2000"></div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-amber-400/40 rounded-full animate-bounce delay-300 shadow-lg shadow-amber-400/20"></div>
        <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-orange-400/40 rounded-full animate-bounce delay-700 shadow-lg shadow-orange-400/20"></div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-red-400/40 rounded-full animate-bounce delay-1000 shadow-lg shadow-red-400/20"></div>
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-yellow-400/40 rounded-full animate-bounce delay-1500 shadow-lg shadow-yellow-400/20"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-amber-400/30 rounded-full animate-bounce delay-2000 shadow-lg shadow-amber-400/10"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}