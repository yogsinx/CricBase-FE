import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useCallback } from 'react';
export default function MatchList() {
  const [matches, setMatches] = useState([]);

  const fetchMatches = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/matches');
      setMatches(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const liveMatches = matches.filter((m) => m.status !=='Match not started');
  const upcomingMatches = matches.filter((m) => m.status ==='Match not started');

  const renderMatchCard = (match) => (
    <div key={match.id} className="min-w-[280px] p-3 border rounded bg-white shadow-sm mx-2 flex-shrink-0">
      <div className="flex justify-between items-center">
        {match.teamInfo.map((team, idx) => (
          <div key={idx} className="flex flex-col items-center text-xs">
            <span className="font-semibold">{team.shortname}</span>
            <img src={team.img} alt={team.name} className="h-10 w-10 my-1" />
            <span className="text-[10px] text-gray-500">{team.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-700">
        <div className="font-medium text-sm">{match.name}</div>
        <div>{match.venue}</div>
        <div className="text-blue-600">{match.date}</div>
        <div className="text-gray-600 italic">{match.status}</div>
      </div>
    </div>
  );

  return (
    <div className='flex flex-col gap-6 p-4'>
      <div className="bg-white border border-gray-200 rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-green-700">🟢 Recent matches</h2>

        <div className="flex overflow-x-auto scrollbar-hide mb-4">
        {liveMatches.length === 0 && (
          <p className="text-sm text-gray-500 mx-2">No live matches now.</p>
        )}
        {liveMatches.slice(0,4).map(renderMatchCard)}
      </div>
        {/* <ul className="space-y-3">
          {liveMatches.slice(0, 4).map((match) => (
            <li key={match.id} className="p-3 bg-gray-50 rounded-md border hover:shadow transition">
              <div className="text-lg font-medium">{match.name}</div>
              <div className="text-sm text-gray-500">{match.status} · {match.date}</div>
              <div className="text-sm text-gray-400">{match.venue}</div>
            </li>
          ))}
        </ul> */}
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-green-700">📅 Upcoming matches</h2>

        <div className="flex overflow-x-auto scrollbar-hide mb-4">
          {upcomingMatches.length === 0 && (
            <p className="text-sm text-gray-500 mx-2">No upcoming matches.</p>
          )}
          {upcomingMatches.slice(0,4).map(renderMatchCard)}
        </div>
      </div>
    </div>
  );
}
