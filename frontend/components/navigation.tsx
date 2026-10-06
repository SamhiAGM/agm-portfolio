"use client";
import { useEffect, useState } from "react";
import { Download, Menu, X, Command } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { navigation, profile } from "@/constants/portfolio";
export function Navigation() {
  const [open, setOpen] = useState(false),
    [active, setActive] = useState("home"),
    [scrolled, setScrolled] = useState(false),
    [command, setCommand] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -65% 0px" },
    );
    navigation.forEach((n) => {
      const section = document.getElementById(n.toLowerCase());
      if (section) observer.observe(section);
    });
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommand((v) => !v);
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", key);
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <header className={`navigation ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="logo" aria-label="Samhi home">
          <span className="logo-mark">
            s<span>.</span>
          </span>
          SAMHI<span className="logo-dev">.dev</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              className={active === n.toLowerCase() ? "active" : ""}
            >
              {n}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="command-key"
            onClick={() => setCommand(true)}
            aria-label="Open command palette"
          >
            <Command size={14} /> K
          </button>
          <a href="/resume/Mohamed-Samhi-CV.pdf" download className="nav-cv">
            <Download size={14} /> <span>Download CV</span>
          </a>
          <button
            className="menu-toggle"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="mobile-menu">
            <Dialog.Title className="logo">SAMHI.dev</Dialog.Title>
            <Dialog.Description className="sr-only">
              Navigate the portfolio
            </Dialog.Description>
            <Dialog.Close
              className="dialog-close"
              aria-label="Close navigation"
            >
              <X />
            </Dialog.Close>
            <nav>
              {navigation.map((n, i) => (
                <a
                  href={`#${n.toLowerCase()}`}
                  key={n}
                  onClick={() => setOpen(false)}
                >
                  <span>0{i + 1}</span>
                  {n}
                </a>
              ))}
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root open={command} onOpenChange={setCommand}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="command-palette">
            <Dialog.Title>Go somewhere.</Dialog.Title>
            <Dialog.Description>Navigate Samhi’s portfolio</Dialog.Description>
            <Dialog.Close
              className="dialog-close"
              aria-label="Close command palette"
            >
              <X size={20} />
            </Dialog.Close>
            {[
              ...navigation.map((n) => ({
                label: n,
                url: `#${n.toLowerCase()}`,
              })),
              { label: "GitHub", url: profile.github },
              { label: "LinkedIn", url: profile.linkedin },
              { label: "Download CV", url: "/resume/Mohamed-Samhi-CV.pdf" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.url}
                onClick={() => setCommand(false)}
              >
                {item.label}
                <span>↵</span>
              </a>
            ))}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
