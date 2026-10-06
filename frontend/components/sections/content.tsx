"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Braces,
  Database,
  GitBranch,
  GraduationCap,
  Layers,
  Terminal,
  BrainCircuit,
  ShieldCheck,
  Mail,
  MapPin,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/social-icons";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { profile, skillGroups, journey } from "@/constants/portfolio";
import { useCatalog } from "@/hooks/use-catalog";
import { api } from "@/services/api";
const skillIcons = [
  Braces,
  Layers,
  Database,
  BrainCircuit,
  GitBranch,
  Terminal,
];
export function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        number="01"
        eyebrow="A LITTLE ABOUT ME"
        title="Engineering ideas into reliable software."
      />
      <div className="about-layout">
        <Reveal className="profile-card">
          <div className="profile-card-grid" />
          <span className="mono profile-id">ENGINEER PROFILE / 001</span>
          <div className="profile-monogram">
            ms<span>.</span>
          </div>
          <div className="profile-caption">
            <strong>Mohamed Samhi</strong>
            <span>Computer Engineering Undergraduate</span>
            <span>
              <MapPin size={13} /> Kinniya, Sri Lanka
            </span>
          </div>
          <div className="profile-corner">&lt;/&gt;</div>
        </Reveal>
        <Reveal className="about-copy">
          <p className="about-lead">
            Curiosity is the starting point.
            <br />
            <span>Engineering is how I take it further.</span>
          </p>
          <p>
            I’m Mohamed Samhi, a BSc. (Hons) Computer Engineering undergraduate
            at the University of Ruhuna. I work at the intersection of
            full-stack development, backend engineering and machine learning.
          </p>
          <p>
            I enjoy turning real-world problems into structured software
            solutions — from healthcare platforms and emergency coordination to
            citizen services and glucose forecasting.
          </p>
          <p>
            Along the way, I’m deepening my understanding of software
            architecture, cloud technologies and DevOps. Always building. Always
            learning.
          </p>
          <a href="#contact" className="text-link">
            Let’s connect <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>
      <div className="about-stats">
        {[
          { value: "04", label: "Projects with purpose" },
          { value: "06", label: "Technology disciplines" },
          { value: "BSc (Hons)", label: "Computer Engineering" },
          { value: "IESL", label: "Student member · S-3388" },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <strong>
              {s.value}
              <span>{i === 0 ? "+" : ""}</span>
            </strong>
            <p>{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export function Skills() {
  const groups = useCatalog(api.skills, skillGroups);
  const [filter, setFilter] = useState("All");
  return (
    <section id="skills" className="section section-tinted">
      <SectionHeading
        number="02"
        eyebrow="THE ENGINEERING TOOLKIT"
        title="The right tools. Thoughtfully applied."
        description="A practical stack for building across the entire software lifecycle."
      />
      <Reveal className="skill-filter">
        <div role="group" aria-label="Filter technology categories">
          {["All", "Backend", "Frontend", "Machine learning", "DevOps"].map(
            (f) => (
              <button
                key={f}
                className={filter === f ? "selected" : ""}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ),
          )}
        </div>
        <span className="mono">NO PERCENTAGES. JUST PRACTICE.</span>
      </Reveal>
      <div className="skill-grid">
        {groups
          .filter((g) => filter === "All" || g.category === filter)
          .map((g) => {
            const Icon = skillIcons[skillGroups.findIndex(item => item.category === g.category)] ?? Braces;
            return (
              <Reveal className="skill-card" key={g.category}>
                <div className="skill-card-top">
                  <Icon size={23} />
                  <span>{g.level}</span>
                </div>
                <h3>{g.category}</h3>
                <div className="tags">
                  {g.technologies.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </Reveal>
            );
          })}
      </div>
      <div className="exploring">
        <span className="mono">ON MY RADAR</span>
        <p>
          System design <i /> Advanced DevOps <i /> Cloud engineering <i />{" "}
          MLOps
        </p>
      </div>
    </section>
  );
}
export function Process() {
  const steps = [
    ["Understand", "Ask the right questions. Define the real problem."],
    ["Architect", "Map the system, data and responsibilities."],
    ["Build", "Develop clear interfaces and reliable services."],
    ["Validate", "Test behavior, edge cases and assumptions."],
    ["Containerize", "Make environments repeatable with Docker."],
    ["Improve", "Deploy, observe and iterate."],
  ];
  return (
    <section className="section process-section">
      <SectionHeading
        number="04"
        eyebrow="HOW I BUILD"
        title="Good software starts before the first line."
      />
      <div className="process-grid">
        {steps.map(([title, description], i) => (
          <Reveal key={title} delay={i * 0.07} className="process-step">
            <span className="process-number">
              0{i + 1}
              <i />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="manifesto">
        <span>Turning complex problems</span>
        <br />
        into <em>simple experiences.</em>
        <span className="manifesto-symbol">↗</span>
      </Reveal>
    </section>
  );
}
export function Journey() {
  const items = useCatalog(api.experience, journey);
  return (
    <section id="experience" className="section journey-section">
      <div className="journey-intro">
        <SectionHeading
          number="05"
          eyebrow="THE ENGINEERING JOURNEY"
          title="Built through experience. Driven by curiosity."
        />
        <p>
          Learning through practical projects, collaborative work and challenges
          that push me to think differently.
        </p>
        <span className="journey-note mono">ACADEMIC & PROJECT EXPERIENCE</span>
      </div>
      <div className="timeline">
        {items.map((item, i) => (
          <Reveal key={item.title} className="timeline-item">
            <span className="timeline-marker">0{i + 1}</span>
            <span className="timeline-org">{item.organization}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export function Education() {
  return (
    <section id="education" className="section section-tinted">
      <SectionHeading
        number="06"
        eyebrow="FOUNDATIONS & COMMUNITY"
        title="An engineering foundation. A wider perspective."
      />
      <div className="education-grid">
        <Reveal className="education-card">
          <div className="education-icon">
            <GraduationCap size={29} />
          </div>
          <span className="eyebrow">ACADEMIC JOURNEY</span>
          <h3>University of Ruhuna</h3>
          <p className="degree">BSc. (Hons) Computer Engineering</p>
          <span className="education-location">Sri Lanka · Undergraduate</span>
          <div className="tags">
            {[
              "Software engineering",
              "Computer engineering",
              "Machine learning",
              "Networking",
              "DevOps",
              "Backend engineering",
              "Database systems",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </Reveal>
        <div className="community-cards">
          <Reveal className="membership-card">
            <ShieldCheck size={26} />
            <span className="eyebrow">PROFESSIONAL MEMBERSHIP</span>
            <h3>
              Institution of Engineers,
              <br />
              Sri Lanka
            </h3>
            <p>IESL Student Member</p>
            <div className="membership-id">
              <span>MEMBERSHIP NO.</span>
              <strong>S-3388</strong>
            </div>
          </Reveal>
          <Reveal className="activities-card">
            <span className="eyebrow">CHALLENGE & COLLABORATION</span>
            <div>
              <strong>IEEE Xtreme</strong>
              <span>Participant</span>
            </div>
            <div>
              <strong>RedCypher Competition</strong>
              <span>Participant</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
export function Code() {
  return (
    <section className="section code-section">
      <Reveal className="code-copy">
        <div className="eyebrow">
          <span>07</span>
          <i /> CODE & COLLABORATION
        </div>
        <h2>
          The work continues
          <br />
          <span>in the repositories.</span>
        </h2>
        <p>
          Explore the code, architecture and decisions behind the projects. Open
          source is where I share what I’m building.
        </p>
        <a
          className="button button-secondary"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={18} /> Explore GitHub <ArrowUpRight size={17} />
        </a>
      </Reveal>
      <Reveal className="repo-panel">
        <a
          className="github-profile"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          <span className="github-avatar">S.</span>
          <div>
            <strong>SamhiAGM</strong>
            <span>github.com/SamhiAGM</span>
          </div>
          <ArrowUpRight size={19} />
        </a>
        <div className="repo-files">
          {[
            "Lankacare",
            "ercs-emergency-resource-coordination-system",
            "GramaLink-LK",
            "personalized-glucose-forecasting",
          ].map((r, i) => (
            <a
              key={r}
              href={`${profile.github}/${r}`}
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch size={15} />
              <span>{r}</span>
              <span className="repo-lang">
                {["Java", "TypeScript", "Software", "Python"][i]}
              </span>
            </a>
          ))}
        </div>
        <a
          className="organization"
          href={profile.organization}
          target="_blank"
          rel="noreferrer"
        >
          <Layers size={20} />
          <div>
            <strong>Gridora Systems</strong>
            <span>Collaborative software ecosystem</span>
          </div>
          <ArrowUpRight size={17} />
        </a>
      </Reveal>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <a href="#home" className="logo">
            SAMHI<span className="logo-dev">.dev</span>
          </a>
          <p>Engineering ideas into software.</p>
        </div>
        <nav aria-label="Footer navigation">
          {["Home", "About", "Projects", "Skills", "Contact"].map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`}>
              {n}
            </a>
          ))}
        </nav>
        <div className="footer-socials">
          <a aria-label="GitHub" href={profile.github}>
            <Github size={19} />
          </a>
          <a aria-label="LinkedIn" href={profile.linkedin}>
            <Linkedin size={19} />
          </a>
          <a aria-label="Email" href={`mailto:${profile.email}`}>
            <Mail size={19} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Designed & engineered by Mohamed Samhi.</span>
        <span>© 2026 Mohamed Samhi. All rights reserved.</span>
        <a href="#home">
          BACK TO TOP <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}
