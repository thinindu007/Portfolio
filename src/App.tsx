import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechMatrix from "./components/TechMatrix";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechMatrix />
        <Projects />
        <Timeline />
        <Contact />
      </main>
    </div>
  );
}
