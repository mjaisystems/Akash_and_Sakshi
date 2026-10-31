/**
 * Video Opening & Endscreen Names Reveal Engine
 * Plays envelope opening video on tap, reveals couple names on endscreen, and unlocks page scrolling.
 */

(function () {
  const videoTapOverlay = document.getElementById('videoTapOverlay');
  const tapSealBtn = document.getElementById('tapSealBtn');
  const openingVideo = document.getElementById('openingEnvelopeVideo');
  const videoEndscreenReveal = document.getElementById('videoEndscreenReveal');
  const lightTrailCanvas = document.getElementById('lightTrailCanvas');
  const bgAudio = document.getElementById('bgAudio');
  const musicToggleBtn = document.getElementById('musicToggleBtn');

  let trailCtx = lightTrailCanvas ? lightTrailCanvas.getContext('2d') : null;
  let hasStarted = false;
  let isPlayingAudio = false;

  // Set initial scroll lock
  document.body.classList.add('scroll-locked');

  function resizeTrailCanvas() {
    if (lightTrailCanvas && videoEndscreenReveal) {
      lightTrailCanvas.width = videoEndscreenReveal.offsetWidth;
      lightTrailCanvas.height = videoEndscreenReveal.offsetHeight;
    }
  }
  window.addEventListener('resize', resizeTrailCanvas);

  // ==========================================================================
  // ULTRA-FAST IN-MEMORY BLOB PRELOADER
  // Downloads video into local RAM blob cache immediately on page load
  // ==========================================================================
  if (openingVideo) {
    openingVideo.preload = 'auto';

    const sourceEl = openingVideo.querySelector('source');
    const videoUrl = (sourceEl ? sourceEl.getAttribute('src') : openingVideo.src) || 'video/envelope_opening.mp4';

    fetch(videoUrl)
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.blob();
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        openingVideo.src = blobUrl;
        openingVideo.load();
      })
      .catch(err => {
        console.log('Progressive HTTP streaming active:', err);
      });
  }

  function startInvitation() {
    if (hasStarted) return;
    hasStarted = true;

    // 1. Instant tactile visual feedback on tap (Golden Bloom Ripple)
    if (videoTapOverlay) {
      videoTapOverlay.classList.add('opening-active');
    }

    // 2. Play background audio safely (user gesture unlocks audio context)
    if (bgAudio) {
      bgAudio.volume = 0.5;
      bgAudio.play().then(() => {
        isPlayingAudio = true;
        if (musicToggleBtn) musicToggleBtn.classList.add('playing');
      }).catch(err => {
        console.log('Background audio playback note:', err);
      });
    }

    // 3. Play envelope opening video with zero-flicker transition
    if (openingVideo) {
      let overlayHidden = false;
      function hideOverlay() {
        if (!overlayHidden && videoTapOverlay) {
          overlayHidden = true;
          videoTapOverlay.classList.add('hidden');
        }
      }

      // Seamless hand-off: only fade out still card once video frames are actively playing
      openingVideo.addEventListener('playing', hideOverlay, { once: true });
      openingVideo.addEventListener('timeupdate', () => {
        if (openingVideo.currentTime > 0.05) {
          hideOverlay();
        }
      });
      // Safety fallback
      setTimeout(hideOverlay, 1500);

      const playPromise = openingVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Video play error, triggering fallback reveal:', err);
          hideOverlay();
          revealEndscreen();
        });
      }

      // Detect end of video or near-end
      openingVideo.addEventListener('timeupdate', () => {
        if (openingVideo.duration && openingVideo.currentTime >= openingVideo.duration - 0.45) {
          revealEndscreen();
        }
      });
      openingVideo.addEventListener('ended', revealEndscreen);
    } else {
      revealEndscreen();
    }
  }

  function revealEndscreen() {
    if (videoEndscreenReveal.classList.contains('active')) return;
    videoEndscreenReveal.classList.add('active');

    // Unlock document scrolling
    document.body.classList.remove('scroll-locked');
    document.body.classList.add('scroll-unlocked');

    // Initialize cinematic swirling golden light trails
    resizeTrailCanvas();
    initLightTrails();
  }

  if (tapSealBtn) {
    tapSealBtn.addEventListener('click', startInvitation);
  }
  if (videoTapOverlay) {
    videoTapOverlay.addEventListener('click', startInvitation);
  }

  // Audio Toggle
  if (musicToggleBtn && bgAudio) {
    musicToggleBtn.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play();
        musicToggleBtn.classList.add('playing');
        isPlayingAudio = true;
      } else {
        bgAudio.pause();
        musicToggleBtn.classList.remove('playing');
        isPlayingAudio = false;
      }
    });
  }

  // Auto-pause audio on tab hidden
  document.addEventListener('visibilitychange', () => {
    if (!bgAudio) return;
    if (document.hidden) {
      if (!bgAudio.paused) bgAudio.pause();
    } else {
      if (isPlayingAudio) bgAudio.play();
    }
  });

  // Golden Light Trails Animation on Endscreen
  let lightTrails = [];
  function initLightTrails() {
    if (!lightTrailCanvas || !trailCtx) return;
    const w = lightTrailCanvas.width;
    const h = lightTrailCanvas.height;

    lightTrails = [];
    const trailCount = 4;
    for (let i = 0; i < trailCount; i++) {
      lightTrails.push({
        x: Math.random() * w,
        y: Math.random() * h,
        targetX: w / 2 + (Math.random() - 0.5) * (w * 0.7),
        targetY: h / 2 + (Math.random() - 0.5) * (h * 0.45),
        angle: Math.random() * Math.PI * 2,
        speed: 2.2 + Math.random() * 2,
        history: []
      });
    }
    animateLightTrails();
  }

  function animateLightTrails() {
    if (!trailCtx || !lightTrailCanvas) return;
    const w = lightTrailCanvas.width;
    const h = lightTrailCanvas.height;

    trailCtx.clearRect(0, 0, w, h);

    for (let t of lightTrails) {
      const dx = t.targetX - t.x;
      const dy = t.targetY - t.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 40) {
        t.targetX = w / 2 + (Math.random() - 0.5) * (w * 0.7);
        t.targetY = h / 2 + (Math.random() - 0.5) * (h * 0.45);
      }

      t.angle += (Math.atan2(dy, dx) - t.angle) * 0.04;
      t.x += Math.cos(t.angle) * t.speed;
      t.y += Math.sin(t.angle) * t.speed;

      t.history.push({ x: t.x, y: t.y });
      if (t.history.length > 30) {
        t.history.shift();
      }

      if (t.history.length > 2) {
        for (let i = 1; i < t.history.length; i++) {
          const ratio = i / t.history.length;
          trailCtx.save();
          trailCtx.strokeStyle = `rgba(238, 215, 161, ${ratio * 0.7})`;
          trailCtx.lineWidth = ratio * 3;
          trailCtx.shadowBlur = 10;
          trailCtx.shadowColor = '#D4AF37';
          trailCtx.beginPath();
          trailCtx.moveTo(t.history[i - 1].x, t.history[i - 1].y);
          trailCtx.lineTo(t.history[i].x, t.history[i].y);
          trailCtx.stroke();
          trailCtx.restore();
        }
      }

      trailCtx.save();
      trailCtx.fillStyle = '#FFFEE8';
      trailCtx.shadowBlur = 14;
      trailCtx.shadowColor = '#FFD700';
      trailCtx.beginPath();
      trailCtx.arc(t.x, t.y, 2, 0, Math.PI * 2);
      trailCtx.fill();
      trailCtx.restore();
    }

    requestAnimationFrame(animateLightTrails);
  }
})();
