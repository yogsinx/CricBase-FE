import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'cricket-chat-context';

export default function ChatBox() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]); // { user: '', bot: '' }

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  // ✅ Save to localStorage on every message update
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

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
        body: JSON.stringify({ query, context })
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();

      if (data?.reply) {
        const newMessages = [...messages, { user: query, bot: data.reply }];
        setMessages(newMessages);
        setQuery('');
        setResponse(data.reply);
      } else {
        setError('⚠️ No response from server.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setResponse('');
    setError('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-green-700">
          🤖 Hey! I know all about cricket — try me!
        </h2>
        <button
          onClick={clearChat}
          className="text-sm text-red-600 hover:underline"
        >
          Clear chat
        </button>
      </div>

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
          {loading ? 'Thinking...' : 'Ask AI expert!'}
        </button>
      </form>

      {/* Full chat history display */}
      <div className="mt-6 space-y-4 max-h-72 overflow-y-auto pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-gray-50 border border-gray-200 rounded p-3">
            <p><strong>You:</strong> {msg.user}</p>
            <p className="mt-1"><strong>Bot:</strong> {msg.bot}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}
    </div>
  );
}
