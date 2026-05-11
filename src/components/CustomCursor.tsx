import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the outer circle
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.style.cursor === "pointer"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style>
        {`
          * {
            cursor: none !important;
          }
          @media (max-width: 768px) {
            * {
              cursor: auto !important;
            }
            .custom-cursor-container {
              display: none;
            }
          }
        `}
      </style>
      <div className="custom-cursor-container" style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 100000 }}>
        {/* Main Dot */}
        <motion.div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            x: mouseX,
            y: mouseY,
            width: 8,
            height: 8,
            backgroundColor: "#7fd0ff",
            borderRadius: "50%",
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 100001,
          }}
          animate={{
            scale: isClicked ? 0.8 : 1,
            opacity: isHovered ? 0 : 1,
          }}
        />

        {/* Outer Ring */}
        <motion.div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            x: cursorX,
            y: cursorY,
            width: 40,
            height: 40,
            border: "1.5px solid #7fd0ff",
            borderRadius: "50%",
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 100000,
          }}
          animate={{
            scale: isHovered ? 1.5 : isClicked ? 0.9 : 1,
            backgroundColor: isHovered ? "rgba(127, 208, 255, 0.15)" : "rgba(127, 208, 255, 0)",
            borderColor: isHovered ? "rgba(127, 208, 255, 0.8)" : "rgba(127, 208, 255, 0.5)",
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
