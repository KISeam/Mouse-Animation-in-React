import React, { useState, useEffect } from "react";

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

      const target = e.target;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.onclick !== null ||
        target.parentElement?.tagName === "A" ||
        getComputedStyle(target).cursor === "pointer";

      setIsHoveringClickable(isClickable);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="absolute w-2 h-2 bg-gray-500 rounded-full pointer-events-none z-50 transition-opacity duration-300"
        style={{
          transform: `translate(${mousePosition.x - 3}px, ${
            mousePosition.y + scrollY - 3
          }px)`,
          opacity: isHoveringClickable || isActive ? 0 : 1,
        }}
      ></div>

      <div
        className="absolute -top-2 -left-2 w-8 h-8 md:w-12 md:h-12 border-2 border-gray-500 rounded-full pointer-events-none z-50"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${
            mousePosition.y + scrollY - 16
          }px) scale(${isHoveringClickable || isActive ? 1.25 : 1})`,
          transition:
            "transform 0.3s ease-out, opacity 0.3s ease-out, border-width 0.3s ease-out",
          opacity: isHoveringClickable ? 0.1 : 1,
          borderWidth: isActive ? "3px" : isHoveringClickable ? "1px" : "2px",
          borderColor: isActive ? "#000" : "#6b7280",
        }}
      ></div>
    </div>
  );
};

export default App;
