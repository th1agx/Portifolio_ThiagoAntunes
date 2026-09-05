/* ------------------------------------------------------------------ */
/* Conteúdo bilíngue do site — tudo que é texto/dado vive aqui.         */
/* Editar o portfólio = editar este arquivo.                            */
/* ------------------------------------------------------------------ */

export type Lang = "pt" | "en";

export const EMAIL = "thiagofsprofissional@gmail.com";

export interface Social {
  label: string;
  href: string;
}

export const SOCIALS: Social[] = [
  { label: "GitHub", href: "https://github.com/th1agx" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thiagofilipeantunes" },
];

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

export interface Content {
  nav: { links: { id: string; label: string }[] };
  hero: {
    nameLines: [string, string];
    taglinePre: string;
    taglineAmp: string;
    taglinePos: string;
    roleLinePre: string;
    roleLineHL: string;
    roleLinePos: string;
    cycle: string[];
    scrollHint: string;
  };
  sections: {
    aboutTitle: string;
    worksTitle: string;
    xpTitle: string;
    stackTitle: string;
    eduTitle: string;
  };
  about: {
    paras: Segment[][];
    footSerif: string;
    rolePre: string;
    roleHL: string;
    rolePos: string;
  };
  projects: Project[];
  showcase: { kicker: string; copyPre: string; copyHL: string; copyPos: string; cta: string };
  experience: Xp[];
  stack: StackGroup[];
  marquee: string[];
  education: { degrees: Degree[]; certsTitle: string; certs: Cert[] };
  contact: { titleA: string; titleB: string; toTop: string; localCity: string };
  misc: { view: string; menuCity: string };
  preloader: { name: string; sub: string };
}

export const CONTENT: Record<Lang, Content> = {
  pt: {
    nav: {
      links: [
        { id: "#sobre", label: "Sobre" },
        { id: "#trabalhos", label: "Trabalhos" },
        { id: "#experiencia", label: "Experiência" },
        { id: "#stack", label: "Arsenal" },
        { id: "#contato", label: "Contato" },
      ],
    },
    hero: {
      nameLines: ["Thiago", "Antunes"],
      taglinePre: "engenharia de software",
      taglineAmp: "&",
      taglinePos: "interfaces vivas",
      roleLinePre: "Engenheiro de software júnior no",
      roleLineHL: "3D Lab",
      roleLinePos: "— fullstack, IA generativa e movimento por toda interface.",
      cycle: [
        "desenvolvimento fullstack",
        "IA generativa & agentes",
        "ERP & sistemas web",
        "prompt engineering",
        "automações & scripts",
      ],
      scrollHint: "role para conhecer",
    },
    sections: {
      aboutTitle: "Além do código",
      worksTitle: "Trabalhos",
      xpTitle: "Trajetória",
      stackTitle: "Arsenal",
      eduTitle: "Formação",
    },
    about: {
      paras: [
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
      ],
      footSerif: "quatro anos construindo software — e a curva só sobe.",
      rolePre: "Engenheiro de Software Júnior —",
      roleHL: "3D Lab",
      rolePos: ", desde 06.2026",
    },
    projects: [
      {
        id: "dev-guard",
        title: "Dev Guard Skill",
        subtitle: "disciplina de desenvolvimento para agentes de IA",
        posterLine: "entrega com evidência",
        year: "2026",
        variant: "guard",
        link: "https://github.com/th1agx/devguard-skill",
      },
      {
        id: "erp-3dlab",
        title: "ERP 3D Lab",
        subtitle: "features fullstack para sistema interno",
        posterLine: "sistema vivo",
        year: "desde 2026",
        variant: "erp",
      },
      {
        id: "fh5-autodrive",
        title: "FH5 Auto Drive",
        subtitle: "automação em Python",
        posterLine: "full throttle",
        year: "2025",
        variant: "forza",
        link: "https://github.com/th1agx/Python---Forza-Horizon-5-Auto-Drive-XP-Farm.",
      },
      {
        id: "numero-secreto",
        title: "Número Secreto",
        subtitle: "jogo interativo em JavaScript",
        posterLine: "adivinhe se puder",
        year: "2024",
        variant: "secret",
        link: "https://github.com/th1agx/Projeto-Jogo-do-Numero-Secreto",
      },
    ],
    showcase: {
      kicker: "o destaque",
      copyPre:
        "Uma skill de disciplina de desenvolvimento para agentes de IA: SDD, planejamento, testes, smoke & stress tests e entrega baseada em evidências.",
      copyHL: "IA com método",
      copyPos: " — não com achismo.",
      cta: "ver no github",
    },
    experience: [
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
    ],
    stack: [
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
    ],
    marquee: [
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
    ],
    education: {
      degrees: [
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
      ],
      certsTitle: "pelo caminho, certifiquei-me em",
      certs: [
        { name: "Introduction to AI", issuer: "Google" },
        { name: "Revelando o poder dos Agentes de IA", issuer: "IBM" },
        { name: "Python 2026: do Básico ao Avançado", issuer: "Udemy" },
        { name: "Desenvolvimento Rápido de Aplicações em Python", issuer: "Estácio" },
        { name: "Git e GitHub", issuer: "Alura" },
        { name: "Mergulhe em programação com JavaScript", issuer: "Alura" },
        { name: "Quality Assurance: plano de testes e gestão de bugs", issuer: "Alura" },
        { name: "Banco de Dados e SQL", issuer: "AlgaWorks" },
        { name: "Programação de Algoritmos Escaláveis", issuer: "Estácio" },
      ],
    },
    contact: {
      titleA: "Bora construir",
      titleB: "algo grande?",
      toTop: "voltar ao topo",
      localCity: "em BH",
    },
    misc: { view: "ver", menuCity: "Belo Horizonte — MG" },
    preloader: {
      name: "Thiago Antunes",
      sub: "engenharia de software & interfaces vivas",
    },
  },

  en: {
    nav: {
      links: [
        { id: "#sobre", label: "About" },
        { id: "#trabalhos", label: "Work" },
        { id: "#experiencia", label: "Experience" },
        { id: "#stack", label: "Arsenal" },
        { id: "#contato", label: "Contact" },
      ],
    },
    hero: {
      nameLines: ["Thiago", "Antunes"],
      taglinePre: "software engineering",
      taglineAmp: "&",
      taglinePos: "living interfaces",
      roleLinePre: "Junior software engineer at",
      roleLineHL: "3D Lab",
      roleLinePos: "— fullstack, generative AI and motion across every interface.",
      cycle: [
        "fullstack development",
        "generative AI & agents",
        "ERP & web systems",
        "prompt engineering",
        "automation & scripts",
      ],
      scrollHint: "scroll to explore",
    },
    sections: {
      aboutTitle: "Beyond the code",
      worksTitle: "Work",
      xpTitle: "Journey",
      stackTitle: "Arsenal",
      eduTitle: "Education",
    },
    about: {
      paras: [
        [
          { text: "Software engineer at 3D Lab, in Belo Horizonte — I build fullstack features for ERP systems with" },
          { text: " JavaScript, PHP, Laravel, Python and SQL", em: "serif" },
          { text: ", from the database schema to the interface the user touches." },
        ],
        [
          { text: "My edge is" },
          { text: " generative AI", em: "serif" },
          { text: " applied to the real development process: LLMs, agents and prompt engineering for code analysis, automation and productivity backed by" },
          { text: " evidence", em: "green" },
          { text: " — not guesswork." },
        ],
        [
          { text: "The foundation is solid and the curve points up: an associate degree in Systems Analysis & Development completed, Software Engineering in progress, and certifications in" },
          { text: " AI, Python, QA and SQL", em: "serif" },
          { text: " — studying is part of the job." },
        ],
      ],
      footSerif: "four years building software — and the curve only goes up.",
      rolePre: "Junior Software Engineer —",
      roleHL: "3D Lab",
      rolePos: ", since 06.2026",
    },
    projects: [
      {
        id: "dev-guard",
        title: "Dev Guard Skill",
        subtitle: "development discipline for AI agents",
        posterLine: "evidence-driven delivery",
        year: "2026",
        variant: "guard",
        link: "https://github.com/th1agx/devguard-skill",
      },
      {
        id: "erp-3dlab",
        title: "ERP 3D Lab",
        subtitle: "fullstack features for an internal system",
        posterLine: "a living system",
        year: "since 2026",
        variant: "erp",
      },
      {
        id: "fh5-autodrive",
        title: "FH5 Auto Drive",
        subtitle: "Python automation",
        posterLine: "full throttle",
        year: "2025",
        variant: "forza",
        link: "https://github.com/th1agx/Python---Forza-Horizon-5-Auto-Drive-XP-Farm.",
      },
      {
        id: "numero-secreto",
        title: "Secret Number",
        subtitle: "interactive JavaScript game",
        posterLine: "guess if you can",
        year: "2024",
        variant: "secret",
        link: "https://github.com/th1agx/Projeto-Jogo-do-Numero-Secreto",
      },
    ],
    showcase: {
      kicker: "featured",
      copyPre:
        "A discipline skill for AI agents: SDD, planning, tests, smoke & stress tests and evidence-based delivery.",
      copyHL: "AI with method",
      copyPos: " — not guesswork.",
      cta: "view on github",
    },
    experience: [
      {
        period: "since 06.2026",
        role: "Junior Software Engineer",
        org: "3D Lab — Belo Horizonte",
        text: "I build modules of the internal ERP: architecting, planning and implementing fullstack features, from database to interface. Generative AI, LLMs, agents and prompt engineering are part of the real process — code analysis, automation and productivity gains backed by evidence. Day to day: JavaScript, PHP, Laravel, Python and SQL, with API integrations.",
      },
      {
        period: "03 — 06.2026",
        role: "Technology & Processes Intern",
        org: "3D Lab — Belo Horizonte",
        text: "ERP modules with JavaScript, working knowledge of Nest.js and Next.js, and PHP in internal integrations. GenAI and agents (Claude Code) for code analysis, scripts and workflow optimization.",
      },
    ],
    stack: [
      { label: "on the web base", items: ["HTML", "CSS", "JavaScript", "Next.js"] },
      { label: "on the backend", items: ["PHP", "Laravel", "Node.js", "Nest.js", "Python"] },
      { label: "on data", items: ["SQL", "data modeling", "REST APIs"] },
      {
        label: "with AI",
        items: ["GenAI", "LLMs", "agents", "prompt engineering", "Claude Code", "Codex"],
      },
      { label: "on process", items: ["Git", "GitHub", "Kanban", "QA & testing"] },
      {
        label: "on this site",
        note: "hand-built, no template",
        items: ["React", "TypeScript", "Motion", "Vite", "Lenis"],
      },
    ],
    marquee: [
      "javascript",
      "python",
      "php",
      "laravel",
      "sql",
      "nest.js",
      "next.js",
      "genai",
      "llms",
      "ai agents",
      "prompt engineering",
      "automation",
    ],
    education: {
      degrees: [
        {
          course: "Software Engineering",
          school: "Estácio",
          period: "2025 — in progress",
          status: "ongoing",
        },
        {
          course: "Systems Analysis & Development",
          school: "Estácio",
          period: "2022 — 2024",
          status: "completed",
        },
      ],
      certsTitle: "along the way, I got certified in",
      certs: [
        { name: "Introduction to AI", issuer: "Google" },
        { name: "Unlocking the Power of AI Agents", issuer: "IBM" },
        { name: "Python 2026: from Basic to Advanced", issuer: "Udemy" },
        { name: "Rapid Application Development in Python", issuer: "Estácio" },
        { name: "Git and GitHub", issuer: "Alura" },
        { name: "Dive into JavaScript Programming", issuer: "Alura" },
        { name: "Quality Assurance: test plans & bug management", issuer: "Alura" },
        { name: "Databases and SQL", issuer: "AlgaWorks" },
        { name: "Scalable Algorithms Programming", issuer: "Estácio" },
      ],
    },
    contact: {
      titleA: "Let's build",
      titleB: "something big?",
      toTop: "back to top",
      localCity: "in BH",
    },
    misc: { view: "view", menuCity: "Belo Horizonte — Brazil" },
    preloader: {
      name: "Thiago Antunes",
      sub: "software engineering & living interfaces",
    },
  },
};
