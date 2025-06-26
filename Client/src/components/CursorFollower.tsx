import React, { useEffect, useRef } from "react";

const TRAIL_LENGTH = 6;

export const CursorFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const dot = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const trail = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }))
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const animate = () => {

      dot.current.x += (mouse.current.x - dot.current.x) * 0.15;
      dot.current.y += (mouse.current.y - dot.current.y) * 0.15;

      let prev = { ...dot.current };
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const t = trail.current[i];
        t.x += (prev.x - t.x) * 0.25;
        t.y += (prev.y - t.y) * 0.25;
        prev = { ...t };
        if (trailRefs.current[i]) {
          trailRefs.current[i]!.style.transform = `translate3d(${t.x - 5}px, ${t.y - 5}px, 0)`;
        }
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x - 5}px, ${dot.current.y - 5}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={el => (trailRefs.current[i] = el)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#000",
            pointerEvents: "none",
            zIndex: 9998,
            willChange: "transform",
            opacity: 0.28 - i * 0.03,
            filter: `blur(${2 + i * 2}px)`
          }}
        />
      ))}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#000",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
    </>
  );
}; 