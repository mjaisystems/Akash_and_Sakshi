/**
 * Animation 9: RSVP & Thank You Form with Checkmark Animation & WhatsApp Direct Sync
 */

(function () {
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccessBox = document.getElementById('rsvpSuccessBox');
  const guestNameInput = document.getElementById('guestName');
  const attendanceSelect = document.getElementById('attendanceSelect');
  const guestCountSelect = document.getElementById('guestCount');
  const guestWishesInput = document.getElementById('guestWishes');
  const whatsappDirectBtn = document.getElementById('whatsappDirectBtn');
  const shareWhatsAppBtn = document.getElementById('shareWhatsAppBtn');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // Submit Handler
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = guestNameInput.value.trim();
      const attendance = attendanceSelect.value;
      const count = guestCountSelect.value;
      const wishes = guestWishesInput.value.trim();

      if (!name) {
        guestNameInput.focus();
        return;
      }

      // Save locally
      const rsvpData = { name, attendance, count, wishes, timestamp: new Date().toISOString() };
      try {
        const stored = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
        stored.push(rsvpData);
        localStorage.setItem('wedding_rsvps', JSON.stringify(stored));
      } catch (err) {
        console.warn('localStorage error', err);
      }

      // Configure WhatsApp Direct Response Link
      const hostPhone = rsvpForm.dataset.whatsapp || '+919876543210';
      const cleanPhone = hostPhone.replace(/[^0-9]/g, '');
      const waMessage = encodeURIComponent(
        `✨ Wedding RSVP ✨\n\n` +
        `Guest: ${name}\n` +
        `Attendance: ${attendance}\n` +
        `Guests: ${count}\n` +
        (wishes ? `Blessings: "${wishes}"\n\n` : '\n') +
        `Looking forward to celebrating with you! ❤️`
      );

      if (whatsappDirectBtn) {
        whatsappDirectBtn.href = `https://wa.me/${cleanPhone}?text=${waMessage}`;
      }

      // Hide form & trigger checkmark success animation
      rsvpForm.style.display = 'none';
      if (rsvpSuccessBox) {
        rsvpSuccessBox.classList.add('active');
      }
    });
  }

  // Global WhatsApp Share Button
  if (shareWhatsAppBtn) {
    shareWhatsAppBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const coupleNames = shareWhatsAppBtn.dataset.couple || 'Akash & Sakshi';
      const url = window.location.href;
      const text = encodeURIComponent(
        `💌 You are cordially invited to celebrate the wedding of ${coupleNames}!\n\n` +
        `Tap the interactive invitation link below to view ceremonies, venues & RSVP:\n${url}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    });
  }

  // Share Invite Button (Native phone function for Android & iPhone)
  const shareInviteBtn = document.getElementById('shareInviteBtn');
  if (shareInviteBtn) {
    shareInviteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const coupleNames = (document.querySelector('.hero-couple-names') ? document.querySelector('.hero-couple-names').textContent.replace(/\s+/g, ' ').trim() : 'Akash & Sakshi');
      const shareUrl = window.location.href.startsWith('http') ? window.location.href : '';
      const sharePayload = {
        title: `Wedding Invitation - ${coupleNames}`,
        text: `You are cordially invited to celebrate the wedding ceremony of ${coupleNames}! Please tap the link to view celebrations, venues & RSVP:`
      };
      if (shareUrl) {
        sharePayload.url = shareUrl;
      }

      if (navigator.share) {
        navigator.share(sharePayload).catch((err) => {
          if (err.name !== 'AbortError') {
            console.warn('Native share dismissed or failed, opening WhatsApp fallback:', err);
            triggerWhatsAppShare(coupleNames);
          }
        });
      } else {
        triggerWhatsAppShare(coupleNames);
      }
    });
  }

  function triggerWhatsAppShare(coupleNames) {
    const text = encodeURIComponent(
      `💌 You are cordially invited to celebrate the wedding of ${coupleNames}!\n\n` +
      `Tap the interactive invitation link below to view ceremonies, venues & RSVP:\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  }

  // Copy Link Button with "Copied! ✓" visual feedback
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const copyLinkText = document.getElementById('copyLinkText');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = window.location.href;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url);
        } else {
          const temp = document.createElement('input');
          temp.value = url;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
        }
        if (copyLinkText) copyLinkText.textContent = 'Copied! ✓';
        copyLinkBtn.classList.add('copied');
        setTimeout(() => {
          if (copyLinkText) copyLinkText.textContent = 'Copy Link';
          copyLinkBtn.classList.remove('copied');
        }, 2200);
      } catch (err) {
        console.warn('Clipboard copy error', err);
      }
    });
  }

  // Save as PDF Button (Native print dialog: cover page = endscreen with couple names)
  const savePdfBtn = document.getElementById('savePdfBtn');
  if (savePdfBtn) {
    savePdfBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const endscreen = document.getElementById('videoEndscreenReveal');
      if (endscreen) endscreen.classList.add('active');
      window.print();
    });
  }

  // Back to Top Smooth Scroll
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
