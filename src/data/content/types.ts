/* ------------------------------------------------------------------ */
/* Modelos de domínio — contratos que views/controllers consomem.      */
/* ------------------------------------------------------------------ */

export type Lang = "pt" | "en";

export interface Social {
  label: string;
  href: string;
}

export interface Segment {
  text: string;
  em?: "serif" | "green";
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  posterLine: string;
  year: string;
  variant: "guard" | "erp" | "forza" | "secret";
  link?: string;
  image?: string;
  code?: string[];
}

export interface Xp {
  period: string;
  role: string;
  org: string;
  text: string;
}

export interface StackGroup {
  label: string;
  note?: string;
  items: string[];
}

export interface Degree {
  course: string;
  school: string;
  period: string;
  status: string;
}

export interface Cert {
  name: string;
  issuer: string;
}

export interface HeroContent {
  nameLines: [string, string];
  orbit: string;
  taglinePre: string;
  taglineAmp: string;
  taglinePos: string;
  roleLinePre: string;
  roleLineHL: string;
  roleLinePos: string;
  cycle: string[];
  scrollHint: string;
}

export interface SectionsContent {
  aboutTitle: string;
  worksTitle: string;
  xpTitle: string;
  stackTitle: string;
  eduTitle: string;
}

export interface AboutContent {
  paras: Segment[][];
  footSerif: string;
  rolePre: string;
  roleHL: string;
  rolePos: string;
}

export interface ShowcaseContent {
  kicker: string;
  copyPre: string;
  copyHL: string;
  copyPos: string;
  cta: string;
}

export interface EducationContent {
  degrees: Degree[];
  certsTitle: string;
  certs: Cert[];
}

export interface ContactContent {
  titleA: string;
  titleB: string;
  toTop: string;
  localCity: string;
}

export interface MiscContent {
  view: string;
  menuCity: string;
}

export interface PreloaderContent {
  name: string;
  sub: string;
}

export interface Content {
  nav: { links: { id: string; label: string }[] };
  hero: HeroContent;
  sections: SectionsContent;
  about: AboutContent;
  projects: Project[];
  showcase: ShowcaseContent;
  experience: Xp[];
  stack: StackGroup[];
  marquee: string[];
  education: EducationContent;
  contact: ContactContent;
  misc: MiscContent;
  preloader: PreloaderContent;
}

export const EMAIL = "thiagofsprofissional@gmail.com";

export const SOCIALS: Social[] = [
  { label: "GitHub", href: "https://github.com/th1agx" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thiagofilipeantunes" },
];
