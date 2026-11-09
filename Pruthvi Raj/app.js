const gallery = document.querySelector('#gallery');
const viewer = document.querySelector('#viewer');
const fullImg = document.querySelector('#full');
const viewerCounter = document.querySelector('#viewer-counter');
const viewerCats = document.querySelector('#viewer-cats');
const viewerWa = document.querySelector('#viewer-wa');
const filterStatus = document.querySelector('#filter-status');

let currentList = [];
let currentIndex = 0;
let slideshowTimer = null;

// 1. Update Category Counts dynamically from the 61 photos dataset
function updateCategoryCounts() {
  document.querySelectorAll('[data-count-for]').forEach(badge => {
    const cat = badge.dataset.countFor;
    const count = cat === 'All'
      ? photos.length
      : photos.filter(p => p.categories.includes(cat)).length;
    badge.textContent = count;
  });
}

// 2. Scroll-Reveal Observer for smooth staggered card animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

// 3. Open Lightbox at a specific index in the currently filtered list
function openViewer(index) {
  if (!currentList.length) return;
  currentIndex = (index + currentList.length) % currentList.length;
  const item = currentList[currentIndex];
  const globalNumber = photos.indexOf(item) + 1;
  const padNum = String(globalNumber).padStart(2, '0');

  fullImg.classList.remove('zoomed');
  fullImg.src = item.file;
  fullImg.alt = `${item.categories.join(', ')} photograph #${padNum}`;

  if (viewerCounter) {
    viewerCounter.textContent = `FRAME #${padNum} · (${currentIndex + 1} OF ${currentList.length})`;
  }
  if (viewerCats) {
    viewerCats.textContent = item.categories.join(' · ');
  }
  if (viewerWa) {
    const msg = encodeURIComponent(
      `Hello Priyanka Studio, I loved Photograph #${padNum} (${item.categories.join(', ')}) in your portfolio and would like to enquire about a booking.`
    );
    viewerWa.href = `https://wa.me/919844427515?text=${msg}`;
  }

  if (!viewer.open) {
    viewer.showModal();
  }
}

function stopSlideshow() {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
    slideshowTimer = null;
    const btn = document.querySelector('#viewer-slideshow');
    if (btn) btn.textContent = '▶ Play';
  }
}

// 4. Render Gallery (All 61 images or filtered subset)
function render(category = 'All') {
  gallery.replaceChildren();
  currentList = photos.filter(p => category === 'All' || p.categories.includes(category));

  if (filterStatus) {
    const label = category === 'Home' ? 'Signature Highlights' : category;
    filterStatus.textContent = `Showing ${currentList.length} ${currentList.length === 1 ? 'photograph' : 'photographs'} in ${label}`;
  }

  currentList.forEach((p, i) => {
    const globalIdx = photos.indexOf(p) + 1;
    const padNum = String(globalIdx).padStart(2, '0');

    const b = document.createElement('button');
    b.className = 'photo-card';
    b.style.transitionDelay = `${(i % 6) * 45}ms`;

    const img = document.createElement('img');
    img.src = p.file;
    img.alt = (p.categories[0] || 'Studio') + ' photograph ' + (i + 1);
    img.loading = 'lazy';
    img.width = p.width;
    img.height = p.height;

    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';
    overlay.innerHTML = `
      <div class="card-top-row">
        <span class="frame-index">#${padNum}</span>
        <span class="expand-pill">Enlarge ↗</span>
      </div>
      <div class="card-bottom-row">
        <span class="card-cats">${p.categories.filter(c => c !== 'Home').join(' · ') || 'Signature Highlight'}</span>
      </div>
    `;

    b.append(img, overlay);
    b.setAttribute('aria-label', 'Enlarge ' + img.alt);
    b.onclick = () => openViewer(i);

    gallery.append(b);
    revealObserver.observe(b);
  });
}

// 5. Filter Buttons Setup
document.querySelectorAll('[data-filter]').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('[data-filter]').forEach(x =>
      x.setAttribute('aria-pressed', String(x === b))
    );
    render(b.dataset.filter);
  };
});

// 6. Gallery Column Density Switcher (Masonry / Compact / Cinema)
document.querySelectorAll('.layout-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.layout-btn').forEach(x => x.classList.toggle('active', x === btn));
    gallery.dataset.columns = btn.dataset.cols;
  };
});

// 7. Build 35mm Infinite Marquee Reel from 'Home' signature photos
function initMarquee() {
  const track = document.querySelector('#marquee-track');
  if (!track) return;
  const highlights = photos.filter(p => p.categories.includes('Home'));
  const reelPhotos = [...highlights, ...highlights]; // Duplicated for seamless loop

  reelPhotos.forEach((p) => {
    const frame = document.createElement('button');
    frame.className = 'film-frame';
    const img = document.createElement('img');
    img.src = p.file;
    img.alt = 'Priyanka Studio Highlight Frame';
    img.loading = 'lazy';
    img.width = p.width;
    img.height = p.height;
    frame.append(img);
    frame.onclick = () => {
      currentList = photos;
      openViewer(photos.indexOf(p));
    };
    track.append(frame);
  });
}

// 8. Build Curated Instagram 6-Post Visual Feed
function initInstagramFeed() {
  const instaGrid = document.querySelector('#insta-grid');
  if (!instaGrid) return;
  const instaUrl = 'https://www.instagram.com/priyanka_photofactory?rpxt=MW9nYTNnOGl3cXM3ZA==';
  const featuredIndices = [0, 1, 5, 13, 33, 54]; // 6 iconic frames from client's 61 photos

  featuredIndices.forEach((idx) => {
    const p = photos[idx] || photos[0];
    const link = document.createElement('a');
    link.href = instaUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'insta-post';
    link.setAttribute('aria-label', 'View on Instagram @priyanka_photofactory');

    link.innerHTML = `
      <img src="${p.file}" alt="Instagram highlight by Priyanka Photofactory" loading="lazy">
      <div class="insta-post-overlay">
        <span>♥ View on Instagram</span>
        <small>@priyanka_photofactory ↗</small>
      </div>
    `;
    instaGrid.append(link);
  });

  const copyBtn = document.querySelector('#copy-insta-btn');
  if (copyBtn) {
    copyBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.url);
        copyBtn.textContent = '✓ Instagram Link Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy Profile Link'; }, 2500);
      } catch {
        window.open(copyBtn.dataset.url, '_blank');
      }
    };
  }
}

// 9. Hero Ken-Burns Automatic Slideshow
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.querySelector('#hero-dots');
  if (!slides.length || !dotsContainer) return;

  let activeSlide = 0;

  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (idx === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Show hero slide ${idx + 1}`);
    dot.onclick = () => goToSlide(idx);
    dotsContainer.append(dot);
  });

  const dots = dotsContainer.querySelectorAll('.hero-dot');

  function goToSlide(index) {
    slides[activeSlide].classList.remove('active');
    dots[activeSlide].classList.remove('active');
    activeSlide = (index + slides.length) % slides.length;
    slides[activeSlide].classList.add('active');
    dots[activeSlide].classList.add('active');
  }

  setInterval(() => goToSlide(activeSlide + 1), 5200);
}

// 10. Interactive WhatsApp Booking Concierge
function initWhatsAppConcierge() {
  const pills = document.querySelectorAll('.occasion-pill');
  const nameInput = document.querySelector('#wa-name');
  const dateInput = document.querySelector('#wa-date');
  const locationInput = document.querySelector('#wa-location');
  const detailsInput = document.querySelector('#wa-details');
  const waBtn = document.querySelector('#dynamic-wa-cta');
  if (!waBtn) return;

  let selectedOccasion = 'Wedding Photography';

  function updateWhatsAppHref() {
    const namePart = nameInput && nameInput.value.trim() ? ` My name is ${nameInput.value.trim()}.` : '';
    const datePart = dateInput && dateInput.value.trim() ? ` Tentative date/month: ${dateInput.value.trim()}.` : '';
    const locationPart = locationInput && locationInput.value.trim() ? ` Event location: ${locationInput.value.trim()}.` : '';
    const detailsPart = detailsInput && detailsInput.value.trim() ? ` Additional details: ${detailsInput.value.trim()}.` : '';
    const text = `Hello Priyanka Studio, I would like to enquire about a ${selectedOccasion} booking.${namePart}${datePart}${locationPart}${detailsPart}`;
    waBtn.href = `https://wa.me/919844427515?text=${encodeURIComponent(text)}`;
  }

  pills.forEach(pill => {
    pill.onclick = () => {
      pills.forEach(p => p.classList.toggle('active', p === pill));
      selectedOccasion = pill.dataset.occasion;
      updateWhatsAppHref();
    };
  });

  if (nameInput) nameInput.addEventListener('input', updateWhatsAppHref);
  if (dateInput) dateInput.addEventListener('input', updateWhatsAppHref);
  if (locationInput) locationInput.addEventListener('input', updateWhatsAppHref);
  if (detailsInput) detailsInput.addEventListener('input', updateWhatsAppHref);
}

function initVideoCollection() {
  const video = document.querySelector('#featured-video');
  const overlay = document.querySelector('#video-feature-overlay');
  const title = document.querySelector('#featured-video-title');
  const play = document.querySelector('#play-featured-video');
  const next = document.querySelector('#next-featured-video');
  const choices = [...document.querySelectorAll('.video-choice')];
  if (!video || !overlay || !title || !play || !next || !choices.length) return;

  let current = 0;
  function selectVideo(index) {
    current = index;
    video.pause();
    video.controls = false;
    video.src = `images/video${index + 1}.mp4`;
    title.textContent = `Film 0${index + 1}`;
    overlay.hidden = false;
    choices.forEach((choice, i) => {
      choice.classList.toggle('active', i === index);
      choice.setAttribute('aria-pressed', String(i === index));
    });
  }
  play.addEventListener('click', () => {
    video.controls = true;
    overlay.hidden = true;
    video.play().catch(() => { video.controls = false; overlay.hidden = false; });
  });
  next.addEventListener('click', () => selectVideo((current + 1) % choices.length));
  choices.forEach((choice, index) => choice.addEventListener('click', () => selectVideo(index)));
  video.addEventListener('ended', () => { video.controls = false; overlay.hidden = false; });
}

// 11. Lightbox Controls (Close, Prev, Next, Zoom, Slideshow, Keyboard & Backdrop click)
document.querySelector('#close').onclick = () => {
  stopSlideshow();
  viewer.close();
};

const prevBtn = document.querySelector('#prev-photo');
const nextBtn = document.querySelector('#next-photo');
const zoomBtn = document.querySelector('#viewer-zoom');
const playBtn = document.querySelector('#viewer-slideshow');

if (prevBtn) prevBtn.onclick = () => openViewer(currentIndex - 1);
if (nextBtn) nextBtn.onclick = () => openViewer(currentIndex + 1);

if (zoomBtn) {
  zoomBtn.onclick = () => {
    const z = fullImg.classList.toggle('zoomed');
    zoomBtn.textContent = z ? '⊖ Reset' : '⊕ Zoom';
  };
}

if (playBtn) {
  playBtn.onclick = () => {
    if (slideshowTimer) {
      stopSlideshow();
    } else {
      playBtn.textContent = '⏸ Pause';
      slideshowTimer = setInterval(() => openViewer(currentIndex + 1), 2800);
    }
  };
}

window.addEventListener('keydown', (e) => {
  if (!viewer.open) return;
  if (e.key === 'ArrowRight') openViewer(currentIndex + 1);
  if (e.key === 'ArrowLeft') openViewer(currentIndex - 1);
});

viewer.addEventListener('click', (e) => {
  if (e.target === viewer) {
    stopSlideshow();
    viewer.close();
  }
});

// 12. Theme Toggle (Default is Dark luxury mode)
const themeBtn = document.querySelector('#theme');
themeBtn.onclick = () => {
  const dark = document.body.classList.toggle('dark');
  themeBtn.textContent = dark ? 'Light theme' : 'Dark theme';
};

// 13. Ambient Cursor Glow & Back to Top Button
const cursorGlow = document.querySelector('#cursor-glow');
window.addEventListener('pointermove', (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }
});

const backToTop = document.querySelector('#back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize Everything
updateCategoryCounts();
initHeroSlider();
initMarquee();
initInstagramFeed();
initWhatsAppConcierge();
initVideoCollection();
render();
