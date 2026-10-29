/**
 * Animation 4: Pure Heart-Shaped "Scratch to Reveal" Engine
 * Erases gold foil strictly on the heart silhouette.
 * On reveal: Heading dynamically morphs into "Save the Date" with NO calendar buttons.
 */

(function () {
  const canvas = document.getElementById('scratchCanvas');
  const stage = document.querySelector('.pure-heart-stage');
  const heading = document.getElementById('scratchHeading');
  const subtitle = document.getElementById('scratchSubtitle');
  if (!canvas || !stage) return;

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let isRevealed = false;
  let brushRadius = 24;

  function initScratchCanvas() {
    canvas.width = stage.offsetWidth;
    canvas.height = stage.offsetHeight;

    const w = canvas.width;
    const h = canvas.height;

    // Draw Gold Foil Metallic Gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#B8860B');
    grad.addColorStop(0.2, '#E6CA65');
    grad.addColorStop(0.4, '#FFF7D6');
    grad.addColorStop(0.6, '#D4AF37');
    grad.addColorStop(0.8, '#AA7C11');
    grad.addColorStop(1, '#855A05');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Stippled sparkling texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 450; i++) {
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }

    // Inner embossed heart line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1.5;
    drawHeartPath(ctx, w * 0.82, h * 0.82, w * 0.09, h * 0.09);
    ctx.stroke();

    // Stamped Text in center of heart
    ctx.fillStyle = '#4A3305';
    ctx.font = 'bold 16px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText('SCRATCH HERE', w / 2, h * 0.48);
  }

  function drawHeartPath(c, w, h, offsetX = 0, offsetY = 0) {
    c.save();
    c.translate(offsetX, offsetY);
    c.beginPath();
    c.moveTo(w / 2, h * 0.9);
    c.bezierCurveTo(w * 0.15, h * 0.65, 0, h * 0.45, 0, h * 0.28);
    c.bezierCurveTo(0, h * 0.08, w * 0.18, 0, w * 0.35, 0);
    c.bezierCurveTo(w * 0.44, 0, w / 2, h * 0.12, w / 2, h * 0.18);
    c.bezierCurveTo(w / 2, h * 0.12, w * 0.56, 0, w * 0.65, 0);
    c.bezierCurveTo(w * 0.82, 0, w, h * 0.08, w, h * 0.28);
    c.bezierCurveTo(w, h * 0.45, w * 0.85, h * 0.65, w / 2, h * 0.9);
    c.closePath();
    c.restore();
  }

  function scratch(e) {
    if (isRevealed) return;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  }

  // Calculate percentage of pixels cleared inside the heart
  let checkThrottle = 0;
  function checkScratchPercentage() {
    checkThrottle++;
    if (checkThrottle % 4 !== 0) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let transparent = 0;
    const total = data.length / 4;

    for (let i = 3; i < data.length; i += 24) {
      if (data[i] === 0) {
        transparent++;
      }
    }

    const percent = (transparent / (total / 6)) * 100;
    if (percent > 38 && !isRevealed) {
      revealFullContent();
    }
  }

  function revealFullContent() {
    isRevealed = true;
    canvas.style.opacity = '0';

    // Trigger golden border animation on the heart outline
    if (stage) {
      stage.classList.add('revealed');
    }

    // Dynamic Title Morph: "Scratch to Reveal" -> "Save the Date"
    if (heading) {
      heading.style.opacity = '0';
      heading.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        heading.innerText = 'Save the Date';
        heading.style.opacity = '1';
        heading.style.transform = 'translateY(0)';
      }, 350);
    }

    if (subtitle) {
      subtitle.style.opacity = '0';
      setTimeout(() => {
        subtitle.innerText = "We Can't Wait to Celebrate With You!";
        subtitle.style.opacity = '1';
      }, 350);
    }

    setTimeout(() => {
      canvas.style.display = 'none';
    }, 800);
  }

  // Event Listeners for Touch and Mouse
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    scratch(e);
  });
  window.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) scratch(e);
  });

  canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    scratch(e);
  }, { passive: true });
  window.addEventListener('touchend', () => { isDrawing = false; });
  canvas.addEventListener('touchmove', (e) => {
    if (isDrawing) scratch(e);
  }, { passive: true });

  window.addEventListener('load', initScratchCanvas);
  window.addEventListener('resize', () => {
    if (!isRevealed) initScratchCanvas();
  });
})();
