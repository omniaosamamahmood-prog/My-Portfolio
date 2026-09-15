# Omnia Osama

**Full-Stack WEB Developer**

Building digital products that feel simple — across frontend, backend, and databases.

<p>
  <a href="https://github.com/omniaosamamahmood-prog"><img src="./docs/icons/github.svg" width="32" height="32" alt="GitHub" /></a>
  &nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/omnia-osama-6754b3206"><img src="./docs/icons/linkedin.svg" width="32" height="32" alt="LinkedIn" /></a>
  &nbsp;&nbsp;
  <a href="mailto:anaomnia47@gmail.com"><img src="./docs/icons/gmail.svg" width="32" height="32" alt="Email" /></a>
</p>

<p>
  <img src="./docs/icons/nextdotjs.svg" width="36" height="36" alt="Next.js" />
  &nbsp;
  <img src="./docs/icons/react.svg" width="36" height="36" alt="React" />
  &nbsp;
  <img src="./docs/icons/typescript.svg" width="36" height="36" alt="TypeScript" />
  &nbsp;
  <img src="./docs/icons/tailwindcss.svg" width="36" height="36" alt="Tailwind CSS" />
  &nbsp;
  <img src="./docs/icons/nodedotjs.svg" width="36" height="36" alt="Node.js" />
  &nbsp;
  <img src="./docs/icons/vercel.svg" width="36" height="36" alt="Vercel" />
</p>

---

## Overview

Personal portfolio for **Omnia Osama** — a light editorial, single-page experience that presents selected work, technical skills, career journey, and a contact form.

Built for clarity and product craft: interfaces, APIs, and data modeled as one system.

---

## Tech stack

<p>
  <img src="./docs/icons/nextdotjs.svg" width="28" height="28" alt="Next.js" />
  &nbsp;
  <img src="./docs/icons/react.svg" width="28" height="28" alt="React" />
  &nbsp;
  <img src="./docs/icons/typescript.svg" width="28" height="28" alt="TypeScript" />
  &nbsp;
  <img src="./docs/icons/tailwindcss.svg" width="28" height="28" alt="Tailwind CSS" />
  &nbsp;
  <img src="./docs/icons/framer.svg" width="28" height="28" alt="Motion" />
  &nbsp;
  <img src="./docs/icons/nodedotjs.svg" width="28" height="28" alt="Node.js" />
  &nbsp;
  <img src="./docs/icons/vercel.svg" width="28" height="28" alt="Vercel" />
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

- Cinematic intro loader with `prefers-reduced-motion` support
- Editorial hero with brand wordmark, role emphasis, and portrait ecosystem
- Selected projects grid with live demos and GitHub links
- Tabbed tech stack across frontend, backend, databases, and tools
- Career journey timeline
- Contact form with validation, honeypot spam filter, and email delivery
- Accessible focus states, labeled social icons, and responsive layout

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
├── docs/
│   └── icons/                   # README brand icons (local)
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

<p>
  <a href="https://vercel.com/new"><img src="./docs/icons/vercel.svg" width="22" height="22" alt="Vercel" /></a>
  &nbsp;<a href="https://vercel.com/new"><strong>Deploy on Vercel</strong></a>
</p>

---

## Connect

<p>
  <a href="https://github.com/omniaosamamahmood-prog"><img src="./docs/icons/github.svg" width="28" height="28" alt="GitHub" /></a>
  &nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/omnia-osama-6754b3206"><img src="./docs/icons/linkedin.svg" width="28" height="28" alt="LinkedIn" /></a>
  &nbsp;&nbsp;
  <a href="mailto:anaomnia47@gmail.com"><img src="./docs/icons/gmail.svg" width="28" height="28" alt="Email" /></a>
</p>

**Omnia Osama** · Full-Stack WEB Developer  
[GitHub](https://github.com/omniaosamamahmood-prog) · [LinkedIn](https://www.linkedin.com/in/omnia-osama-6754b3206) · [anaomnia47@gmail.com](mailto:anaomnia47@gmail.com)

---

© 2026 Omnia Osama · All rights reserved
