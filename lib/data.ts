export const site = {
  name: "Omnia Osama",
  role: "Full-Stack WEB Developer",
  email: "anaomnia47@gmail.com",
  location: "Available worldwide",
  headline: "I build digital products that make complex things feel simple.",
  tagline:
    "Full-stack craft across frontend interfaces, backend systems, and the databases that hold it all together.",
  github: "https://github.com/omniaosamamahmood-prog",
  linkedin: "https://www.linkedin.com/in/omnia-osama-6754b3206",
  cvPath:
    "https://drive.google.com/uc?export=download&id=17yYfyT-OG_Q_eUrqw_3tqnNjLXgeARWt",
  photo:
    "https://res.cloudinary.com/dg9o5j2ti/image/upload/v1789241666/1785521259223_oiry4b.jpg",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Journey" },
  { href: "#contact", label: "Contact" },
] as const;

export const skillGroups = [
  {
    label: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "REST APIs"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Vercel", "Postman"],
  },
] as const;

export const projects = [
  {
    number: "01",
    name: "Finova",
    category: "Full Stack",
    type: "Personal Finance Web Application",
    description:
      "Finova is a personal finance application designed to help users track their spending, manage budgets, and turn financial data into clear, actionable insights.",
    stack: ["React", "Node.js", "PostgreSQL", "TypeScript", "Prisma"],
    accent: "#C2185B",
    github: "https://github.com/omniaosamamahmood-prog/Finova",
    demo: "https://finova-app-git-main-omniaa.vercel.app/",
    image: "/projects/finova.png",
    featured: true,
    kind: "app" as const,
  },
  {
    number: "02",
    name: "Yummy",
    category: "Frontend",
    type: "Recipe Discovery Web App",
    description:
      "Yummy is a recipe discovery web app that uses TheMealDB API. Users can search meals by name or first letter, filter by category, area, or ingredient, and open a details page with instructions, ingredients, and video links.",
    stack: ["HTML", "CSS", "Bootstrap", "Vanilla JavaScript", "TheMealDB API"],
    accent: "#C45C26",
    github: "https://github.com/omniaosamamahmood-prog/YUMMY",
    demo: "https://yummy-omniaa.vercel.app",
    image: "/projects/yummy.png",
    kind: "app" as const,
    visual: "yummy" as const,
  },
  {
    number: "03",
    name: "TaskFlow",
    category: "Full Stack",
    type: "Project / Task Management Application",
    description:
      "A personal Kanban workspace for planning work, moving tasks across stages, and seeing progress at a glance — with boards, drag and drop, analytics, and bilingual English/Arabic support.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Mongoose",
      "NextAuth.js",
    ],
    accent: "#3D4A2E",
    github: "https://github.com/omniaosamamahmood-prog/TaskFlow",
    demo: "https://task-flow-omniaa.vercel.app",
    image: "/projects/taskflow.png",
    kind: "app" as const,
    visual: "taskflow" as const,
  },
  {
    number: "04",
    name: "GameHaven API",
    category: "Backend",
    type: "Store Backend / REST API",
    description:
      "GameHaven API is a modular and scalable Node.js + Express backend for an e-commerce platform focused on games.",
    stack: ["Node.js", "Express", "MongoDB", "Mongoose", "dotenv", "morgan", "JWT"],
    accent: "#0A5552",
    github: "https://github.com/omniaosamamahmood-prog/GameHaven-API",
    demo: null,
    kind: "api" as const,
    visual: "api" as const,
  },
] as const;

export const experience = [
  {
    year: "2024 — Now",
    title: "Full-Stack WEB Developer",
    place: "Independent & Collaborative Work",
    detail:
      "Designing and shipping end-to-end web products — from interface systems to API architecture and data models.",
  },
  {
    year: "2023 — 2024",
    title: "Product-Focused Engineering",
    place: "Personal Products & Client Work",
    detail:
      "Building marketplace, finance, and productivity applications with real users and real constraints.",
  },
  {
    year: "Ongoing",
    title: "Continuous Learning",
    place: "Systems, DX & Craft",
    detail:
      "Deepening TypeScript, database design, and product thinking — always sharpening how software feels to use.",
  },
] as const;

export const capabilities = [
  {
    title: "Product Interfaces",
    body: "Interfaces that feel intentional — clear hierarchy, calm interaction, and details that make complex flows feel effortless.",
  },
  {
    title: "Backend Systems",
    body: "APIs and server logic structured for reliability: authentication, business rules, and services that scale with the product.",
  },
  {
    title: "Data Architecture",
    body: "Thoughtful schemas in PostgreSQL and MongoDB — modeling relationships so the product stays fast and coherent as it grows.",
  },
  {
    title: "End-to-End Delivery",
    body: "Taking ideas from concept to deployed product: planning, building, iterating, and shipping with ownership.",
  },
] as const;
