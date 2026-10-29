/**
 * Animation 6 & 7: "Our Story" Touch-Swipe Engine & Interactive Winding Timeline
 */

(function () {
  // ============================================================================
  // ANIMATION 6: "OUR STORY" TOUCH-SWIPE ENGINE
  // ============================================================================
  const track = document.getElementById('storyTrack');
  const container = document.querySelector('.story-carousel-container');
  const slides = document.querySelectorAll('.story-slide');
  const prevBtn = document.getElementById('storyPrev');
  const nextBtn = document.getElementById('storyNext');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  function updateSlidePosition(animate = true) {
    if (!track) return;
    track.style.transition = animate ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      currentSlide = 0; // loop
    }
    updateSlidePosition(true);
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = totalSlides - 1; // loop
    }
    updateSlidePosition(true);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  dots.forEach(d => {
    d.addEventListener('click', () => {
      currentSlide = parseInt(d.dataset.index, 10);
      updateSlidePosition(true);
    });
  });

  // Touch Swipe with live finger tracking
  if (container && track) {
    container.addEventListener('touchstart', (e) => {
      if (totalSlides <= 1) return;
      isSwiping = true;
      startX = e.touches[0].clientX;
      currentX = startX;
      track.style.transition = 'none';
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      currentX = e.touches[0].clientX;
      const diffX = currentX - startX;
      const currentOffset = -currentSlide * container.offsetWidth;
      track.style.transform = `translateX(${currentOffset + diffX}px)`;
    }, { passive: true });

    container.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      const diffX = currentX - startX;
      const threshold = 45; // pixels to trigger slide change

      if (diffX < -threshold) {
        nextSlide();
      } else if (diffX > threshold) {
        prevSlide();
      } else {
        updateSlidePosition(true); // snap back
      }
    });

    // Mouse drag support for desktop preview
    let isMouseDown = false;
    container.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      startX = e.clientX;
      currentX = startX;
      track.style.transition = 'none';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      currentX = e.clientX;
      const diffX = currentX - startX;
      const currentOffset = -currentSlide * container.offsetWidth;
      track.style.transform = `translateX(${currentOffset + diffX}px)`;
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const diffX = currentX - startX;
      if (diffX < -45) nextSlide();
      else if (diffX > 45) prevSlide();
      else updateSlidePosition(true);
    });
  }

  // ============================================================================
  // ANIMATION 7: WINDING SVG THREAD & SCROLL-DRIVEN MOVING HEART MARKER
  // (Strictly following https://nishkam-b.github.io/Wedding-Blueprint prompts)
  // ============================================================================
  const timelineSvg = document.getElementById('timelineSvg');
  const pathBg = document.getElementById('timelinePathBg');
  const pathActive = document.getElementById('timelinePathActive');
  const heartMarker = document.getElementById('timelineHeartMarker');
  const timelineWrapper = document.querySelector('.timeline-wrapper');
  const eventCards = document.querySelectorAll('.event-card');

  function buildWindingPath() {
    if (!timelineWrapper || !timelineSvg || !pathBg || !pathActive || eventCards.length === 0) return;

    const totalHeight = timelineWrapper.offsetHeight;
    const width = 40;

    timelineSvg.setAttribute('viewBox', `0 0 ${width} ${totalHeight}`);
    timelineSvg.style.height = `${totalHeight}px`;

    let d = `M 20 12 `;
    const step = totalHeight / (eventCards.length * 2);

    for (let i = 0; i < eventCards.length * 2; i++) {
      const y = (i + 1) * step;
      const x = i % 2 === 0 ? 32 : 8;
      d += `S ${x} ${y - step / 2}, 20 ${y} `;
    }

    pathBg.setAttribute('d', d);
    pathActive.setAttribute('d', d);

    const pathLength = pathActive.getTotalLength();
    pathActive.style.strokeDasharray = pathLength;
    pathActive.style.strokeDashoffset = pathLength;
  }

  function updateTimelineProgress() {
    if (!timelineWrapper || !pathActive || !heartMarker) return;

    const rect = timelineWrapper.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalH = timelineWrapper.offsetHeight;

    const startY = windowH * 0.75;
    const progress = Math.min(Math.max((startY - rect.top) / totalH, 0), 1);

    const pathLength = pathActive.getTotalLength();
    const activeLength = pathLength * progress;

    pathActive.style.strokeDashoffset = pathLength - activeLength;

    if (activeLength > 0 && activeLength <= pathLength) {
      const pt = pathActive.getPointAtLength(activeLength);
      heartMarker.style.top = `${pt.y}px`;
      heartMarker.style.left = `${pt.x}px`;
      heartMarker.style.opacity = '1';
    } else {
      heartMarker.style.opacity = '0.4';
    }
  }

  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  window.addEventListener('resize', () => {
    buildWindingPath();
    updateTimelineProgress();
  });

    window.addEventListener('load', () => {
    setTimeout(() => {
      buildWindingPath();
      updateTimelineProgress();
    }, 200);
  });

  // ============================================================================
  // ADD TO CALENDAR SMART HANDLER (Apple Calendar .ICS for iOS / Google Calendar for Android)
  // Timezone: GMT + 5.30 India Standard Time - Kolkata
  // ============================================================================
  function initCalendarButtons() {
    document.querySelectorAll('.event-btn.calendar').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const isApple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) && !window.MSStream;
        if (isApple && btn.dataset.start && btn.dataset.title) {
          e.preventDefault();
          const title = btn.dataset.title || 'Wedding Ceremony';
          const start = btn.dataset.start;
          const end = btn.dataset.end || start;
          const location = btn.dataset.location || '';
          const desc = btn.dataset.details || '';
          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '_');

          const icsLines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Luxury Wedding Invitation//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VTIMEZONE',
            'TZID:Asia/Kolkata',
            'TZURL:http://tzurl.org/zoneinfo-outlook/Asia/Kolkata',
            'X-LIC-LOCATION:Asia/Kolkata',
            'BEGIN:STANDARD',
            'TZOFFSETFROM:+0530',
            'TZOFFSETTO:+0530',
            'TZNAME:IST',
            'DTSTART:19700101T000000',
            'END:STANDARD',
            'END:VTIMEZONE',
            'BEGIN:VEVENT',
            `SUMMARY:${title}`,
            `DESCRIPTION:${desc.replace(/\n/g, '\\n')}`,
            `LOCATION:${location.replace(/\n/g, '\\n')}`,
            `DTSTART;TZID=Asia/Kolkata:${start}`,
            `DTEND;TZID=Asia/Kolkata:${end}`,
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR'
          ];

          const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
          const dlLink = document.createElement('a');
          dlLink.href = URL.createObjectURL(blob);
          dlLink.setAttribute('download', `${slug}.ics`);
          document.body.appendChild(dlLink);
          dlLink.click();
          document.body.removeChild(dlLink);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendarButtons);
  } else {
    initCalendarButtons();
  }
})();
