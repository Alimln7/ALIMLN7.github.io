# Portfolio Website Design — Ali Mayladan

**Date:** 2026-03-11
**Type:** Single-page scrolling portfolio
**Style:** Dark Minimal Pro
**Hosting:** GitHub Pages (ALIMLN7.github.io)
**Tech:** Pure HTML + CSS + vanilla JS (zero dependencies)

---

## Personal Information

- **Name:** Ali Mayladan
- **Title:** Full-Stack Developer
- **University:** Antonine University Baabda — Computer Science (in progress)
- **Languages:** English, Arabic
- **Email:** alimayladan.123@icloud.com
- **Phone:** +961 81 930 412
- **GitHub:** https://github.com/Alimln7
- **LinkedIn:** https://www.linkedin.com/in/ali-mayladan-550660279
- **Photo:** None — use stylized "AM" initials avatar

---

## Design Decisions

### Visual Style
- Dark background gradient (#0a0a0a → #0f0f23)
- Primary accent: Cyan (#06b6d4)
- Secondary accent: Purple (#8b5cf6)
- Typography: Inter (body) + JetBrains Mono (code/tech elements)
- Subtle CSS-only grid/dot animation on hero
- Smooth scroll with Intersection Observer animations

### Technical Stack
- Pure HTML/CSS/JS — no framework, no build step
- CSS custom properties for theming
- CSS Grid + Flexbox for responsive layout
- Intersection Observer for scroll reveal animations
- Screenshots stored as optimized images in /assets folder
- Repository: ALIMLN7/ALIMLN7.github.io

### Why Zero Dependencies
- Instant load on GitHub Pages (no build required)
- Maximum performance (no JS framework overhead)
- Simple deployment (push and done)
- Demonstrates raw HTML/CSS/JS skill

---

## Page Sections

### 1. Navigation Bar (sticky)
- "AM" logo (left)
- Nav links: About, Skills, Experience, Projects, Contact
- Smooth scroll to sections
- Mobile hamburger menu

### 2. Hero Section (100vh)
- Animated subtle dot grid background (CSS only)
- "Ali Mayladan" — large heading
- "Full-Stack Developer" — subtitle
- One-liner tagline
- CTA buttons: "View My Work" + "Get In Touch"
- Social icons: GitHub, LinkedIn, Email

### 3. About Me
- Two-column layout: bio text (left), stats counters (right)
- Polished bio derived from Ali's story
- Animated counters: 7+ Projects, 261+ Protocols, 150K+ Data Points, 19+ ERP Modules
- Tags: Antonine University, Zin Solutions (USA), GPSLvn (Iraq)

### 4. Skills
- Categorized chips with subtle icons:
  - Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
  - Backend: Node.js, Java, Python, Express
  - Database: PostgreSQL, SQLite, MariaDB, TimescaleDB, Redis, Prisma
  - AI & Automation: Claude AI, OpenAI, LangGraph, RAG, WhatsApp Cloud API
  - DevOps: Docker, AWS S3, Nginx, PM2, Git
  - Tools: Claude Code, Cursor AI, Adobe Suite, ERPNext/Frappe
  - E-commerce: Shopify, Liquid, Theme Customization
  - Other: IoT/Robotics (Odroid), Graphic Design, Logo Animation

### 5. Experience Timeline
- Vertical timeline with connecting line and dots
  1. Zin Solutions (USA) — Full-Stack Developer Intern — LITE-RMIS
  2. GPSLvn (Iraq) — Freelance Full-Stack Developer — GPS Platform + Fleet ERP
  3. IDS — Full-Stack Developer Intern
  4. Freelance — AI Chatbot, Shopify Stores, Home Automation

### 6. Projects (main showcase)
- Large cards with screenshot preview, title, description, tech badges, key metrics
- Projects ordered by impact:

#### Project 1: GPS Tracking Platform (Traccar Customization)
- Client: GPSLvn, Iraq
- Role: Solo Full-Stack Developer
- Tech: Java 17, React 19, PostgreSQL, TimescaleDB, Redis, WebSocket
- Screenshots: Login, Live Map, CMC Health, User Hierarchy, Setup, Route Report
- Metrics: 261 GPS protocols, 180+ DB tables, 450+ REST endpoints, 97 report types, 150K+ positions tracked

#### Project 2: BotLeb AI (WhatsApp AI Chatbot)
- Role: Solo Full-Stack Developer
- Tech: Node.js, Next.js 15, Claude AI, SQLite, WhatsApp Cloud API
- Screenshots: Dashboard, Analytics, Settings, Feature Flags, Live WhatsApp Chat
- Metrics: Multi-tenant (SuperAdmin/Admin/Client), 3-channel support, Lead scoring, RAG knowledge base

#### Project 3: LITE-RMIS (Enterprise Risk Management)
- Company: Zin Solutions, USA
- Role: Workflow Engine, QuickJS, Schema Design, Debugging
- Tech: Next.js 15, React 19, Prisma, PostgreSQL, Redis, BullMQ, Claude AI
- Screenshots: Dashboard
- Metrics: 177 DB models, 505+ API routes, 59+ services

#### Project 4: Fleet Management ERP
- Client: GPSLvn, Iraq
- Role: Solo Full-Stack Developer
- Tech: ERPNext/Frappe, Python, MariaDB, Docker
- Screenshots: Modules, Customer Wizard, Customer Form, HR, Settings
- Metrics: 19 modules, 37+ DocTypes, Full Arabic RTL, Bilingual

#### Project 5: Shopify E-commerce Stores
- Clients: Ghazi Beauty, Rave Spirits
- Role: Shopify Developer
- Tech: Shopify, Liquid, Theme Customization
- Screenshots: Ghazi Beauty storefront, Rave Spirits storefront

#### Project 6: Home Automation (mention card, no screenshot)
- Personal Project
- Tech: Odroid, IoT sensors, Custom firmware
- Description: AC and water heater automation system

### 7. Contact Section
- Clean contact info display
- Email, phone, LinkedIn, GitHub links
- Simple footer with copyright

---

## Screenshot Assets Needed (19 total)
1. traccar-login.jpg
2. traccar-map.jpg
3. traccar-cmc.jpg
4. traccar-users.jpg
5. traccar-setup.jpg
6. traccar-report.jpg
7. rmis-dashboard.jpg
8. erp-modules.jpg
9. erp-customer-type.jpg
10. erp-customer-form.jpg
11. erp-hr.jpg
12. erp-settings.jpg
13. botleb-dashboard.jpg
14. botleb-analytics.jpg
15. botleb-settings.jpg
16. botleb-features.jpg
17. botleb-whatsapp.jpg
18. shopify-ghazi.jpg
19. shopify-rave.jpg

---

## Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px-1199px
- Mobile: <768px
