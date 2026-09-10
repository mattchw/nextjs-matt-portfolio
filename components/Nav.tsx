"use client";

import { useEffect, useState } from "react";
import { NAV_SECTIONS, type SectionId } from "@/lib/sections";
import styles from "./Nav.module.css";

export function Nav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<SectionId | undefined>();

  useEffect(() => {
    const hero = document.getElementById("hero");
    const sections = NAV_SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    const heroObserver = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.35 },
    );
    if (hero) {
      heroObserver.observe(hero);
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const next = visibleEntries[0]?.target.id as SectionId | undefined;
        if (next) {
          setActive(next);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <nav
      className={`${styles.nav} ${visible ? styles.navVisible : ""}`}
      aria-label="Section"
    >
      {NAV_SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          className={`${styles.link} ${active === section.id ? styles.linkActive : ""}`}
          aria-current={active === section.id ? "true" : undefined}
          onClick={() => scrollTo(section.id)}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}
