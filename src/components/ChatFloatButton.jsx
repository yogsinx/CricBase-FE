import  { useState } from 'react';
import ChatModal from './ChatModal';
import ChatBox from './ChatBox';

export default function ChatTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg"
      >
        🧠 AI Expert
      </button>

      {/* Modal with Chat */}
      <ChatModal isOpen={open} onClose={() => setOpen(false)}>
        <ChatBox />
      </ChatModal>
    </>
  );
}
