'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { predefinedTeams } from '@/lib/teams';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon, UserGroupIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Login() {
  const [teamName, setTeamName] = useState(predefinedTeams[0]);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await signIn('credentials', {
      teamName,
      password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push('/dashboard');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Banner with Overlay */}
      <div className="absolute inset-0">
        <Image 
          src="/images/banner.png" 
          alt="Banner" 
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay for better form readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-transparent to-red-900/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        {/* Back to Home Button */}
        <Link 
          href="/" 
          className="absolute top-8 left-8 text-white/80 hover:text-white transition-colors duration-200 flex items-center space-x-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </Link>

        {/* Login Form Container */}
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-block relative mb-4">
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={120} 
                height={120}
                className="drop-shadow-2xl mx-auto"
              />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl scale-110 -z-10"></div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Team Login
            </h1>
            <p className="text-white/80 text-sm">
              Welcome back! Please sign in to your team account.
            </p>
          </div>

          {/* Login Form */}
          <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm backdrop-blur-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Selection */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Select Team
                </label>
                <Listbox value={teamName} onChange={setTeamName}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 py-3 pl-4 pr-10 text-left shadow-lg hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50">
                      <span className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 text-amber-400 mr-3" />
                        <span className="block truncate text-white font-medium">{teamName}</span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon className="h-5 w-5 text-white/60" aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white/95 backdrop-blur-lg py-1 text-base shadow-xl ring-1 ring-black/5 focus:outline-none">
                        {predefinedTeams.map((team, teamIdx) => (
                          <Listbox.Option
                            key={teamIdx}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors duration-150 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                              }`
                            }
                            value={team}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                  {team}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-amber-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 disabled:hover:transform-none transition-all duration-300 ease-out border border-white/20 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </div>
                )}
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                Don't have a team account?{' '}
                <Link 
                  href="/auth/register" 
                  className="text-amber-400 hover:text-amber-300 transition-colors duration-200 font-medium"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-amber-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-red-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}