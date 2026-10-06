"use client";
import { motion } from "framer-motion";
import { useMotionPreference } from "@/hooks/use-motion-preference";
export function Reveal({
  children,
  className = "",
  delay = 0,
  onPointerMove,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onPointerMove?: (event: React.PointerEvent<HTMLDivElement>) => void;
}) {
  const reduced = useMotionPreference();
  return (
    <motion.div
      className={`reveal ${className}`}
      onPointerMove={onPointerMove}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: reduced ? 0 : 0.7,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="section-heading">
      <div className="eyebrow">
        <span>{number}</span>
        <i /> {eyebrow}
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}
