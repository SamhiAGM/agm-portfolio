"use client";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowUpRight,
  X,
  HeartPulse,
  Activity,
  Users,
  CalendarDays,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  FileText,
  BrainCircuit,
  Check,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Github } from "@/components/ui/social-icons";
import { projects as initialProjects } from "@/constants/portfolio";
import { api } from "@/services/api";
import type { Project } from "@/types/portfolio";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
export function Projects() {
  const [projects, setProjects] = useState(initialProjects),
    [selected, setSelected] = useState<Project | null>(null),
    [filter, setFilter] = useState("All work"),
    [apiFailed, setApiFailed] = useState(false),
    [loading, setLoading] = useState(false);
  async function refresh() {
    setLoading(true);
    try {
      const data = await api.projects();
      if (data.length) setProjects(data);
      setApiFailed(false);
    } catch {
      setApiFailed(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void refresh();
  }, []);
  const filtered = projects.filter(
    (p) =>
      filter === "All work" ||
      (filter === "Machine learning"
        ? p.slug === "glucose-forecasting"
        : p.slug !== "glucose-forecasting"),
  );
  return (
    <section id="projects" className="section projects-section">
      <div className="projects-heading">
        <SectionHeading
          number="03"
          eyebrow="SELECTED WORK"
          title="Real problems. Purposeful solutions."
          description="A selection of what I’ve been building — across software, systems and intelligence."
        />
        <a
          className="text-link"
          href="https://github.com/SamhiAGM"
          target="_blank"
          rel="noreferrer"
        >
          All repositories <ArrowUpRight size={16} />
        </a>
      </div>
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {["All work", "Software engineering", "Machine learning"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={filter === f ? "selected" : ""}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="project-list">
        {filtered.map((project, i) => (
          <Reveal
            key={project.slug}
            className={`project-card project-${project.color} ${i % 2 ? "reverse" : ""}`}
            onPointerMove={(event) => {
              if (event.pointerType !== "mouse") return;
              const box = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty(
                "--card-x",
                `${event.clientX - box.left}px`,
              );
              event.currentTarget.style.setProperty(
                "--card-y",
                `${event.clientY - box.top}px`,
              );
            }}
          >
            <button
              className="project-preview-button"
              aria-label={`View ${project.title} case study`}
              onClick={() => setSelected(project)}
              data-cursor="view"
            >
              <ProjectPreview project={project} />
              <span className="preview-open">
                Explore case study <ArrowUpRight size={17} />
              </span>
            </button>
            <div className="project-content">
              <span className="project-category">
                <span>
                  0
                  {initialProjects.findIndex((p) => p.slug === project.slug) +
                    1}
                </span>{" "}
                {project.category}
              </span>
              <h3>{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-description">{project.shortDescription}</p>
              <div className="tags">
                {project.technologies.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="project-actions">
                <button
                  onClick={() => setSelected(project)}
                  className="text-link"
                >
                  View case study <ArrowUpRight size={17} />
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-github"
                  aria-label={`${project.title} on GitHub`}
                >
                  <Github size={18} /> Source code
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {!filtered.length && <p>No projects in this category yet.</p>}
      {apiFailed && (
        <div className="api-note">
          <span>Showing the curated project collection.</span>
          <button onClick={() => void refresh()} disabled={loading}>
            <RefreshCw size={12} className={loading ? "spin" : ""} />
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      )}
      <Dialog.Root
        open={!!selected}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="case-study">
            <Dialog.Close
              className="dialog-close"
              aria-label="Close case study"
            >
              <X />
            </Dialog.Close>
            {selected && (
              <>
                <span className="eyebrow">
                  PROJECT CASE STUDY · {selected.status}
                </span>
                <Dialog.Title>{selected.title}</Dialog.Title>
                <Dialog.Description>
                  {selected.shortDescription}
                </Dialog.Description>
                <div className="tags">
                  {selected.technologies.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="case-study-body">
                  {[
                    ["The problem", selected.problem],
                    ["The proposed solution", selected.solution],
                  ].map(([heading, text]) => (
                    <div key={heading}>
                      <h3>{heading}</h3>
                      <p>{text}</p>
                    </div>
                  ))}
                  <div>
                    <h3>System architecture</h3>
                    <div className="architecture-pipeline">
                      {selected.architecture.map((step, i) => (
                        <span key={step}>
                          <b>0{i + 1}</b>
                          {step}
                          <ChevronRight size={14} />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3>Core features</h3>
                    <ul className="feature-list">
                      {selected.features.map((f) => (
                        <li key={f}>
                          <Check size={15} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>Engineering challenges</h3>
                    <p>{selected.challenges}</p>
                  </div>
                  <div>
                    <h3>Implementation & contribution</h3>
                    <p>{selected.contribution}</p>
                  </div>
                  <div>
                    <h3>Future improvements</h3>
                    <p>{selected.improvements}</p>
                  </div>
                </div>
                <a
                  className="button button-primary"
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} /> Explore the repository{" "}
                  <ArrowUpRight size={16} />
                </a>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
function ProjectPreview({ project }: { project: Project }) {
  const isCare = project.slug === "lankacare",
    isEmergency = project.slug === "ercs",
    isCivic = project.slug === "gramalink-lk";
  return (
    <div className={`project-preview ${project.color}`}>
      <div className="mockup-browser">
        <div className="browser-toolbar">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <span>
            {isCare
              ? "LankaCare"
              : isEmergency
                ? "ERCS"
                : isCivic
                  ? "GramaLink LK"
                  : "Glucose forecasting"}{" "}
            / concept preview
          </span>
          <ShieldCheck size={12} />
        </div>
        <div className="mockup-body">
          {isCare ? (
            <>
              <div className="mockup-sidebar">
                <HeartPulse size={24} />
                <i />
                <CalendarDays size={16} />
                <FileText size={16} />
                <Users size={16} />
              </div>
              <div className="mockup-dashboard">
                <span className="mockup-eyebrow">YOUR HEALTH, CONNECTED</span>
                <h4>
                  Care that’s always
                  <br />
                  within reach.
                </h4>
                <div className="health-metrics">
                  <div>
                    <HeartPulse size={18} />
                    <span>Health wallet</span>
                    <strong>One secure place</strong>
                  </div>
                  <div>
                    <CalendarDays size={18} />
                    <span>Appointments</span>
                    <strong>Care on your terms</strong>
                  </div>
                </div>
                <div className="mockup-bottom-card">
                  <div>
                    <span className="medical-avatar">+</span>
                    <strong>Your healthcare journey</strong>
                  </div>
                  <div className="mockup-lines">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            </>
          ) : isEmergency ? (
            <>
              <div className="mockup-dashboard emergency-dashboard">
                <div className="mockup-header">
                  <span>
                    <Activity size={19} /> ERCS
                  </span>
                  <span className="mockup-live">OPERATIONS VIEW</span>
                </div>
                <h4>
                  Coordinated response.
                  <br />
                  Shared awareness.
                </h4>
                <div className="emergency-map">
                  <div className="map-road road-a" />
                  <div className="map-road road-b" />
                  <div className="map-road road-c" />
                  <span className="map-pin pin-a">
                    <MapPin size={21} />
                  </span>
                  <span className="map-pin pin-b">
                    <MapPin size={17} />
                  </span>
                  <span className="map-pin pin-c">
                    <MapPin size={17} />
                  </span>
                  <span className="map-legend">
                    <AlertTriangle size={13} /> Incident coordination
                  </span>
                </div>
                <div className="mockup-small-tags">
                  <span>Incidents</span>
                  <span>Resources</span>
                  <span>Response teams</span>
                </div>
              </div>
            </>
          ) : isCivic ? (
            <>
              <div className="mockup-dashboard civic-dashboard">
                <div className="mockup-header">
                  <span>
                    <Users size={20} /> GramaLink
                    <span className="civic-lk">LK</span>
                  </span>
                  <ShieldCheck size={17} />
                </div>
                <span className="mockup-eyebrow">
                  CITIZEN SERVICES, SIMPLIFIED
                </span>
                <h4>
                  A closer connection.
                  <br />A simpler experience.
                </h4>
                <div className="civic-cards">
                  {[
                    [FileText, "Digital services"],
                    [Users, "Citizen connections"],
                    [ShieldCheck, "Administration"],
                  ].map(([Icon, text]) => {
                    const I = Icon as typeof FileText;
                    return (
                      <div key={String(text)}>
                        <I size={22} />
                        <span>{String(text)}</span>
                        <ArrowUpRight size={13} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="mockup-dashboard glucose-dashboard">
              <div className="mockup-header">
                <span>
                  <BrainCircuit size={20} /> GLUCOSE / ML
                </span>
                <span className="mockup-live">30 MIN HORIZON</span>
              </div>
              <h4>Ahead of the curve.</h4>
              <span className="chart-caption">
                Illustrative forecasting workflow
              </span>
              <svg
                className="glucose-chart"
                viewBox="0 0 400 120"
                role="img"
                aria-label="Illustrative glucose forecast line; not measured results"
              >
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d98be9" stopOpacity=".22" />
                    <stop offset="100%" stopColor="#d98be9" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 50, 80, 110].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="400"
                    y2={y}
                    stroke="#ffffff0d"
                  />
                ))}
                <path
                  d="M0 88 Q35 100 65 63 T130 45 T200 68 T260 43 L260 120 L0 120Z"
                  fill="url(#chartFill)"
                />
                <path
                  d="M0 88 Q35 100 65 63 T130 45 T200 68 T260 43"
                  fill="none"
                  stroke="#d98be9"
                  strokeWidth="2.5"
                />
                <path
                  d="M260 43 Q300 5 330 30 T400 65"
                  fill="none"
                  stroke="#c2a0ff"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                />
                <line
                  x1="260"
                  y1="0"
                  x2="260"
                  y2="120"
                  stroke="#ffffff30"
                  strokeDasharray="3 4"
                />
              </svg>
              <div className="ml-pipeline">
                {["Data", "Features", "Train", "Predict"].map((step, i) => (
                  <span key={step}>
                    <i>0{i + 1}</i>
                    {step}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <span className="preview-caption">
        INTERFACE CONCEPT ·{" "}
        {project.slug === "glucose-forecasting"
          ? "NOT CLINICAL RESULTS"
          : "PORTFOLIO VISUALIZATION"}
      </span>
    </div>
  );
}
