'use client';

import { useEffect, useState } from 'react';
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
import ClipLoader from 'react-spinners/ClipLoader';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch('/api/teams');
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setTeams(data);
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError('Unable to load teams. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) {
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
            <p className="text-white text-lg mt-4 font-medium">Loading Teams...</p>
          </div>
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-white">Teams List</h1>
                <p className="text-white/70 text-sm">All Registered Teams</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="text-center py-12">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-white text-lg">{error}</p>
          </div>
        ) : (
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-6">All Teams</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-amber-500/20 border-b border-white/20">
                  <tr>
                    <th className="py-3 px-4 text-white/70 font-semibold">Team Name</th>
                    <th className="py-3 px-4 text-white/70 font-semibold">Phone 1</th>
                    <th className="py-3 px-4 text-white/70 font-semibold">Phone 2</th>
                    <th className="py-3 px-4 text-white/70 font-semibold">Members</th>
                    <th className="py-3 px-4 text-white/70 font-semibold">Code Letter</th>
                    <th className="py-3 px-4 text-white/70 font-semibold">Terms Agreed</th>
                    <th className="py-3 px-4 text-white/70 font-semibold">Password</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white font-medium">{team.teamName}</td>
                      <td className="py-3 px-4 text-white/70">{team.phone1}</td>
                      <td className="py-3 px-4 text-white/70">{team.phone2}</td>
                      <td className="py-3 px-4 text-white/70">{team.membersCount}</td>
                      <td className="py-3 px-4 text-purple-400 font-semibold">{team.codeLetter || 'N/A'}</td>
                      <td className="py-3 px-4">
                        {team.termsAgreed ? (
                          <span className="flex items-center text-green-400">
                            <CheckCircleIcon className="h-5 w-5 mr-1" />
                            Yes
                          </span>
                        ) : (
                          <span className="text-red-400">No</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-white/70">{team.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {teams.length === 0 && (
              <p className="text-white/70 text-center py-6">No teams registered yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-amber-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-blue-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>
    </div>
  );
}