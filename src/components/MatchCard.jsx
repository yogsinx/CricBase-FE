export default function MatchCard({ match }) {
  return (
    <div className="bg-cricketGreen text-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">{match.team1} vs {match.team2}</h2>
      <p className="text-sm">{match.status}</p>
      <p className="text-xs">Starts at: {new Date(match.start_time).toLocaleString()}</p>
    </div>
  );
}
