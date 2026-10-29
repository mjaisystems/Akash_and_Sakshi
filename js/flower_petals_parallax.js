/**
 * Luxury Falling Petals & Romantic Hearts Canvas Engine
 * Inspired by the organic natural falling petal physics of weddingblues
 * 
 * Features:
 * 1. Pure natural gravity and harmonic sine-wave sway (no sideways scroll-push drift).
 * 2. Falling romantic hearts throughout the website across all pages.
 * 3. Section-themed botanicals matching user blueprint:
 *    - Hero: Red roses + white mogra + falling hearts
 *    - Blessings: Yellow/orange genda marigold + falling hearts
 *    - Invitation: Sacred lotus + rose + falling hearts
 *    - Countdown: Soft pink lotus + falling hearts
 *    - Functions: Slender Ashoka leaves + marigold + falling hearts
 *    - Gallery: Vibrant bougainvillea + falling hearts
 *    - Closing: Velvet rose + antique gold glitter dust + falling hearts
 * 4. High-visibility fixed overlay (z-index: 99999, pointer-events: none).
 * 5. Retina / HiDPI crisp canvas scaling.
 * 6. Clean ivory aesthetic (no dark background, seamless full screen).
 */

(function () {
  'use strict';

  // Support prefers-reduced-motion gently
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Create full-bleed fixed canvas on document.body
  const canvas = document.createElement('canvas');
  canvas.id = 'flowerParallaxCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';

  function attachCanvas() {
    if (!document.body.contains(canvas)) {
      document.body.appendChild(canvas);
    }
  }

  if (document.body) {
    attachCanvas();
  } else {
    document.addEventListener('DOMContentLoaded', attachCanvas);
  }

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth || document.documentElement.clientWidth || 360;
    height = window.innerHeight || document.documentElement.clientHeight || 640;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Section Palettes & Distinct Botanicals + Falling Hearts
  const sectionThemes = {
    hero: [
      { type: 'heart', color: '#B85D4B', size: 18 },  // Terracotta Rose Heart
      { type: 'heart', color: '#C29B58', size: 17 },  // Antique Gold Heart
      { type: 'petal', color: '#C41E3A', size: 17 },  // Vibrant Red Rose Petal
      { type: 'petal', color: '#8E1620', size: 15 },  // Deep Crimson Petal
      { type: 'mogra', color: '#FFFDF7', size: 13 }   // White Mogra Jasmine
    ],
    blessings: [
      { type: 'heart', color: '#E65100', size: 18 },  // Saffron Gold Heart
      { type: 'heart', color: '#C29B58', size: 16 },  // Antique Brass Heart
      { type: 'marigold', color: '#FFB300', size: 16 },// Golden Genda Petal
      { type: 'marigold', color: '#FF8F00', size: 17 },// Orange Genda Petal
      { type: 'marigold', color: '#FFA000', size: 15 } // Saffron Genda Petal
    ],
    invitation: [
      { type: 'heart', color: '#D4AF37', size: 18 },  // Royal Gold Heart
      { type: 'heart', color: '#B85D4B', size: 16 },  // Rose Terracotta Heart
      { type: 'lotus', color: '#E91E63', size: 18 },  // Sacred Lotus Pink
      { type: 'lotus', color: '#F06292', size: 16 },  // Soft Pink Lotus
      { type: 'petal', color: '#9E1C28', size: 15 }   // Crimson Rose Petal
    ],
    countdown: [
      { type: 'heart', color: '#F48FB1', size: 18 },  // Lotus Blush Pink Heart
      { type: 'heart', color: '#C29B58', size: 16 },  // Antique Gold Heart
      { type: 'heart', color: '#E57373', size: 16 },  // Coral Rose Heart
      { type: 'lotus', color: '#E91E63', size: 18 },  // Vibrant Pink Lotus
      { type: 'lotus', color: '#F8BBD0', size: 15 }   // Blossom Lotus Petal
    ],
    functions: [
      { type: 'heart', color: '#C29B58', size: 18 },  // Antique Brass Heart
      { type: 'heart', color: '#388E3C', size: 16 },  // Emerald Leaf Heart
      { type: 'leaf', color: '#2E7D32', size: 18 },   // Slender Ashoka Leaf
      { type: 'leaf', color: '#43A047', size: 15 },   // Green Leaf
      { type: 'marigold', color: '#FFB300', size: 15 } // Festive Marigold
    ],
    gallery: [
      { type: 'heart', color: '#E91E63', size: 18 },  // Bougainvillea Magenta Heart
      { type: 'heart', color: '#B85D4B', size: 16 },  // Terracotta Heart
      { type: 'bougainvillea', color: '#D81B60', size: 17 }, // Magenta Bract
      { type: 'bougainvillea', color: '#AD1457', size: 15 }, // Deep Magenta
      { type: 'bougainvillea', color: '#EC407A', size: 14 }  // Pink Bract
    ],
    closing: [
      { type: 'heart', color: '#C29B58', size: 19 },  // Antique Gold Heart
      { type: 'heart', color: '#B71C1C', size: 17 },  // Ruby Crimson Heart
      { type: 'petal', color: '#880E4F', size: 16 },  // Velvet Rose Petal
      { type: 'glitter', color: '#FFD700', size: 7 }, // Radiant Gold Diamond
      { type: 'glitter', color: '#C29B58', size: 6 }  // Antique Gold Glitter
    ]
  };

  // Determine current active section on screen using viewport getBoundingClientRect
  function getCurrentSection() {
    const sections = [
      { id: 'rsvpSection', name: 'closing' },
      { id: 'timelineSection', name: 'functions' },
      { id: 'storySection', name: 'gallery' },
      { id: 'countdownSection', name: 'countdown' },
      { id: 'scratchCardSection', name: 'invitation' },
      { id: 'traditionalCardSection', name: 'blessings' },
      { id: 'videoOpeningWrapper', name: 'hero' }
    ];

    const midY = height * 0.45;
    for (let s of sections) {
      const el = document.getElementById(s.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= midY && rect.bottom >= midY) {
          return s.name;
        }
      }
    }
    return 'hero';
  }

  // Draw romantic precision heart
  function drawHeart(c, size) {
    c.beginPath();
    const topY = -size * 0.25;
    const bottomY = size * 0.65;
    const lobeW = size * 0.55;

    c.moveTo(0, topY);
    // Left lobe arch
    c.bezierCurveTo(-lobeW * 0.4, -size * 0.75, -lobeW * 1.15, -size * 0.55, -lobeW, -size * 0.1);
    // Left flank down to point
    c.bezierCurveTo(-lobeW * 0.9, size * 0.3, -lobeW * 0.2, size * 0.5, 0, bottomY);
    // Right flank up from point
    c.bezierCurveTo(lobeW * 0.2, size * 0.5, lobeW * 0.9, size * 0.3, lobeW, -size * 0.1);
    // Right lobe arch back to center
    c.bezierCurveTo(lobeW * 1.15, -size * 0.55, lobeW * 0.4, -size * 0.75, 0, topY);
    c.closePath();
    c.fill();
  }

  // Organic curved petal (exact formula from weddingblues)
  function drawPetal(c, size) {
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
    c.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
    c.fill();
  }

  function drawMogra(c, size) {
    c.beginPath();
    for (let j = 0; j < 5; j++) {
      const ang = (j * Math.PI * 2) / 5;
      const px = Math.cos(ang) * size * 0.55;
      const py = Math.sin(ang) * size * 0.55;
      c.arc(px, py, size * 0.35, 0, Math.PI * 2);
    }
    c.fill();
    c.save();
    c.fillStyle = '#C29B58';
    c.beginPath();
    c.arc(0, 0, size * 0.22, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }

  function drawMarigold(c, size) {
    c.beginPath();
    c.moveTo(-size * 0.4, size * 0.6);
    c.quadraticCurveTo(-size * 0.6, 0, -size * 0.3, -size * 0.5);
    c.quadraticCurveTo(0, -size * 0.75, size * 0.3, -size * 0.5);
    c.quadraticCurveTo(size * 0.6, 0, size * 0.4, size * 0.6);
    c.closePath();
    c.fill();
  }

  function drawLotus(c, size) {
    c.beginPath();
    c.moveTo(0, -size);
    c.quadraticCurveTo(size * 0.6, -size * 0.2, 0, size * 0.8);
    c.quadraticCurveTo(-size * 0.6, -size * 0.2, 0, -size);
    c.closePath();
    c.fill();
  }

  function drawLeaf(c, size) {
    c.beginPath();
    c.moveTo(0, -size * 1.35);
    c.quadraticCurveTo(size * 0.45, 0, 0, size * 1.35);
    c.quadraticCurveTo(-size * 0.45, 0, 0, -size * 1.35);
    c.closePath();
    c.fill();
  }

  function drawBougainvillea(c, size) {
    c.beginPath();
    c.moveTo(0, -size * 0.9);
    c.bezierCurveTo(size * 0.85, -size * 0.5, size * 0.85, size * 0.5, 0, size * 0.9);
    c.bezierCurveTo(-size * 0.85, size * 0.5, -size * 0.85, -size * 0.5, 0, -size * 0.9);
    c.closePath();
    c.fill();
  }

  function drawGlitter(c, size) {
    c.beginPath();
    c.moveTo(0, -size * 1.3);
    c.lineTo(size * 0.4, -size * 0.2);
    c.lineTo(size * 1.3, 0);
    c.lineTo(size * 0.4, size * 0.2);
    c.lineTo(0, size * 1.3);
    c.lineTo(-size * 0.4, size * 0.2);
    c.lineTo(-size * 1.3, 0);
    c.lineTo(-size * 0.4, -size * 0.2);
    c.closePath();
    c.fill();
  }

  // Particle Class with natural falling physics
  class NaturalParticle {
    constructor(index) {
      this.layer = index % 3; // 0: far, 1: mid, 2: near
      this.reset(true);
    }

    reset(initialSpread) {
      this.x = Math.random() * width;
      this.y = initialSpread ? Math.random() * height : -25 - Math.random() * 30;
      
      const speedMultiplier = prefersReduced ? 0.45 : 1.0;
      // Layer-based depth fall speeds (far is gentler, near is slightly faster)
      if (this.layer === 0) {
        this.speedY = (0.75 + Math.random() * 0.5) * speedMultiplier;
        this.scale = 0.85;
        this.opacity = 0.55 + Math.random() * 0.2;
      } else if (this.layer === 1) {
        this.speedY = (1.1 + Math.random() * 0.6) * speedMultiplier;
        this.scale = 1.05;
        this.opacity = 0.75 + Math.random() * 0.2;
      } else {
        this.speedY = (1.5 + Math.random() * 0.7) * speedMultiplier;
        this.scale = 1.35;
        this.opacity = 0.85 + Math.random() * 0.15;
      }

      this.speedX = -0.3 + Math.random() * 0.6; // Subtle natural air current
      this.phase = Math.random() * Math.PI * 2; // Independent sway phase
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.025;
      this.flip = Math.random() * Math.PI * 2;
      this.flipSpeed = 0.015 + Math.random() * 0.02;
    }

    update() {
      // Natural steady vertical fall
      this.y += this.speedY;

      // Organic harmonic sine-wave sway directly proportional to y position (from weddingblues)
      // No scroll-drift kicking to the right; falls calmly and naturally
      this.x += Math.sin(this.y * 0.014 + this.phase) * 0.75 + this.speedX;
      
      this.rotation += this.rotSpeed;
      this.flip += this.flipSpeed;

      // Wrap-around boundaries
      if (this.y > height + 25) {
        this.reset(false);
      }
      if (this.x < -30) this.x = width + 30;
      if (this.x > width + 30) this.x = -30;
    }

    draw(currentTheme) {
      const themeItems = sectionThemes[currentTheme] || sectionThemes.hero;
      const item = themeItems[(this.layer + Math.floor(this.phase * 3)) % themeItems.length];

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // Gentle 3D flutter: oscillates smoothly between 0.55 and 1.0
      const flutter = 0.55 + 0.45 * Math.cos(this.flip);
      ctx.scale(this.scale * flutter, this.scale);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = item.color;

      const size = item.size;
      switch (item.type) {
        case 'heart':
          drawHeart(ctx, size);
          if (this.layer >= 1) {
            ctx.save();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.beginPath();
            ctx.ellipse(-size * 0.2, -size * 0.28, size * 0.12, size * 0.07, -Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          break;
        case 'petal':
          drawPetal(ctx, size);
          break;
        case 'mogra':
          drawMogra(ctx, size);
          break;
        case 'marigold':
          drawMarigold(ctx, size);
          break;
        case 'lotus':
          drawLotus(ctx, size);
          break;
        case 'leaf':
          drawLeaf(ctx, size);
          break;
        case 'bougainvillea':
          drawBougainvillea(ctx, size);
          break;
        case 'glitter':
          drawGlitter(ctx, size);
          break;
        default:
          drawPetal(ctx, size);
      }

      ctx.restore();
    }
  }

  // Create particles (balanced count for smooth 60fps luxury look)
  const MAX_PARTICLES = prefersReduced ? 18 : 34;
  const particles = [];
  for (let i = 0; i < MAX_PARTICLES; i++) {
    particles.push(new NaturalParticle(i));
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    const currentTheme = getCurrentSection();
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(currentTheme);
    }

    requestAnimationFrame(animate);
  }

  // Start animation loop
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animate);
  } else {
    animate();
  }
})();
