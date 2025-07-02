import MatchList from './components/MatchList';
// import ChatBox from './components/ChatBox';
import ChatTrigger from './components/ChatFloatButton';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white p-4 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
        <h1 className="text-5xl font-bold mb-6 text-center text-green-700">🏏 cricbase</h1>
        {/* <ChatBox /> */}
        <MatchList />
        <ChatTrigger />
      </div>
    </div>
  );
}
