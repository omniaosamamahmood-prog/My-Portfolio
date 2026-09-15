<div align="center">

# Omnia Osama

**Full-Stack WEB Developer**

Building digital products that feel simple — across frontend, backend, and databases.

<br />

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/omniaosamamahmood-prog)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/omnia-osama-6754b3206)
[![Email](https://img.shields.io/badge/Email-0D6E6A?style=for-the-badge&logo=gmail&logoColor=white)](mailto:anaomnia47@gmail.com)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## Overview

Personal portfolio for **Omnia Osama** — a light editorial, single-page experience that presents selected work, technical skills, career journey, and a contact form.

Built for clarity and product craft: interfaces, APIs, and data modeled as one system.

---

## Tech stack

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Motion-FF0055?style=flat-square&logo=framer&logoColor=white" alt="Motion" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
</p>

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Animation | Motion |
| Icons | Lucide · react-icons |
| Language | TypeScript |
| Contact | FormSubmit (`/api/contact`) |

---

## Features

| | Feature |
| --- | --- |
| <img src="https://img.shields.io/badge/-Intro-0D6E6A?style=flat-square" alt="" /> | Cinematic intro loader with `prefers-reduced-motion` support |
| <img src="https://img.shields.io/badge/-Hero-0D6E6A?style=flat-square" alt="" /> | Editorial hero, brand wordmark, role emphasis, portrait ecosystem |
| <img src="https://img.shields.io/badge/-Work-0D6E6A?style=flat-square" alt="" /> | Selected projects grid with live demos and GitHub links |
| <img src="https://img.shields.io/badge/-Skills-0D6E6A?style=flat-square" alt="" /> | Tabbed tech stack across frontend, backend, databases, and tools |
| <img src="https://img.shields.io/badge/-Journey-0D6E6A?style=flat-square" alt="" /> | Career timeline with clear milestones |
| <img src="https://img.shields.io/badge/-Contact-0D6E6A?style=flat-square" alt="" /> | Validated form, honeypot spam filter, email delivery |
| <img src="https://img.shields.io/badge/-A11y-0D6E6A?style=flat-square" alt="" /> | Focus states, labeled social icons, responsive layout |

---

## Getting started

### Prerequisites

- Node.js **20+**
- npm

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**

### Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Project structure

```text
omnia-portfolio/
├── app/
│   ├── page.tsx                 # Section composition
│   ├── layout.tsx               # Root layout, fonts, metadata
│   ├── globals.css              # Design tokens & global styles
│   └── api/contact/route.ts     # Contact API → FormSubmit
├── components/
│   ├── layout/                  # Navbar · Footer · Intro · Cursor
│   ├── sections/                # Hero · About · Projects · Skills · Journey · Contact
│   └── ui/                      # Shared UI primitives
├── lib/
│   ├── data.ts                  # Site content, projects, skills, experience
│   └── motion.ts                # Shared motion presets
├── public/
│   └── projects/                # Project screenshots
└── README.md
```

Update identity, projects, and links in **`lib/data.ts`**.

---

## Page map

| # | Section | Anchor |
| --- | --- | --- |
| 01 | Intro / Hero | `#top` |
| 02 | About | `#about` |
| 03 | Selected Work | `#projects` |
| 04 | Tech Stack | `#skills` |
| 05 | Journey | `#experience` |
| 06 | Contact | `#contact` |

---

## Contact form

Messages post to `POST /api/contact`, are validated on the server, then forwarded through [FormSubmit](https://formsubmit.co/) to the portfolio email in `lib/data.ts`.

> First use in a new environment may require a one-time FormSubmit activation email.

No environment variables are required for the default setup.

---

## Customization

| What | Where |
| --- | --- |
| Name, role, links, projects | `lib/data.ts` |
| Colors & surfaces | `app/globals.css` |
| Remote image hosts | `next.config.ts` |

---

## Deploy

Optimized for [Vercel](https://vercel.com/):

1. Push the repository to GitHub  
2. Import the project in Vercel  
3. Deploy — `npm run build` runs automatically  

After the first production deploy, send a test message to confirm FormSubmit is activated.

[![Deploy with Vercel](https://img.shields.io/badge/Deploy_with-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new)

---

## Connect

<p>
  <a href="https://github.com/omniaosamamahmood-prog">
    <img src="https://img.shields.io/badge/GitHub-omniaosamamahmood--prog-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/omnia-osama-6754b3206">
    <img src="https://img.shields.io/badge/LinkedIn-Omnia_Osama-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="mailto:anaomnia47@gmail.com">
    <img src="https://img.shields.io/badge/Email-anaomnia47%40gmail.com-0D6E6A?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

---

<div align="center">

**Omnia Osama** · Full-Stack WEB Developer

© 2026 · All rights reserved

</div>
