import  { useEffect } from 'react';

export default function ChatModal({ isOpen, onClose, children }) {
  useEffect(() => {
    const closeOnEscape = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="bg-white w-full max-w-2xl mx-4 p-4 rounded shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Chat Content */}
        {children}
      </div>
    </div>
  );
}
