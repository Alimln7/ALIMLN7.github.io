"""
Generate Ali Mayladan's Professional CV PDF
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet

# ── Colors ──────────────────────────────────────
DARK = HexColor("#1a1a2e")
CYAN = HexColor("#06b6d4")
PURPLE = HexColor("#8b5cf6")
TEXT_PRIMARY = HexColor("#222222")
TEXT_SECONDARY = HexColor("#555555")
TEXT_LIGHT = HexColor("#777777")
LINE_COLOR = HexColor("#d0d0d0")
BG_LIGHT = HexColor("#f8f9fa")

# ── Styles ──────────────────────────────────────
styles = getSampleStyleSheet()

style_name = ParagraphStyle(
    "Name", fontSize=22, fontName="Helvetica-Bold",
    textColor=TEXT_PRIMARY, spaceAfter=6, leading=26, alignment=TA_LEFT
)
style_headline = ParagraphStyle(
    "Headline", fontSize=10, fontName="Helvetica",
    textColor=CYAN, spaceAfter=5, alignment=TA_LEFT
)
style_contact = ParagraphStyle(
    "Contact", fontSize=8.5, fontName="Helvetica",
    textColor=TEXT_SECONDARY, spaceAfter=8, alignment=TA_LEFT
)
style_section = ParagraphStyle(
    "Section", fontSize=12, fontName="Helvetica-Bold",
    textColor=CYAN, spaceBefore=14, spaceAfter=6, alignment=TA_LEFT
)
style_subsection = ParagraphStyle(
    "Subsection", fontSize=10, fontName="Helvetica-Bold",
    textColor=TEXT_PRIMARY, spaceBefore=6, spaceAfter=1, alignment=TA_LEFT
)
style_role = ParagraphStyle(
    "Role", fontSize=9, fontName="Helvetica-Oblique",
    textColor=PURPLE, spaceAfter=1, alignment=TA_LEFT
)
style_date = ParagraphStyle(
    "Date", fontSize=8, fontName="Helvetica",
    textColor=TEXT_LIGHT, spaceAfter=3, alignment=TA_LEFT
)
style_body = ParagraphStyle(
    "Body", fontSize=9, fontName="Helvetica",
    textColor=TEXT_SECONDARY, leading=13, spaceAfter=2,
    alignment=TA_JUSTIFY
)
style_bullet = ParagraphStyle(
    "Bullet", fontSize=9, fontName="Helvetica",
    textColor=TEXT_SECONDARY, leading=13, leftIndent=12,
    bulletIndent=0, spaceAfter=1, alignment=TA_LEFT
)
style_tech = ParagraphStyle(
    "Tech", fontSize=8, fontName="Helvetica",
    textColor=TEXT_LIGHT, spaceAfter=6, alignment=TA_LEFT
)
style_summary = ParagraphStyle(
    "Summary", fontSize=9, fontName="Helvetica",
    textColor=TEXT_SECONDARY, leading=13.5, spaceAfter=4,
    alignment=TA_JUSTIFY
)

def build_cv():
    doc = SimpleDocTemplate(
        "D:/CV-Portfolio/Ali_Mayladan_CV.pdf",
        pagesize=A4,
        leftMargin=18*mm, rightMargin=18*mm,
        topMargin=15*mm, bottomMargin=15*mm
    )

    story = []
    W = doc.width

    # ════════════════════════════════════════════
    # HEADER
    # ════════════════════════════════════════════
    story.append(Paragraph("Ali Mayladan", style_name))
    story.append(Paragraph("Full-Stack Developer", style_headline))
    story.append(Paragraph(
        "alimayladan.123@icloud.com  |  +961 81 930 412  |  Lebanon  |  "
        '<link href="https://alimln7.github.io" color="#06b6d4">alimln7.github.io</link>  |  '
        '<link href="https://linkedin.com/in/ali-mayladan-550660279" color="#06b6d4">LinkedIn</link>  |  '
        '<link href="https://github.com/Alimln7" color="#06b6d4">GitHub</link>',
        style_contact
    ))

    # Divider
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceAfter=6))

    # ════════════════════════════════════════════
    # SUMMARY
    # ════════════════════════════════════════════
    story.append(Paragraph("SUMMARY", style_section))
    story.append(Paragraph(
        "Production-driven full-stack developer building enterprise-grade systems that solve real business "
        "problems. Experienced in GPS fleet tracking platforms, AI-powered SaaS products, ERP systems, and "
        "e-commerce solutions. Currently pursuing Computer Science at Antonine University while delivering "
        "freelance and internship projects for clients across the USA, Iraq, and Lebanon.",
        style_summary
    ))

    # ════════════════════════════════════════════
    # EXPERIENCE
    # ════════════════════════════════════════════
    story.append(Paragraph("EXPERIENCE", style_section))

    # ── Zin Solutions ──
    exp1 = []
    exp1.append(Paragraph("Zin Solutions — Full-Stack Developer Intern", style_subsection))
    exp1.append(Paragraph("USA (Remote)", style_role))
    exp1.append(Paragraph("2024 — Present", style_date))
    exp1.append(Paragraph(
        "Core contributor to LITE-RMIS, an enterprise risk management platform serving real clients.",
        style_body
    ))
    bullets1 = [
        "Designed and implemented the workflow engine using QuickJS for server-side code execution",
        "Architected the database schema across 177 models with 505+ API routes",
        "Integrated Claude AI for intelligent automation and 59+ services",
        "Served as the primary debugger, resolving complex full-stack system issues",
    ]
    for b in bullets1:
        exp1.append(Paragraph(f"<bullet>&bull;</bullet> {b}", style_bullet))
    exp1.append(Paragraph(
        "<b>Tech:</b> Next.js 15, React 19, Prisma, PostgreSQL, Redis, BullMQ, Claude AI",
        style_tech
    ))
    story.append(KeepTogether(exp1))

    # ── GPSLvn ──
    exp2 = []
    exp2.append(Paragraph("GPSLvn — Freelance Full-Stack Developer", style_subsection))
    exp2.append(Paragraph("Iraq (Remote)", style_role))
    exp2.append(Paragraph("2025 — 2026", style_date))
    exp2.append(Paragraph(
        "Solo-built a production GPS fleet tracking platform and a complete Fleet Management ERP system.",
        style_body
    ))
    bullets2 = [
        "Customized Traccar with 261 protocol decoders, 97 report types, and 150K+ tracked positions",
        "Built a custom server health monitoring dashboard (CMC) with real-time WebSocket updates",
        "Designed 19 ERP modules (HR, finance, inventory, warehouse, purchase) with full Arabic RTL support",
        "Migrated data from legacy systems with bilingual Arabic/English interface",
    ]
    for b in bullets2:
        exp2.append(Paragraph(f"<bullet>&bull;</bullet> {b}", style_bullet))
    exp2.append(Paragraph(
        "<b>Tech:</b> Java 17, React 19, PostgreSQL, TimescaleDB, Redis, WebSocket, ERPNext, Python",
        style_tech
    ))
    story.append(KeepTogether(exp2))

    # ── IDS ──
    exp3 = []
    exp3.append(Paragraph("IDS — Full-Stack Developer Intern", style_subsection))
    exp3.append(Paragraph("Lebanon", style_role))
    exp3.append(Paragraph("Dec 2025 — Feb 2026", style_date))
    exp3.append(Paragraph(
        "Full-stack development internship focused on building and maintaining web applications "
        "using modern development practices.",
        style_body
    ))
    story.append(KeepTogether(exp3))

    # ════════════════════════════════════════════
    # PROJECTS
    # ════════════════════════════════════════════
    story.append(Paragraph("PROJECTS", style_section))

    # ── BotLeb AI ──
    proj1 = []
    proj1.append(Paragraph("BotLeb AI — Multi-tenant WhatsApp AI Chatbot Platform", style_subsection))
    proj1.append(Paragraph("Solo Project  |  2026", style_date))
    bullets_p1 = [
        "Built a white-label SaaS platform for businesses to deploy AI chatbots on WhatsApp",
        "Three-tier multi-tenancy (Super Admin / Admin / Client) with Claude AI integration",
        "Lead scoring, broadcast campaigns, RAG knowledge base, and content safety system",
    ]
    for b in bullets_p1:
        proj1.append(Paragraph(f"<bullet>&bull;</bullet> {b}", style_bullet))
    proj1.append(Paragraph(
        "<b>Tech:</b> Node.js, Next.js 15, Claude AI, SQLite, WhatsApp Cloud API, React 19",
        style_tech
    ))
    story.append(KeepTogether(proj1))

    # ── Petronox ──
    proj2 = []
    proj2.append(Paragraph("Petronox — Corporate Website for Lubricant Manufacturer", style_subsection))
    proj2.append(Paragraph("Freelance  |  2026", style_date))
    bullets_p2 = [
        "Full-stack corporate website with bilingual Arabic/English support and RTL layout",
        "Smart Oil Finder tool, product catalog with ASTM standards, IRI certification display",
        "SPA architecture with custom router, Python backend, and SQLite database",
    ]
    for b in bullets_p2:
        proj2.append(Paragraph(f"<bullet>&bull;</bullet> {b}", style_bullet))
    proj2.append(Paragraph(
        "<b>Tech:</b> HTML5, CSS3, JavaScript, Python, SQLite, i18n (AR/EN)",
        style_tech
    ))
    story.append(KeepTogether(proj2))

    # ── E-commerce ──
    proj3 = []
    proj3.append(Paragraph("E-commerce Stores — Shopify Storefronts", style_subsection))
    proj3.append(Paragraph("Freelance  |  2024", style_date))
    bullets_p3 = [
        "Custom Shopify storefronts for Ghazi Beauty (contact lenses) and Rave Spirits (accessories)",
        "Custom Liquid theme development with mobile-first responsive design",
    ]
    for b in bullets_p3:
        proj3.append(Paragraph(f"<bullet>&bull;</bullet> {b}", style_bullet))
    proj3.append(Paragraph(
        "<b>Tech:</b> Shopify, Liquid, HTML, CSS, JavaScript",
        style_tech
    ))
    story.append(KeepTogether(proj3))

    # ── Home Automation ──
    proj4 = []
    proj4.append(Paragraph("Home Automation — IoT System", style_subsection))
    proj4.append(Paragraph("Personal  |  2025", style_date))
    proj4.append(Paragraph(
        "Designed and built a home automation system using Odroid hardware with custom IoT integrations.",
        style_body
    ))
    story.append(KeepTogether(proj4))

    # ════════════════════════════════════════════
    # EDUCATION
    # ════════════════════════════════════════════
    story.append(Paragraph("EDUCATION", style_section))
    edu = []
    edu.append(Paragraph("Antonine University", style_subsection))
    edu.append(Paragraph("Bachelor of Science in Computer Science", style_role))
    edu.append(Paragraph("2022 — 2027 (Expected)", style_date))
    story.append(KeepTogether(edu))

    # ════════════════════════════════════════════
    # SKILLS
    # ════════════════════════════════════════════
    story.append(Paragraph("SKILLS", style_section))

    skills_data = [
        ("<b>Frontend:</b>", "React, Next.js, TypeScript, Tailwind CSS, Framer Motion, HTML5, CSS3"),
        ("<b>Backend:</b>", "Node.js, Java, Python, Express"),
        ("<b>Database:</b>", "PostgreSQL, SQLite, MariaDB, TimescaleDB, Redis, Prisma"),
        ("<b>AI &amp; Automation:</b>", "Claude AI, OpenAI, LangGraph, RAG, WhatsApp Cloud API"),
        ("<b>DevOps &amp; Tools:</b>", "Docker, AWS S3, Nginx, PM2, Git, Claude Code, Cursor AI"),
        ("<b>Other:</b>", "Shopify/Liquid, ERPNext/Frappe, IoT/Robotics, Adobe Suite, Graphic Design"),
    ]
    for label, value in skills_data:
        story.append(Paragraph(f"{label} {value}", style_body))

    # ════════════════════════════════════════════
    # LANGUAGES
    # ════════════════════════════════════════════
    story.append(Spacer(1, 6))
    story.append(Paragraph("LANGUAGES", style_section))
    story.append(Paragraph("Arabic (Native)  |  English (Professional)  |  French (Basic)", style_body))

    # ── Build ──
    doc.build(story)
    print("CV generated: D:/CV-Portfolio/Ali_Mayladan_CV.pdf")

if __name__ == "__main__":
    build_cv()
