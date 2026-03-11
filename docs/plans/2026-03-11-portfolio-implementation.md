# Ali Mayladan Portfolio Website — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a professional dark-themed single-page portfolio website for Ali Mayladan, hosted on GitHub Pages at alimln7.github.io.

**Architecture:** Pure HTML + CSS + vanilla JS. Single index.html file with linked CSS and JS. No build step, no framework. Images in /assets folder. Smooth scroll navigation with Intersection Observer animations. Mobile-responsive with hamburger menu.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, animations), vanilla JavaScript (Intersection Observer, smooth scroll)

---

### Task 1: Project Scaffolding & Base HTML Structure

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `assets/` (directory for screenshots)

**Step 1: Create directory structure**

```bash
cd D:/CV-Portfolio
mkdir -p css js assets
```

**Step 2: Create index.html with full semantic structure**

Create `index.html` with:
- DOCTYPE, html lang="en", head with meta viewport, charset, title "Ali Mayladan | Full-Stack Developer"
- Google Fonts link for Inter (400,500,600,700) and JetBrains Mono (400,500)
- Link to css/style.css
- All 7 section containers: nav, hero, about, skills, experience, projects, contact, footer
- Script tag for js/main.js (defer)
- Each section gets an id matching nav links

**Step 3: Create empty css/style.css and js/main.js**

Placeholder files so the HTML loads without errors.

**Step 4: Verify structure**

```bash
cd D:/CV-Portfolio
ls -R
```
Expected: index.html, css/style.css, js/main.js, assets/, docs/

**Step 5: Commit**

```bash
cd D:/CV-Portfolio
git add index.html css/style.css js/main.js
git commit -m "feat: scaffold project structure with semantic HTML sections"
```

---

### Task 2: CSS Foundation — Variables, Reset, Typography, Dark Theme

**Files:**
- Modify: `css/style.css`

**Step 1: Write CSS custom properties and reset**

Define in `:root`:
- `--bg-primary: #0a0a0a`
- `--bg-secondary: #0f0f23`
- `--bg-card: #111127`
- `--bg-card-hover: #1a1a3e`
- `--text-primary: #e4e4e7`
- `--text-secondary: #a1a1aa`
- `--text-muted: #71717a`
- `--accent-cyan: #06b6d4`
- `--accent-purple: #8b5cf6`
- `--accent-cyan-glow: rgba(6, 182, 212, 0.15)`
- `--accent-purple-glow: rgba(139, 92, 246, 0.15)`
- `--border-subtle: rgba(255, 255, 255, 0.06)`
- `--border-hover: rgba(255, 255, 255, 0.12)`
- `--font-body: 'Inter', sans-serif`
- `--font-mono: 'JetBrains Mono', monospace`
- Spacing scale: `--space-xs` through `--space-3xl`
- `--max-width: 1200px`
- `--nav-height: 72px`
- `--transition-fast: 0.2s ease`
- `--transition-base: 0.3s ease`

Add CSS reset (box-sizing, margin, padding zero, smooth scroll on html).
Set body background, color, font-family.
Add `::selection` styling with cyan accent.

**Step 2: Add base typography classes**

Style headings h1-h6, paragraph, links, `.section-title`, `.section-subtitle`.
h1: 3.5rem, 700 weight, gradient text (cyan to purple).
h2 (section titles): 2.5rem, 600 weight.

**Step 3: Add utility classes**

`.container` (max-width + padding), `.text-gradient`, `.text-accent`, `.flex`, `.grid`.

**Step 4: Verify by opening index.html in browser**

Open index.html — should show dark background, correct fonts loading.

**Step 5: Commit**

```bash
cd D:/CV-Portfolio
git add css/style.css
git commit -m "feat: add CSS foundation with dark theme variables and typography"
```

---

### Task 3: Navigation Bar (sticky, responsive)

**Files:**
- Modify: `index.html` (nav section)
- Modify: `css/style.css` (nav styles)
- Modify: `js/main.js` (hamburger toggle, scroll spy)

**Step 1: Write nav HTML**

Inside the `<nav>` element:
- Logo: `<a class="nav-logo" href="#">AM</a>` — stylized initials
- Nav links: `<ul class="nav-links">` with li > a for: About, Skills, Experience, Projects, Contact
- Each link href="#section-id"
- Hamburger button: `<button class="nav-hamburger">` with 3 span lines
- Wrap in `.nav-container` with max-width

**Step 2: Write nav CSS**

- Sticky top, z-index 1000, backdrop-filter blur
- Background: transparent initially, becomes semi-opaque on scroll (via JS class `.nav-scrolled`)
- Logo: font-mono, accent-cyan color, font-weight 700, font-size 1.5rem
- Links: horizontal row, gap 2rem, text-secondary color, hover becomes text-primary with cyan underline
- Active link gets cyan color (via `.active` class set by scroll spy)
- Hamburger: hidden on desktop, visible on mobile (<768px)
- Mobile menu: full-width dropdown, links stack vertically

**Step 3: Write nav JS**

- Scroll listener: add `.nav-scrolled` class when scrollY > 50
- Hamburger click: toggle `.nav-open` class on nav
- Scroll spy: Intersection Observer on each section, sets `.active` on corresponding nav link
- Smooth scroll: click handler on nav links, scrollTo with offset for nav height
- Close mobile menu on link click

**Step 4: Verify**

Open in browser. Nav should be sticky, links should smooth-scroll, hamburger appears on mobile width.

**Step 5: Commit**

```bash
cd D:/CV-Portfolio
git add index.html css/style.css js/main.js
git commit -m "feat: add responsive sticky navigation with scroll spy"
```

---

### Task 4: Hero Section

**Files:**
- Modify: `index.html` (hero section)
- Modify: `css/style.css` (hero styles)

**Step 1: Write hero HTML**

```html
<section id="hero" class="hero">
  <div class="hero-bg">
    <div class="hero-grid"></div>
  </div>
  <div class="hero-content container">
    <div class="hero-badge">Full-Stack Developer</div>
    <h1 class="hero-title">Ali Mayladan</h1>
    <p class="hero-subtitle">Building enterprise systems, AI platforms, and production-grade software</p>
    <div class="hero-cta">
      <a href="#projects" class="btn btn-primary">View My Work</a>
      <a href="#contact" class="btn btn-outline">Get In Touch</a>
    </div>
    <div class="hero-socials">
      <!-- GitHub SVG icon link -->
      <!-- LinkedIn SVG icon link -->
      <!-- Email SVG icon link -->
    </div>
  </div>
</section>
```

**Step 2: Write hero CSS**

- Full viewport height (100vh), flex center, position relative
- `.hero-bg`: absolute fill, overflow hidden
- `.hero-grid`: CSS background with repeating radial-gradient dots (subtle grid pattern), animated slow drift
- `.hero-badge`: inline-block, mono font, small, cyan border, rounded pill
- `.hero-title`: 4rem desktop / 2.5rem mobile, font-weight 800, white
- `.hero-subtitle`: text-secondary, max-width 600px, 1.25rem
- `.btn-primary`: cyan bg, dark text, rounded, padding, hover glow
- `.btn-outline`: transparent bg, cyan border, cyan text, hover fill
- `.hero-socials`: flex row, icon links, 24px SVGs, text-muted, hover cyan
- Fade-in animation on hero-content (opacity 0 → 1, translateY 30px → 0)

**Step 3: Verify**

Open in browser. Hero should show animated grid background, name, subtitle, two buttons, social icons, all centered.

**Step 4: Commit**

```bash
cd D:/CV-Portfolio
git add index.html css/style.css
git commit -m "feat: add hero section with animated grid background and CTAs"
```

---

### Task 5: About Me Section

**Files:**
- Modify: `index.html` (about section)
- Modify: `css/style.css` (about styles)
- Modify: `js/main.js` (counter animation)

**Step 1: Write about HTML**

Two-column layout:
- Left: Section title "About Me", bio paragraphs (polished version of Ali's story), tags for university/companies
- Right: Stats grid with 4 animated counter cards:
  - "7+" / "Projects Delivered"
  - "261+" / "GPS Protocols"
  - "150K+" / "Data Points Tracked"
  - "19+" / "ERP Modules"

Bio text (polished):
"A production-driven full-stack developer who bridges the gap between cutting-edge AI tooling and practical software engineering. Currently pursuing a Computer Science degree at Antonine University, I've built enterprise-grade systems across risk management, GPS fleet tracking, AI chatbots, and ERP platforms.

I believe in evolving with technology — not following tradition for its own sake. Whether it's customizing open-source platforms with 261 protocol decoders, building multi-tenant AI chatbot platforms, or designing 19-module ERP systems with full Arabic localization, I bring the same standard: production-ready, fully complete, no shortcuts.

When I don't know something today, I'll have more than enough knowledge about it tomorrow."

**Step 2: Write about CSS**

- Two-column grid (1fr 1fr) on desktop, single column on mobile
- Bio text: text-secondary, 1.1rem line-height
- Tags: inline flex, small pills with border, mono font
- Stats cards: bg-card, border-subtle, rounded, padding, centered text
- Counter number: 2.5rem, font-weight 700, accent-cyan
- Counter label: text-muted, small
- Scroll reveal animation class `.reveal` (handled by Intersection Observer in JS)

**Step 3: Add counter animation to JS**

Intersection Observer watches `.stat-number` elements. When visible, animate from 0 to target number using requestAnimationFrame (duration ~2s, easeOut).

**Step 4: Verify**

Scroll to About section. Bio should display, counters should animate when scrolled into view.

**Step 5: Commit**

```bash
cd D:/CV-Portfolio
git add index.html css/style.css js/main.js
git commit -m "feat: add about section with animated stat counters"
```

---

### Task 6: Skills Section

**Files:**
- Modify: `index.html` (skills section)
- Modify: `css/style.css` (skills styles)

**Step 1: Write skills HTML**

Section with title "Skills & Technologies". Grid of skill categories, each with a heading and chip list:

Categories:
1. Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, HTML5, CSS3
2. Backend: Node.js, Java, Python, Express
3. Database: PostgreSQL, SQLite, MariaDB, TimescaleDB, Redis, Prisma
4. AI & Automation: Claude AI, OpenAI, LangGraph, RAG, WhatsApp Cloud API
5. DevOps & Tools: Docker, AWS S3, Nginx, PM2, Git, Claude Code, Cursor AI
6. E-commerce & ERP: Shopify, Liquid, ERPNext, Frappe
7. Other: IoT/Robotics, Adobe Suite, Graphic Design

Each chip: `<span class="skill-chip">React</span>`

**Step 2: Write skills CSS**

- Section padding, container max-width
- Category cards: bg-card, rounded, padding, border-subtle
- Category title: small, uppercase, mono font, accent-purple, letter-spacing
- Skill chips: inline-block, bg slightly lighter, rounded-full, padding, text-sm, text-secondary
- Chip hover: border-cyan, text-primary, subtle glow
- Grid: 2 columns on desktop, 1 on mobile
- Stagger reveal animation (each card fades in with slight delay)

**Step 3: Verify**

Scroll to Skills. Should see categorized chips in a clean grid layout.

**Step 4: Commit**

```bash
cd D:/CV-Portfolio
git add index.html css/style.css
git commit -m "feat: add skills section with categorized tech chips"
```

---

### Task 7: Experience Timeline Section

**Files:**
- Modify: `index.html` (experience section)
- Modify: `css/style.css` (timeline styles)

**Step 1: Write experience HTML**

Vertical timeline with 4 entries:

1. **Zin Solutions** (USA) — Full-Stack Developer Intern
   - "Enterprise Risk Management System (LITE-RMIS)"
   - "Workflow engine development, QuickJS code execution, database schema design, debugging"
   - Tags: Next.js, React, Prisma, PostgreSQL, Claude AI

2. **GPSLvn** (Iraq) — Freelance Full-Stack Developer
   - "GPS Tracking Platform + Fleet Management ERP"
   - "Customized Traccar open-source platform with 261 GPS protocols, built custom ERP with 19 modules"
   - Tags: Java, React, PostgreSQL, ERPNext, Python, Docker

3. **IDS** — Full-Stack Developer Intern
   - "Full-stack development internship"
   - Tags: Full-Stack

4. **Freelance** — Independent Developer
   - "AI Chatbot Platform, Shopify E-commerce, Home Automation"
   - Tags: Node.js, Claude AI, Shopify, IoT

Each entry: date badge, company name, role, description, tech tags.

**Step 2: Write timeline CSS**

- Vertical line: 2px cyan/purple gradient, centered (or left-aligned on mobile)
- Timeline dots: 12px circles on the line, cyan fill, glow
- Entry cards: bg-card, rounded, padding, offset alternating left/right on desktop
- Mobile: all entries stack left
- Date badge: mono font, text-muted, small
- Company: font-weight 600, text-primary
- Role: accent-cyan, font-weight 500
- Description: text-secondary
- Tags: small chips similar to skills section

**Step 3: Verify**

Scroll to Experience. Should see vertical timeline with alternating cards.

**Step 4: Commit**

```bash
cd D:/CV-Portfolio
git add index.html css/style.css
git commit -m "feat: add experience timeline section"
```

---

### Task 8: Copy & Optimize Screenshot Assets

**Files:**
- Create: `assets/projects/traccar-login.jpg`
- Create: `assets/projects/traccar-map.jpg`
- Create: `assets/projects/traccar-cmc.jpg`
- Create: `assets/projects/traccar-users.jpg`
- Create: `assets/projects/traccar-setup.jpg`
- Create: `assets/projects/traccar-report.jpg`
- Create: `assets/projects/rmis-dashboard.jpg`
- Create: `assets/projects/erp-modules.jpg`
- Create: `assets/projects/erp-customer-type.jpg`
- Create: `assets/projects/erp-customer-form.jpg`
- Create: `assets/projects/erp-hr.jpg`
- Create: `assets/projects/erp-settings.jpg`
- Create: `assets/projects/botleb-dashboard.jpg`
- Create: `assets/projects/botleb-analytics.jpg`
- Create: `assets/projects/botleb-settings.jpg`
- Create: `assets/projects/botleb-features.jpg`
- Create: `assets/projects/botleb-whatsapp.jpg`
- Create: `assets/projects/shopify-ghazi.jpg`
- Create: `assets/projects/shopify-rave.jpg`

**Step 1: Create assets directory**

```bash
mkdir -p D:/CV-Portfolio/assets/projects
```

**Step 2: Locate and copy Ali's screenshots**

The screenshots were sent as images in the conversation. Since they exist as user-provided images, we need to save them to the assets folder. Use the actual screenshot image files that Ali provided during the conversation.

NOTE: If screenshot files aren't directly accessible as files, create placeholder colored rectangles with project names as temporary images, and instruct Ali to replace them with his actual screenshots later.

**Step 3: Commit assets**

```bash
cd D:/CV-Portfolio
git add assets/
git commit -m "feat: add project screenshot assets"
```

---

### Task 9: Projects Section (Main Showcase)

**Files:**
- Modify: `index.html` (projects section)
- Modify: `css/style.css` (project card styles)
- Modify: `js/main.js` (screenshot carousel, modal)

**Step 1: Write projects HTML**

Section title "Featured Projects". Grid of 5 project cards + 1 small mention card:

Each project card contains:
- Screenshot container with image (first screenshot as preview)
- Overlay with "View Details" on hover
- Project title
- One-line description
- Tech stack badge row
- Key metrics row
- Expand/modal trigger

Project 1 — GPS Tracking Platform:
- Title: "GPS Tracking Platform"
- Subtitle: "Enterprise fleet management for GPSLvn, Iraq"
- Description: "Customized the open-source Traccar platform into a production-grade GPS fleet management system. Added 261 GPS protocol decoders, 97 report types, hierarchical user management, real-time map tracking, and a custom server health monitoring dashboard (CMC)."
- Tech: Java 17, React 19, PostgreSQL, TimescaleDB, Redis, WebSocket, Nginx
- Metrics: 261 Protocols | 97 Reports | 180+ Tables | 450+ Endpoints
- Images: traccar-login, traccar-map, traccar-cmc, traccar-users, traccar-setup, traccar-report

Project 2 — BotLeb AI:
- Title: "BotLeb AI"
- Subtitle: "Multi-tenant WhatsApp AI Chatbot Platform"
- Description: "Built a white-label SaaS platform for reselling AI chatbots to businesses. Features multi-tenant architecture (SuperAdmin/Admin/Client), Claude AI integration, WhatsApp/Instagram/Messenger support, lead scoring, broadcast campaigns, content safety system, and RAG knowledge base."
- Tech: Node.js, Next.js 15, Claude AI, SQLite, WhatsApp Cloud API, React 19
- Metrics: 3-Tier Multi-tenancy | 3 Channels | Lead Scoring | RAG
- Images: botleb-dashboard, botleb-analytics, botleb-settings, botleb-features, botleb-whatsapp

Project 3 — LITE-RMIS:
- Title: "LITE-RMIS"
- Subtitle: "Enterprise Risk Management System — Zin Solutions, USA"
- Description: "Contributed to a large-scale enterprise risk management platform as part of the Zin Solutions team. Responsible for the workflow engine using QuickJS for server-side code execution, database schema design across 177 models, and debugging complex system issues."
- Tech: Next.js 15, React 19, Prisma, PostgreSQL, Redis, BullMQ, Claude AI
- Metrics: 177 DB Models | 505+ API Routes | 59+ Services
- Images: rmis-dashboard

Project 4 — Fleet Management ERP:
- Title: "Fleet Management ERP"
- Subtitle: "Custom ERP system for GPSLvn, Iraq"
- Description: "Designed and built a complete fleet management ERP system with 19 operational modules including HR, financial accounting, inventory, purchasing, and customer management. Features full Arabic RTL support, bilingual interface, and data migration framework from legacy systems."
- Tech: ERPNext, Frappe, Python, MariaDB, Docker
- Metrics: 19 Modules | 37+ DocTypes | Bilingual AR/EN | Full RTL
- Images: erp-modules, erp-customer-type, erp-customer-form, erp-hr, erp-settings

Project 5 — Shopify E-commerce:
- Title: "E-commerce Stores"
- Subtitle: "Shopify storefronts for Ghazi Beauty & Rave Spirits"
- Description: "Built custom Shopify storefronts for two brands: Ghazi Beauty (contact lenses, Lebanon delivery) and Rave Spirits (fashion accessories). Custom theme development, product catalogs, WhatsApp integration, and responsive mobile-first design."
- Tech: Shopify, Liquid, Theme Customization, WhatsApp API
- Images: shopify-ghazi, shopify-rave

Project 6 — Home Automation (small mention card):
- Title: "Home Automation"
- Subtitle: "IoT with Odroid hardware"
- Description: "Custom home automation system controlling AC and water heater using Odroid single-board computer with IoT sensors and custom firmware."
- Tech: Odroid, IoT, Custom Firmware
- No image

**Step 2: Write project card CSS**

- Cards: bg-card, rounded-xl, overflow hidden, border-subtle
- Screenshot container: aspect-ratio 16/9, overflow hidden, object-fit cover
- Hover: image scale 1.05, overlay appears with blur backdrop
- Title: 1.5rem, font-weight 600
- Description: text-secondary, line-clamp-3
- Tech badges: small pills, mono font, bg slightly lighter
- Metrics: flex row, each metric has number (cyan, bold) + label (muted)
- Grid: 2 columns on desktop, 1 on mobile
- Small mention card (home automation): half-width, minimal, just text + tech badges

**Step 3: Write screenshot carousel JS**

- Click on project card opens a modal/lightbox
- Modal shows: large screenshot (current), prev/next arrows, dot indicators, project details below
- Arrow keys navigate screenshots
- Escape or click outside closes modal
- Body scroll locked when modal open

**Step 4: Verify**

Projects section should show 6 cards with screenshots, hovering shows overlay, clicking opens modal with carousel.

**Step 5: Commit**

```bash
cd D:/CV-Portfolio
git add index.html css/style.css js/main.js
git commit -m "feat: add projects section with screenshot carousels"
```

---

### Task 10: Contact Section & Footer

**Files:**
- Modify: `index.html` (contact section + footer)
- Modify: `css/style.css` (contact + footer styles)

**Step 1: Write contact HTML**

Section title "Get In Touch". Two-column layout:
- Left: heading, short text ("Interested in working together? Let's connect."), contact info list:
  - Email icon + alimayladan.123@icloud.com (mailto link)
  - Phone icon + +961 81 930 412 (tel link)
  - LinkedIn icon + link
  - GitHub icon + link
  - Location: Lebanon
- Right: Contact form (action to Formspree or just mailto):
  - Name input
  - Email input
  - Message textarea
  - Send button

Footer:
- "© 2026 Ali Mayladan. Built with passion and zero dependencies."
- Small social icon row

**Step 2: Write contact + footer CSS**

- Two-column grid, single on mobile
- Contact info: icon + text rows, text-secondary, hover accent
- Form inputs: bg-card, border-subtle, rounded, padding, focus border-cyan
- Send button: btn-primary style
- Footer: border-top subtle, padding, text-center, text-muted

**Step 3: Verify**

Scroll to contact. Should see info + form side by side.

**Step 4: Commit**

```bash
cd D:/CV-Portfolio
git add index.html css/style.css
git commit -m "feat: add contact section and footer"
```

---

### Task 11: Scroll Animations (Intersection Observer Reveal)

**Files:**
- Modify: `js/main.js`
- Modify: `css/style.css`

**Step 1: Add reveal animation CSS**

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }
```

**Step 2: Add Intersection Observer in JS**

```javascript
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
```

**Step 3: Add .reveal class to all section elements in HTML**

Add `class="reveal"` to: about cards, skill categories, timeline entries, project cards, contact elements. Add stagger delays where appropriate.

**Step 4: Verify**

Scroll through page. Elements should fade-in-up as they enter viewport.

**Step 5: Commit**

```bash
cd D:/CV-Portfolio
git add index.html css/style.css js/main.js
git commit -m "feat: add scroll reveal animations with Intersection Observer"
```

---

### Task 12: Responsive Design Polish

**Files:**
- Modify: `css/style.css` (media queries)

**Step 1: Add tablet breakpoint (768px-1199px)**

- Navigation: slightly smaller padding
- Hero: h1 3rem, subtitle smaller
- About: single column
- Skills: 2 columns
- Timeline: left-aligned (no alternating)
- Projects: 2 columns
- Contact: single column

**Step 2: Add mobile breakpoint (<768px)**

- Navigation: hamburger visible, links hidden until toggled
- Hero: h1 2rem, buttons stack vertically
- About: single column, stats 2x2 grid
- Skills: single column
- Timeline: left-aligned, compact
- Projects: single column
- Contact: single column, form full width

**Step 3: Test at all breakpoints**

Resize browser to 1400px, 1024px, 768px, 375px. Verify layout adjusts properly at each.

**Step 4: Commit**

```bash
cd D:/CV-Portfolio
git add css/style.css
git commit -m "feat: add responsive design for tablet and mobile"
```

---

### Task 13: Final Polish & Performance

**Files:**
- Modify: `index.html` (meta tags, favicon)
- Modify: `css/style.css` (final tweaks)
- Create: `favicon.svg` (AM initials as SVG favicon)

**Step 1: Add meta tags for SEO and social sharing**

```html
<meta name="description" content="Ali Mayladan — Full-Stack Developer. Building enterprise systems, AI platforms, and production-grade software.">
<meta name="keywords" content="Ali Mayladan, Full-Stack Developer, React, Next.js, Java, Python, Portfolio">
<meta property="og:title" content="Ali Mayladan | Full-Stack Developer">
<meta property="og:description" content="Building enterprise systems, AI platforms, and production-grade software">
<meta property="og:type" content="website">
<meta property="og:url" content="https://alimln7.github.io">
```

**Step 2: Create SVG favicon**

Simple "AM" text in a rounded square, cyan on dark background.

**Step 3: Add loading performance**

- `loading="lazy"` on all project screenshot images
- `font-display: swap` on font imports
- Preconnect to Google Fonts

**Step 4: Final visual review**

Open in browser. Check:
- [ ] All sections render correctly
- [ ] Navigation scroll spy works
- [ ] Mobile menu works
- [ ] Counters animate
- [ ] Project modals work
- [ ] Scroll reveal animations work
- [ ] Responsive at all breakpoints
- [ ] No console errors

**Step 5: Commit**

```bash
cd D:/CV-Portfolio
git add -A
git commit -m "feat: add meta tags, favicon, and performance optimizations"
```

---

### Task 14: GitHub Pages Deployment

**Files:**
- No new files — git operations only

**Step 1: Create GitHub repository**

```bash
cd D:/CV-Portfolio
gh repo create ALIMLN7/ALIMLN7.github.io --public --source=. --push
```

**Step 2: Push to GitHub**

```bash
git branch -M main
git push -u origin main
```

**Step 3: Enable GitHub Pages**

GitHub Pages auto-deploys for repositories named `username.github.io`. The site should be live at https://alimln7.github.io within 1-2 minutes.

**Step 4: Verify deployment**

```bash
gh api repos/ALIMLN7/ALIMLN7.github.io/pages
```

Check that the site is accessible at https://alimln7.github.io

**Step 5: Final commit**

No additional commit needed unless changes were made during verification.

---

## Summary

| Task | Description | Est. Time |
|------|-------------|-----------|
| 1 | Project scaffolding | 2 min |
| 2 | CSS foundation | 5 min |
| 3 | Navigation bar | 5 min |
| 4 | Hero section | 5 min |
| 5 | About Me section | 5 min |
| 6 | Skills section | 3 min |
| 7 | Experience timeline | 5 min |
| 8 | Screenshot assets | 3 min |
| 9 | Projects section | 10 min |
| 10 | Contact & footer | 5 min |
| 11 | Scroll animations | 3 min |
| 12 | Responsive polish | 5 min |
| 13 | Final polish & perf | 3 min |
| 14 | GitHub Pages deploy | 3 min |
| **Total** | | **~62 min** |
