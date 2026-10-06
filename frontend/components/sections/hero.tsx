"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Download,
  Mail,
  Code2,
  Terminal,
  Layers,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/social-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import gsap from "gsap";
import { profile } from "@/constants/portfolio";
const roles = [
  "Full-Stack Developer",
  "Java Spring Boot Developer",
  "Machine Learning Enthusiast",
  "Computer Engineering Undergraduate",
];
export function Hero() {
  const [role, setRole] = useState(0);
  const visual = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(
      () => setRole((r) => (r + 1) % roles.length),
      3600,
    );
    return () => clearInterval(timer);
  }, [reduced]);
  useEffect(() => {
    if (reduced || !visual.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".system-visual",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1.3, ease: "power3.out" },
      );
      gsap.to(".orbit-ring", {
        rotation: 360,
        duration: 100,
        ease: "none",
        repeat: -1,
      });
    }, visual);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section id="home" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-content">
        <div className="availability">
          <span />
          OPEN TO SOFTWARE ENGINEERING INTERNSHIPS
        </div>
        <div className="hero-greeting">Hi, I’m</div>
        <h1>
          Mohamed
          <br />
          <span>
            Samhi<span className="name-dot">.</span>
          </span>
        </h1>
        <div className="role-line">
          <span className="role-bracket">&lt;</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={role}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
            >
              {roles[role]}
            </motion.span>
          </AnimatePresence>
          <span className="role-bracket">/&gt;</span>
        </div>
        <p className="hero-description">
          Building intelligent, scalable digital systems.
          <br />
          From thoughtful interfaces to reliable backends —
          <br className="desktop-break" /> I turn real-world problems into
          working software.
        </p>
        <div className="hero-buttons">
          <a className="button button-primary" href="#projects">
            Explore my work <ArrowUpRight size={18} />
          </a>
          <a
            className="button button-secondary"
            href="/resume/Mohamed-Samhi-CV.pdf"
            download
          >
            <Download size={17} /> Download CV
          </a>
        </div>
        <div className="hero-socials">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={19} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={19} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail size={19} />
          </a>
          <span className="social-divider" />
          <span>Kinniya, Sri Lanka</span>
        </div>
      </div>
      <div ref={visual} className="hero-art">
        <div className="system-visual">
          <div className="orbit-ring orbit-one" />
          <div className="orbit-ring orbit-two" />
          <div className="orbit-ring orbit-three" />
          <span className="orbit-node node-one" />
          <span className="orbit-node node-two" />
          <div className="orbit-cross cross-one">+</div>
          <div className="orbit-cross cross-two">+</div>
          <div className="system-top">
            <span className="system-label">
              <i /> ENGINEERING IN PROGRESS
            </span>
            <span className="mono">SYS.01</span>
          </div>
          <div className="system-core">
            <div className="core-brackets">[</div>
            <div className="core-logo">
              S<span>.</span>
            </div>
            <div className="core-brackets">]</div>
            <span className="core-caption">BUILD. LEARN. ENGINEER.</span>
          </div>
          <div className="terminal-card">
            <div className="terminal-title">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>samhi@workspace ~</span>
              <Terminal size={14} />
            </div>
            <div className="terminal-body">
              <p>
                <span className="prompt">❯</span> whoami
              </p>
              <p className="terminal-output">
                Mohamed Samhi{" "}
                <span className="code-comment">// engineer in the making</span>
              </p>
              <p>
                <span className="prompt">❯</span> cat focus.json
              </p>
              <pre>
                <span className="code-muted">{"{"}</span>
                {"\n"} <span className="code-purple">"build"</span>:{" "}
                <span className="code-cyan">"Full-stack systems"</span>,{"\n"}{" "}
                <span className="code-purple">"explore"</span>:{" "}
                <span className="code-cyan">"Machine learning"</span>,{"\n"}{" "}
                <span className="code-purple">"mindset"</span>:{" "}
                <span className="code-cyan">"Always learning"</span>
                {"\n"}
                <span className="code-muted">{"}"}</span>
              </pre>
              <p className="terminal-last">
                <span className="prompt">❯</span>{" "}
                <span className="typing-caret" />
              </p>
            </div>
            <div className="terminal-footer">
              <span>
                <i /> SYSTEM ONLINE
              </span>
              <span>Java · React · Python</span>
            </div>
          </div>
          <div className="floating-label label-backend">
            <Layers size={15} />
            <span>Scalable backends</span>
            <i />
          </div>
          <div className="floating-label label-code">
            <Code2 size={16} />
            <span>Clean code. Clear intent.</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#about" className="scroll-link">
          <span className="scroll-mouse" />
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} />
        </a>
        <div className="hero-bottom-right">
          <span>COMPUTER ENGINEERING</span>
          <i /> UNIVERSITY OF RUHUNA
        </div>
      </div>
    </section>
  );
}
