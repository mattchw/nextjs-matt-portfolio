"use client";

import { Nav } from "./Nav";
import { ThemeToggle } from "./ThemeToggle";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Nav />
      <ThemeToggle />
      <main id="main">{children}</main>
    </>
  );
}
