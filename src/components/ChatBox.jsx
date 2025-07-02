import  { useState } from 'react';

export default function ChatBox() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]); // { user: '', bot: '' }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const context = [...messages]; // send past messages
    setLoading(true);
    setResponse('');
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query , context})
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const reply = await res.json();

      if (reply) {
        setResponse(reply);
        setMessages([...messages, { user: query, bot: reply }]);
        setQuery(''); // clear input after sending
        setError(''); // clear any previous error
      } else {
        setError('No response from server.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-green-700">🤖 Hey! I know all about cricket, try me!
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ask anything about cricket..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
        >
          {loading ? 'Thinking...' : `Ask AI expert!`}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <strong>Answer:</strong>
          <p className="mt-2 whitespace-pre-line">{response.reply}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md border border-red-200">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
