/* ── Portfolio Script ── */

// ══ Custom cursor ══
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let cx = 0, cy = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  tx = e.clientX; ty = e.clientY;
  cursorDot.style.left = tx + 'px';
  cursorDot.style.top  = ty + 'px';
});

(function animateCursor() {
  cx += (tx - cx) * 0.12;
  cy += (ty - cy) * 0.12;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .proj-card, .ci, .chip').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// ══ Navbar scroll effect ══
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ══ Hamburger / mobile menu ══
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4px,5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobile() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

// ══ Scroll reveal ══
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// ══ Skill bar animation on scroll ══
const barFills = document.querySelectorAll('.bar-fill');
const barObs   = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.3 });
barFills.forEach(b => {
  b.style.animationPlayState = 'paused';
  barObs.observe(b);
});

// ══ Active nav link highlighting ══
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--text)';
    }
  });
});

// ══ Contact form ══
function handleSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const success = document.getElementById('formSuccess');

  btn.disabled  = true;
  btnText.textContent = 'Sending…';

  setTimeout(() => {
    btnText.textContent  = 'Message Sent!';
    success.classList.add('show');
    btn.disabled = false;
    e.target.reset();

    setTimeout(() => {
      btnText.textContent = 'Send Message';
      success.classList.remove('show');
    }, 5000);
  }, 1200);
}

// ══ Smooth scroll for in-page links ══
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
