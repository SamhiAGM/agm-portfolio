"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useMotionPreference } from "@/hooks/use-motion-preference";
export function ExperienceEffects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const reduced = useMotionPreference();
  const cursor = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!reduced && !sessionStorage.getItem("samhi-visited")) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("samhi-visited", "1");
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [reduced]);
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      const target = e.target instanceof Element ? e.target : null;
      frame = requestAnimationFrame(() => {
        if (!cursor.current) return;
        cursor.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
        cursor.current.dataset.view = String(
          !!target?.closest('[data-cursor="view"]'),
        );
        cursor.current.dataset.active = "true";
        document.documentElement.style.setProperty(
          "--pointer-x",
          `${e.clientX}px`,
        );
        document.documentElement.style.setProperty(
          "--pointer-y",
          `${e.clientY}px`,
        );
      });
    };
    const leave = () => {
      if (cursor.current) cursor.current.dataset.active = "false";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduced]);
  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className="custom-cursor" ref={cursor} aria-hidden="true">
        <span>VIEW</span>
      </div>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            aria-hidden="true"
          >
            <span className="loader-logo">&lt;SAMHI /&gt;</span>
            <span className="mono">INITIALIZING PORTFOLIO</span>
            <div className="loader-line" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
