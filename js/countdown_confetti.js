/**
 * Animation 5: Live Countdown Timer & Confetti Burst
 */

(function () {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const countdownSection = document.getElementById('countdownSection');
  const confettiCanvas = document.getElementById('confettiCanvas');

  // 1. Live Countdown Timer
  const targetDateStr = countdownSection ? countdownSection.dataset.target : '2026-12-14T19:00:00+05:30';
  const targetDate = new Date(targetDateStr).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minutesEl) minutesEl.innerText = '00';
      if (secondsEl) secondsEl.innerText = '00';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = d < 10 ? '0' + d : d;
    if (hoursEl) hoursEl.innerText = h < 10 ? '0' + h : h;
    if (minutesEl) minutesEl.innerText = m < 10 ? '0' + m : m;
    if (secondsEl) secondsEl.innerText = s < 10 ? '0' + s : s;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 2. Confetti Particle Burst Engine
  let confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  let confettiParticles = [];
  let confettiBurstTriggered = false;

  function resizeConfetti() {
    if (confettiCanvas && countdownSection) {
      confettiCanvas.width = countdownSection.offsetWidth;
      confettiCanvas.height = countdownSection.offsetHeight;
    }
  }
  window.addEventListener('resize', resizeConfetti);
  resizeConfetti();

  function triggerConfettiBurst() {
    if (!confettiCanvas || !confettiCtx) return;
    resizeConfetti();
    confettiParticles = [];
    const colors = ['#C5A46D', '#E8D3A7', '#D4AF37', '#781822', '#F7EFE2', '#E8A598', '#FFD700'];

    const count = 120;
    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: confettiCanvas.width / 2 + (Math.random() - 0.5) * 60,
        y: confettiCanvas.height * 0.35,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 9 - 4,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        wobble: Math.random() * 10,
        alpha: 1,
        isPetal: Math.random() > 0.6
      });
    }
    animateConfetti();
  }

  function animateConfetti() {
    if (!confettiCtx || !confettiCanvas) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let hasActive = false;
    for (let p of confettiParticles) {
      if (p.alpha > 0.05 && p.y < confettiCanvas.height) {
        hasActive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.vRot;
        p.wobble += 0.08;
        p.alpha -= 0.006;

        confettiCtx.save();
        confettiCtx.globalAlpha = Math.max(0, p.alpha);
        confettiCtx.fillStyle = p.color;
        confettiCtx.translate(p.x + Math.sin(p.wobble) * 2, p.y);
        confettiCtx.rotate(p.rotation);

        if (p.isPetal) {
          // Curved Rose Petal shape
          confettiCtx.beginPath();
          confettiCtx.ellipse(0, 0, p.size, p.size * 1.5, Math.PI / 4, 0, Math.PI * 2);
          confettiCtx.fill();
        } else {
          // Metallic confetti flake
          confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.8);
        }
        confettiCtx.restore();
      }
    }

    if (hasActive) {
      requestAnimationFrame(animateConfetti);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // Trigger burst when Countdown scrolls into view
  if ('IntersectionObserver' in window && countdownSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !confettiBurstTriggered) {
          confettiBurstTriggered = true;
          triggerConfettiBurst();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(countdownSection);
  }

  // .ics Calendar file generator
  const downloadIcsBtn = document.getElementById('downloadIcsBtn');
  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = downloadIcsBtn.dataset.title || 'Wedding Ceremony';
      const venue = downloadIcsBtn.dataset.venue || 'Wedding Venue';
      const start = '20261214T133000Z';
      const end = '20261214T193000Z';
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `LOCATION:${venue}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        'DESCRIPTION:Wedding celebration and sacred ceremonies',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'wedding_invitation.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
})();
