/**
 * Hero Particle Constellation Background
 * Inspired by React Bits' Particles component
 * Pure vanilla JS — no dependencies
 */
(() => {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, particles, animId;
  let mouse = { x: -9999, y: -9999 };

  /* ── Config ─────────────────────────────────── */
  const CFG = {
    count: 80,            // number of particles
    maxSize: 2.5,         // max particle radius
    minSize: 0.5,         // min particle radius
    speed: 0.3,           // base movement speed
    linkDist: 150,        // max distance to draw connection lines
    linkWidth: 0.6,       // connection line width
    mouseRadius: 200,     // mouse repulsion radius
    mousePush: 0.8,       // mouse push strength
    color: [6, 182, 212], // cyan RGB
    colorAlt: [139, 92, 246], // purple RGB
  };

  /* ── Particle class ─────────────────────────── */
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * CFG.speed;
      this.vy = (Math.random() - 0.5) * CFG.speed;
      this.size = Math.random() * (CFG.maxSize - CFG.minSize) + CFG.minSize;
      // 0 = cyan, 1 = purple, blend randomly
      this.colorMix = Math.random();
      this.pulse = Math.random() * Math.PI * 2; // phase offset for pulsing
    }

    update() {
      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CFG.mouseRadius && dist > 0) {
        const force = (1 - dist / CFG.mouseRadius) * CFG.mousePush;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }

      // Dampen velocity
      this.vx *= 0.99;
      this.vy *= 0.99;

      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.015;

      // Wrap around edges
      if (this.x < -50) this.x = width + 50;
      if (this.x > width + 50) this.x = -50;
      if (this.y < -50) this.y = height + 50;
      if (this.y > height + 50) this.y = -50;
    }

    draw() {
      const alpha = 0.4 + Math.sin(this.pulse) * 0.3;
      const r = lerp(CFG.color[0], CFG.colorAlt[0], this.colorMix);
      const g = lerp(CFG.color[1], CFG.colorAlt[1], this.colorMix);
      const b = lerp(CFG.color[2], CFG.colorAlt[2], this.colorMix);

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},${alpha})`;
      ctx.fill();

      // Glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},${alpha * 0.15})`;
      ctx.fill();
    }
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /* ── Connection lines ───────────────────────── */
  function drawLinks() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CFG.linkDist) {
          const alpha = (1 - dist / CFG.linkDist) * 0.25;
          const mix = (particles[i].colorMix + particles[j].colorMix) / 2;
          const r = lerp(CFG.color[0], CFG.colorAlt[0], mix);
          const g = lerp(CFG.color[1], CFG.colorAlt[1], mix);
          const b = lerp(CFG.color[2], CFG.colorAlt[2], mix);

          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${r|0},${g|0},${b|0},${alpha})`;
          ctx.lineWidth = CFG.linkWidth;
          ctx.stroke();
        }
      }
    }
  }

  /* ── Animation loop ─────────────────────────── */
  function animate() {
    ctx.clearRect(0, 0, width, height);
    drawLinks();
    for (const p of particles) {
      p.update();
      p.draw();
    }
    animId = requestAnimationFrame(animate);
  }

  /* ── Resize handler ─────────────────────────── */
  function resize() {
    const hero = canvas.closest('.hero');
    width = canvas.width = hero ? hero.offsetWidth : window.innerWidth;
    height = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
  }

  /* ── Init ────────────────────────────────────── */
  function init() {
    resize();

    // Scale particle count for smaller screens
    const scale = Math.min(1, (width * height) / (1920 * 1080));
    const count = Math.max(30, Math.floor(CFG.count * scale));

    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    animate();
  }

  /* ── Events ─────────────────────────────────── */
  const heroEl = canvas.closest('.hero');
  if (heroEl) {
    heroEl.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    heroEl.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animId);
      resize();
      // Re-init particles for new dimensions
      const scale = Math.min(1, (width * height) / (1920 * 1080));
      const count = Math.max(30, Math.floor(CFG.count * scale));
      while (particles.length > count) particles.pop();
      while (particles.length < count) particles.push(new Particle());
      animate();
    }, 200);
  });

  init();
})();
