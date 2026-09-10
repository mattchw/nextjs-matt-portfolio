export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "project", label: "Project" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof NAV_SECTIONS)[number]["id"];
