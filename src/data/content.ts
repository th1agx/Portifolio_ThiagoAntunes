/* ------------------------------------------------------------------ */
/* Conteúdo único do site — tudo que é texto/dado vive aqui.           */
/* Editar o portfólio = editar este arquivo.                           */
/* ------------------------------------------------------------------ */

export const EMAIL = "thiagofsprofissional@gmail.com";

export interface Social {
  label: string;
  href: string;
}

export const SOCIALS: Social[] = [
  { label: "GitHub", href: "https://github.com/th1agx" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thiagofilipeantunes" },
];

/* ------------------------------ SOBRE ------------------------------ */

export interface Segment {
  text: string;
  em?: "serif" | "green";
}

export const ABOUT_PARAS: Segment[][] = [
  [
    { text: "Engenheiro de software no 3D Lab, em Belo Horizonte — construo features fullstack para sistemas ERP com" },
    { text: " JavaScript, PHP, Laravel, Python e SQL", em: "serif" },
    { text: ", do schema do banco à interface que o usuário toca." },
  ],
  [
    { text: "Meu diferencial é a" },
    { text: " IA generativa", em: "serif" },
    { text: " aplicada ao processo real de desenvolvimento: LLMs, agentes e prompt engineering para análise de código, automações e produtividade com" },
    { text: " evidência", em: "green" },
    { text: " — não com achismo." },
  ],
  [
    { text: "A base é sólida e a curva é de subida: tecnólogo em Análise e Desenvolvimento concluído, Engenharia de Software em curso, e certificações em" },
    { text: " IA, Python, QA e SQL", em: "serif" },
    { text: " — estudo é parte do trabalho." },
  ],
];

/* --------------------------- TRABALHOS ----------------------------- */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  posterLine: string;
  year: string;
  variant: "guard" | "erp" | "forza" | "secret";
  link?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "dev-guard",
    title: "Dev Guard Skill",
    subtitle: "disciplina de desenvolvimento para agentes de IA",
    description:
      "Uma skill de disciplina para agentes de IA: SDD, planejamento, testes, smoke & stress tests e entrega baseada em evidências.",
    posterLine: "entrega com evidência",
    year: "2026",
    variant: "guard",
    link: "https://github.com/th1agx/devguard-skill",
  },
  {
    id: "erp-3dlab",
    title: "ERP 3D Lab",
    subtitle: "features fullstack para sistema interno",
    description:
      "Arquitetura e implementação de features no ERP interno — JavaScript, PHP, Laravel, Python, bancos de dados e integrações via API.",
    posterLine: "sistema vivo",
    year: "desde 2026",
    variant: "erp",
  },
  {
    id: "fh5-autodrive",
    title: "FH5 Auto Drive",
    subtitle: "automação em Python",
    description:
      "Automação que conduz veículos no Forza Horizon 5 em trajetos contínuos, acumulando XP sem intervenção humana.",
    posterLine: "full throttle",
    year: "2025",
    variant: "forza",
    link: "https://github.com/th1agx/Python---Forza-Horizon-5-Auto-Drive-XP-Farm.",
  },
  {
    id: "numero-secreto",
    title: "Número Secreto",
    subtitle: "jogo interativo em JavaScript",
    description:
      "Jogo de adivinhação com número secreto aleatório — lógica de estado, feedback em tempo real e detalhe de interface.",
    posterLine: "adivinhe se puder",
    year: "2024",
    variant: "secret",
    link: "https://github.com/th1agx/Projeto-Jogo-do-Numero-Secreto",
  },
];

/* --------------------------- EXPERIÊNCIA --------------------------- */

export interface Xp {
  period: string;
  role: string;
  org: string;
  text: string;
  music?: boolean;
}

export const EXPERIENCE: Xp[] = [
  {
    period: "desde 06.2026",
    role: "Engenheiro de Software Júnior",
    org: "3D Lab — Belo Horizonte",
    text: "Desenvolvo módulos do ERP interno: arquiteto, planejo e implemento features fullstack, do banco de dados à interface. IA generativa, LLMs, agentes e prompt engineering fazem parte do processo real — análise de código, automações e ganho de produtividade com evidência. No dia a dia: JavaScript, PHP, Laravel, Python e SQL, com integrações via API.",
  },
  {
    period: "03 — 06.2026",
    role: "Estagiário de Tecnologia e Processos",
    org: "3D Lab — Belo Horizonte",
    text: "Módulos do ERP com JavaScript, noções de Nest.js e Next.js, e PHP em integrações internas. GenAI e agentes (Claude Code) para análise de código, scripts e otimização de fluxos.",
  },
];

/* ------------------------------ STACK ------------------------------ */

export interface StackGroup {
  label: string;
  note?: string;
  items: string[];
}

export const STACK_GROUPS: StackGroup[] = [
  { label: "na base web", items: ["HTML", "CSS", "JavaScript", "Next.js"] },
  { label: "no backend", items: ["PHP", "Laravel", "Node.js", "Nest.js", "Python"] },
  { label: "nos dados", items: ["SQL", "modelagem de dados", "APIs REST"] },
  {
    label: "com IA",
    items: ["GenAI", "LLMs", "agentes", "prompt engineering", "Claude Code", "Codex"],
  },
  { label: "no processo", items: ["Git", "GitHub", "Kanban", "QA & testes"] },
  {
    label: "neste site",
    note: "construído à mão, sem template",
    items: ["React", "TypeScript", "Motion", "Vite", "Lenis"],
  },
];

export const MARQUEE_ITEMS = [
  "javascript",
  "python",
  "php",
  "laravel",
  "sql",
  "nest.js",
  "next.js",
  "genai",
  "llms",
  "agentes de ia",
  "prompt engineering",
  "automação",
];

/* ---------------------------- FORMAÇÃO ----------------------------- */

export interface Degree {
  course: string;
  school: string;
  period: string;
  status: string;
}

export const DEGREES: Degree[] = [
  {
    course: "Engenharia de Software",
    school: "Estácio",
    period: "2025 — cursando",
    status: "em curso",
  },
  {
    course: "Análise e Desenvolvimento de Sistemas",
    school: "Estácio",
    period: "2022 — 2024",
    status: "concluído",
  },
];

export const CERTS: { name: string; issuer: string }[] = [
  { name: "Introduction to AI", issuer: "Google" },
  { name: "Revelando o poder dos Agentes de IA", issuer: "IBM" },
  { name: "Python 2026: do Básico ao Avançado", issuer: "Udemy" },
  { name: "Desenvolvimento Rápido de Aplicações em Python", issuer: "Estácio" },
  { name: "Git e GitHub", issuer: "Alura" },
  { name: "Mergulhe em programação com JavaScript", issuer: "Alura" },
  { name: "Quality Assurance: plano de testes e gestão de bugs", issuer: "Alura" },
  { name: "Banco de Dados e SQL", issuer: "AlgaWorks" },
  { name: "Programação de Algoritmos Escaláveis", issuer: "Estácio" },
];
