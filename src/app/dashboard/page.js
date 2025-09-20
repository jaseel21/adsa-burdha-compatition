'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { codeLetters } from '@/lib/teams';
import ClipLoader from 'react-spinners/ClipLoader';
import Image from 'next/image';
import { 
  UserGroupIcon, 
  PhoneIcon, 
  UsersIcon, 
  DocumentCheckIcon,
  TicketIcon,
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [codeLetter, setCodeLetter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
      return;
    }

    const fetchTeamData = async () => {
      try {
        const res = await fetch('/api/team/data');
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setTeamData(data);
        setCodeLetter(data.codeLetter); // Sync with fetched data
        if (!data.termsAgreed) {
          setShowTermsPopup(true);
        }
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError('Unable to load team data. Please try again later.');
      } finally {
        setFetched(true);
      }
    };
    fetchTeamData();
  }, [session, status, router]);

  const handleLot = async () => {
    if (window.confirm('Are you sure you want to get a code letter? This action cannot be undone.')) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/lot', { method: 'POST' });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || `Failed to get lot: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (data.codeLetter) {
          setCodeLetter(data.codeLetter);
          setTeamData({ ...teamData, codeLetter: data.codeLetter });
        } else {
          throw new Error('No code letter received');
        }
      } catch (err) {
        console.error('Lot error:', err.message);
        setError(err.message || 'Failed to get code letter. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTermsAgreement = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/team/data', { method: 'POST' });
      if (!res.ok) {
        throw new Error(`Failed to agree terms: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      setTeamData({ ...teamData, termsAgreed: true });
      setShowTermsPopup(false);
    } catch (err) {
      console.error('Terms agreement error:', err.message);
      setError(err.message || 'Failed to agree terms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || !fetched) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/banner.png" 
            alt="Banner" 
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-transparent to-red-900/40"></div>
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <ClipLoader color="#f59e0b" loading={true} size={80} />
            <p className="text-white text-lg mt-4 font-medium">Loading Dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Terms and Conditions Modal */}
      {showTermsPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 relative">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 mb-4">
                <DocumentCheckIcon className="h-8 w-8 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms and Conditions</h2>
              <p className="text-gray-600">Please read and agree to the terms to proceed with your dashboard access.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-32 overflow-y-auto">
              <p className="text-sm text-gray-700">
               ആലത്തൂർപടി ദർസ് സ്റ്റുഡന്റസ് അസോസിയേഷൻ സംഘടിപ്പിക്കുന്ന ബുർദ ഖവ്വാലി മത്സരത്തിൽ രജിസ്റ്റർ ചെയ്തതിന് നന്ദി

മത്സരത്തിന്റെ നിയമാവലി വായിച്ചു മനസ്സിലാക്കിയിട്ടുണ്ടാവുമെന്ന് കരുതുന്നു.  

 മത്സരവുമായി ബന്ധപ്പെട്ട കാര്യങ്ങളിൽ ജൂറിയുടെയും സംഘാടക സമിതിയുടെയും  തീരുമാനം അന്തിമമായിരിക്കുന്നതാണ്
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleTermsAgreement}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none transition-all duration-300 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <ClipLoader color="#ffffff" loading={true} size={20} />
                    <span className="ml-2">Processing...</span>
                  </div>
                ) : (
                  'I Agree'
                )}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Dashboard */}
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
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-transparent to-red-900/40"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Image 
                  src="/images/logo.png" 
                  alt="Logo" 
                  width={50} 
                  height={50}
                  className="drop-shadow-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                  <p className="text-white/70 text-sm">Team Management Portal</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white px-4 py-2 rounded-lg border border-red-500/30 transition-all duration-200 backdrop-blur-sm"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {teamData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Team Information Card */}
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-amber-500/20 p-3 rounded-xl mr-4">
                    <UserGroupIcon className="h-8 w-8 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Team Information</h2>
                    <p className="text-white/70">Your team details</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-lg border border-white/20">
                    <UserGroupIcon className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-white/70 text-sm">Team Name</p>
                      <p className="text-white font-semibold">{teamData.teamName || 'Unknown Team'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-lg border border-white/20">
                    <PhoneIcon className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-white/70 text-sm">Primary Phone</p>
                      <p className="text-white font-semibold">{teamData.phone1 || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-lg border border-white/20">
                    <PhoneIcon className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-white/70 text-sm">Secondary Phone</p>
                      <p className="text-white font-semibold">{teamData.phone2 || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-lg border border-white/20">
                    <UsersIcon className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-white/70 text-sm">Team Size</p>
                      <p className="text-white font-semibold">{teamData.membersCount || 'N/A'} Members</p>
                    </div>
                  </div>

                  {teamData.termsAgreed && (
                    <div className="flex items-center space-x-3 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                      <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-green-200 font-medium">Terms Accepted</p>
                        <p className="text-green-300/70 text-sm">You have agreed to our Terms and Conditions</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Code Letter Section */}
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-500/20 p-3 rounded-xl mr-4">
                    <TicketIcon className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Code Letter</h2>
                    <p className="text-white/70">Your competition identifier</p>
                  </div>
                </div>

                <div className="text-center">
                  {codeLetter ? (
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-500/30 mb-4">
                        <p className="text-white/70 text-sm mb-2">Your Code Letter</p>
                        <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-wider">
                          {codeLetter}
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-green-400">
                        <CheckCircleIcon className="h-5 w-5" />
                        <span className="font-medium">Code Letter Assigned Successfully</span>
                      </div>
                    </div>
                  ) : loading ? (
                    <div className="py-12">
                      <ClipLoader color="#f59e0b" loading={loading} size={80} />
                      <p className="text-white text-lg mt-4 font-medium">Generating Code Letter...</p>
                      <p className="text-white/70 text-sm mt-2">Please wait while we process your request</p>
                    </div>
                  ) : (
                    <div className="py-8">
                      <div className="bg-white/10 rounded-xl p-6 mb-6 border border-white/20">
                        <TicketIcon className="h-16 w-16 text-amber-400 mx-auto mb-4" />
                        <p className="text-white text-lg mb-2">Ready to get your Code Letter?</p>
                        <p className="text-white/70 text-sm">
                          Click the button below to receive your unique competition identifier. 
                          This action cannot be undone.
                        </p>
                      </div>
                      <button
                        onClick={handleLot}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-out border border-white/20"
                      >
                        <div className="flex items-center justify-center">
                          <TicketIcon className="w-6 h-6 mr-2" />
                          Get Code Letter
                        </div>
                      </button>
                    </div>
                  )}

                  {error && (
                    <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <div className="flex items-center justify-center text-red-200">
                        <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                        <span className="font-medium">{error}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-amber-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-blue-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>
      </div>
    </>
  );
}