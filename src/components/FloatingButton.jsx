import React from 'react';

function FloatingButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg transition duration-300 cursor-pointer flex items-center space-x-2"
      >
        ⬇️ Export to Excel
      </button>
    );
  }
  
  export default FloatingButton;
  