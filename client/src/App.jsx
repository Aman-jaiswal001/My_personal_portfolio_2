import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Education from "./components/Education.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Achievements from "./components/Achievements.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
// import { apiUrl } from './utils/api.js';
import api from "./api/axios.js";

const sections = [
  "home",
  "about",
  "education",
  "skills",
  "projects",
  "achievements",
  "contact",
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [visibleSections, setVisibleSections] = useState(
    () => new Set(["home"]),
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(
    () => window.location.hash === "#admin",
  );
  const [savedProjects, setSavedProjects] = useState([]);
  const [savedAchievements, setSavedAchievements] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const nextVisible = new Set();
      let current = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const top = window.scrollY;
        const offset = section.offsetTop - 100;
        const height = section.offsetHeight;

        if (top >= offset && top < offset + height) {
          current = id;
          nextVisible.add(id);
        }
      });

      if (window.scrollY < 100) {
        nextVisible.add("home");
      }

      setActiveSection(current);
      setVisibleSections(nextVisible);
      setIsSticky(window.scrollY > 100);
      setIsMenuOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadSavedContent = async () => {
      try {
        const [projectResponse, achievementResponse] = await Promise.all([
          api.get("/api/projects"),
          api.get("/api/achievements"),
        ]);

        setSavedProjects(projectResponse.data);
        setSavedAchievements(achievementResponse.data);
      } catch (error) {
        console.error("Error loading saved content:", error);
      }
    };

    loadSavedContent();
  }, []);

  useEffect(() => {
    const handleHashChange = () =>
      setIsAdminOpen(window.location.hash === "#admin");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleContentAdded = (type, item) => {
    if (type === "project") setSavedProjects((items) => [item, ...items]);
    if (type === "achievement")
      setSavedAchievements((items) => [item, ...items]);
  };

  const handleContentDeleted = (type, id) => {
    if (type === "project")
      setSavedProjects((items) => items.filter((item) => item._id !== id));
    if (type === "achievement")
      setSavedAchievements((items) => items.filter((item) => item._id !== id));
  };

  const visible = useMemo(() => visibleSections, [visibleSections]);

  return (
    <>
      <Header
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        isSticky={isSticky}
        onToggleMenu={() => setIsMenuOpen((open) => !open)}
        onCloseMenu={() => setIsMenuOpen(false)}
      />
      <Home isVisible={visible.has("home")} />
      <About isVisible={visible.has("about")} />
      <Education isVisible={visible.has("education")} />
      <Skills isVisible={visible.has("skills")} />
      <Projects
        isVisible={visible.has("projects")}
        savedProjects={savedProjects}
      />
      <Achievements
        isVisible={visible.has("achievements")}
        savedAchievements={savedAchievements}
      />
      <Contact isVisible={visible.has("contact")} />
      <Footer />
      {isAdminOpen ? (
        <AdminPanel
          onClose={() => {
            window.location.hash = "";
            setIsAdminOpen(false);
          }}
          onContentAdded={handleContentAdded}
          onContentDeleted={handleContentDeleted}
        />
      ) : null}
    </>
  );
}
