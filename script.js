/* ===========================
   STARFIELD CANVAS
=========================== */
(function () {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        o: Math.random() * 0.65 + 0.1,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,229,195,${s.o})`;
      ctx.fill();
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = W;
      if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H;
      if (s.y > H) s.y = 0;
    });
    requestAnimationFrame(draw);
  }

  resize();
  initStars();
  draw();
  window.addEventListener('resize', () => { resize(); initStars(); });
})();


/* ===========================
   TYPING EFFECT
=========================== */
(function () {
  const roles = [
    'Electrical Engineering Student',
    'Python Developer',
    'AI & IoT Enthusiast',
    'Computer Vision Builder',
    'Frontend Developer',
  ];
  let ri = 0, ci = 0, deleting = false;
  const el = document.getElementById('typed-text');

  function type() {
    const cur = roles[ri];
    if (!deleting) {
      el.textContent = cur.slice(0, ci++);
      if (ci > cur.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
    } else {
      el.textContent = cur.slice(0, ci--);
      if (ci < 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        ci = 0;
      }
    }
    setTimeout(type, deleting ? 45 : 85);
  }

  setTimeout(type, 700);
})();


/* ===========================
   NAVBAR SCROLL EFFECT + HAMBURGER
=========================== */
(function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();


/* ===========================
   SMOOTH ACTIVE NAV HIGHLIGHT
=========================== */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--cyan)';
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ===========================
   SCROLL REVEAL
=========================== */
(function () {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();


/* ===========================
   SKILL BAR ANIMATION
=========================== */
(function () {
  const fills = document.querySelectorAll('.skill-fill');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = e.target.dataset.width;
        e.target.style.width = target + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => io.observe(f));
})();


/* ===========================
   CONTACT FORM
=========================== */
function handleFormSend() {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const msg     = document.getElementById('cf-msg').value.trim();
  const success = document.getElementById('form-success');

  if (!name || !email || !msg) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Simulate sending
  success.classList.remove('hidden');
  document.getElementById('cf-name').value = '';
  document.getElementById('cf-email').value = '';
  document.getElementById('cf-subject').value = '';
  document.getElementById('cf-msg').value = '';

  setTimeout(() => success.classList.add('hidden'), 5000);
}


/* ===========================
   SMOOTH SCROLL FOR ANCHOR LINKS
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ===========================
   TILT EFFECT ON PROJECT CARDS
=========================== */
(function () {
  const cards = document.querySelectorAll('.proj-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (-y / rect.height) * 8;
      const rotY = (x / rect.width) * 8;
      card.style.transform = `translateY(-7px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      card.style.transition = 'transform 0.1s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
  });
})();


/* ===========================
   CURSOR GLOW EFFECT
=========================== */
(function () {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(0,229,195,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();
