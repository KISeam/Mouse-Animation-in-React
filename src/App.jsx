import React, { useEffect, useState } from "react";

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY + window.scrollY;

      setMousePosition({ x, y });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative">
      {/* Small red dot at mouse position */}
      <div
        className="absolute w-[6px] h-[6px] bg-gray-500 rounded-full pointer-events-none z-50"
        style={{
          transform: `translate(${mousePosition.x - 3}px, ${
            mousePosition.y - 3
          }px)`,
        }}
      ></div>

      {/* Smaller circle inside the mouse cursor */}
      <div
        className="absolute w-8 h-8 border-2 border-gray-500 rounded-full pointer-events-none z-50"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${
            mousePosition.y - 16
          }px)`,
          transition: "transform 0.3s ease-out",
        }}
      ></div>
    </div>
  );
};

export default App;
