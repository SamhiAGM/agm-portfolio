import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import {
  About,
  Skills,
  Process,
  Journey,
  Education,
  Code,
  Footer,
} from "@/components/sections/content";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { ExperienceEffects } from "@/components/experience-effects";
export default function Home() {
  return (
    <>
      <ExperienceEffects />
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Journey />
        <Education />
        <Code />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
