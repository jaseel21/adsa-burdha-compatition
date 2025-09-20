'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { predefinedTeams } from '@/lib/teams';
import { Listbox } from '@headlessui/react';

export default function Register() {
  const [teamName, setTeamName] = useState(predefinedTeams[0]);
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [membersCount, setMembersCount] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamName, phone1, phone2, membersCount, password }),
    });
    if (res.ok) {
      router.push('/auth/login');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl mb-4">Team Registration</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Listbox value={teamName} onChange={setTeamName}>
          <Listbox.Button className="w-full p-2 border mb-4">{teamName}</Listbox.Button>
          <Listbox.Options className="border bg-white">
            {predefinedTeams.map((team) => (
              <Listbox.Option key={team} value={team} className="p-2 cursor-pointer">
                {team}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <input
          type="text"
          placeholder="Phone 1"
          value={phone1}
          onChange={(e) => setPhone1(e.target.value)}
          className="w-full p-2 border mb-4"
          required
        />
        <input
          type="text"
          placeholder="Phone 2"
          value={phone2}
          onChange={(e) => setPhone2(e.target.value)}
          className="w-full p-2 border mb-4"
          required
        />
        <input
          type="number"
          placeholder="Members Count"
          value={membersCount}
          onChange={(e) => setMembersCount(e.target.value)}
          className="w-full p-2 border mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}