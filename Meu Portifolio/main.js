const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});

const roles = ['Desenvolvedor Full Stack', 'Front-end Developer', 'Back-end Developer', 'HTML • CSS • JavaScript', 'Node.js • APIs REST'];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, isDeleting = false;
function type() {
  const current = roles[roleIndex];
  typedEl.textContent = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
  let speed = isDeleting ? 50 : 100;
  if (!isDeleting && charIndex === current.length + 1) { speed = 1800; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 400; }
  setTimeout(type, speed);
}
type();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    entry.target.querySelectorAll('.progress-bar').forEach(bar => bar.style.width = bar.dataset.progress + '%');
    entry.target.querySelectorAll('.stat-number').forEach(stat => {
      if (stat.dataset.animated) return;
      stat.dataset.animated = 'true';
      const target = parseInt(stat.dataset.target);
      const start = performance.now();
      const animate = (now) => {
        const p = Math.min((now - start) / 1500, 1);
        stat.textContent = Math.floor(p * target);
        if (p < 1) requestAnimationFrame(animate); else stat.textContent = target;
      };
      requestAnimationFrame(animate);
    });
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const toast = document.getElementById('toast');
function showToast(msg) { toast.textContent = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500); }

document.getElementById('form-contato').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  if (!nome || !email || !mensagem) { showToast('Preencha todos os campos!'); return; }
  const url = `https://wa.me/5577991889227?text=${encodeURIComponent(`Olá Joabe! Meu nome é ${nome} (${email}).\n\n${mensagem}`)}`;
  showToast('Abrindo WhatsApp... Obrigado pelo contato!');
  setTimeout(() => window.open(url, '_blank'), 800);
  e.target.reset();
});

const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();