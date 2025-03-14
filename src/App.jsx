import React, { useEffect, useState } from 'react';

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      {/* Small red dot at mouse position */}
      <div
        className="absolute w-[6px] h-[6px] bg-gray-600 rounded-full pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x - 2}px, ${mousePosition.y - 2}px)`,
        }}
      ></div>

      {/* Smaller circle inside the mouse cursor */}
      <div
        className="absolute w-8 h-8 border-2 border-gray-500 rounded-full pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x - 15}px, ${mousePosition.y - 15}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      ></div>
    </div>
  );
};

export default App;