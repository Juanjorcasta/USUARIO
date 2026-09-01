/* ── PARTICLES ── */
(function () {
  const c = document.getElementById('pcanvas'), ctx = c.getContext('2d');
  let pts = [];

  function sz() { c.width = c.offsetWidth; c.height = c.offsetHeight; }

  function mk() {
    pts = [];
    const n = Math.min(55, Math.floor(c.width * c.height / 14000));
    for (let i = 0; i < n; i++)
      pts.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.4 + .4 });
  }

  function checkDark() {
    const t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return window.matchMedia('(prefers-color-scheme:dark)').matches;
  }

  function draw() {
    const dark = checkDark();
    ctx.clearRect(0, 0, c.width, c.height);
    const dc = dark ? '59,130,246' : '37,99,235';
    const lc = dark ? '37,99,235' : '29,78,216';
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > c.width) p.vx *= -1;
      if (p.y < 0 || p.y > c.height) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dc},.45)`; ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${lc},${.14 * (1 - d / 130)})`; ctx.lineWidth = .5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  sz(); mk();
  if (!window.matchMedia('(prefers-reduced-motion:reduce)').matches) draw();
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { sz(); mk(); }, 200); });
})();

/* ── TYPING EFFECT ── */
(function () {
  const el = document.getElementById('typed');
  const ph = {
    en: ['secure web apps.', '.NET & Blazor solutions.', 'clean, scalable systems.', 'with discipline.'],
    es: ['aplicaciones web seguras.', 'soluciones .NET y Blazor.', 'sistemas limpios y escalables.', 'con disciplina.']
  };
  let i = 0, ci = 0, del = false, wait = false;
  function lg() { return document.documentElement.lang || 'en'; }
  function tick() {
    if (wait) return;
    const list = ph[lg()] || ph.en, cur = list[i % list.length];
    if (!del) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { del = true; wait = true; setTimeout(() => { wait = false; tick(); }, 2200); }
      else setTimeout(tick, 60);
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { del = false; i++; setTimeout(tick, 350); }
      else setTimeout(tick, 28);
    }
  }
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) el.textContent = 'secure web apps.';
  else setTimeout(tick, 900);
})();

/* ── THEME TOGGLE ── */
(function () {
  const btn = document.getElementById('theme-btn'), r = document.documentElement;
  function cur() { const t = r.getAttribute('data-theme'); return t || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'); }
  function set(t) {
    r.setAttribute('data-theme', t);
    btn.textContent = t === 'dark' ? '☀' : '☽';
    try { localStorage.setItem('jd-theme', t); } catch (e) { }
  }
  try { const s = localStorage.getItem('jd-theme'); set(s || cur()); } catch (e) { set(cur()); }
  btn.addEventListener('click', () => set(cur() === 'dark' ? 'light' : 'dark'));
})();

/* ── LANGUAGE TOGGLE ── */
(function () {
  const btn = document.getElementById('lang-btn');
  let lang = 'en';

  const T = {
    en: {
      'nav.about': 'About', 'nav.skills': 'Skills', 'nav.exp': 'Experience', 'nav.proj': 'Projects', 'nav.edu': 'Education', 'nav.contact': 'Contact',
      'hero.tag': 'Software Developer', 'hero.pre': 'Building ', 'hero.cta1': 'Contact on WhatsApp', 'hero.cta2': 'View My Work',
      'about.h': 'Who I Am',
      'about.p1': "I'm a 22-year-old software developer from Pereira, Colombia, currently studying Software Engineering at CIAF and gaining real-world experience as a Development Intern at Outsourcing SAS BIC.",
      'about.p2': "I built most of my skills through consistent self-learning — combining formal education with hands-on projects and professional challenges. What drives me is turning complex problems into secure, well-structured solutions.",
      'about.p3': "Beyond the code, I'm drawn to gaming, music, travel, the gym, and reading. I think broad curiosity makes a better developer.",
      'int.gaming': 'Gaming', 'int.travel': 'Travel', 'int.music': 'Music', 'int.gym': 'Gym', 'int.reading': 'Reading',
      'stat.age': 'years old', 'stat.months': 'months professional', 'stat.proj': 'projects shipped', 'stat.learn': 'learning streak',
      'sk.h': 'Tech Stack', 'exp.h': 'Work History',
      'exp1.per': '2024 – Present', 'exp1.role': 'Development Intern & Support Specialist',
      'exp1.b1': 'Designed and developed <strong>Planeador Digital</strong> — a corporate portal in Blazor Server (.NET 9) centralizing internal tools with role-based access control and a full admin panel for user and project management.',
      'exp1.b2': 'Implemented SHA-256 password hashing, AES URL encryption, and 10-minute session revalidation to detect deactivated users in real time.',
      'exp1.b3': "Detected and patched a critical SQL operator precedence bug in the authentication stored procedure that could have allowed login with another user's temporary password — caught in pre-production testing.",
      'exp1.b4': 'Monitors and manages bot operations; conducts functional testing across internal systems using Postman and SoapUI.',
      'exp2.per': '2022 – 2024', 'exp2.role': 'Digital Creator & Community Manager', 'exp2.co': 'Freelance',
      'exp2.b1': 'Managed social media strategy and digital content for multiple clients, developing storytelling skills that now inform how technical work is presented.',
      'exp2.b2': 'Built an audience-focused perspective on design and UX — an uncommon advantage in a developer profile.',
      'proj.h': 'Featured Work', 'proj1.lbl': 'Featured — Corporate',
      'proj1.desc': "A corporate web portal that centralizes access to all of Outsourcing SAS's internal digital tools — dashboards, kiosks, and data analyzers — under a single authenticated interface with admin-managed roles and per-user project assignment.",
      'proj1.note': "Found and fixed a critical SQL operator precedence bug in the login stored procedure during pre-production testing — it would have allowed authentication using another user's temporary password.",
      'proj1.lock': 'Private — Corporate',
      'ap.desc': 'A pet adoption platform connecting animals with potential owners. Features browsable listings, animal profiles, and an adoption request flow.',
      'inv.lbl': 'Academic', 'inv.name': 'Express Project', 'inv.desc': 'Product inventory management app built to practice CRUD operations, data validation, and clean UI layout.',
      'calc.lbl': 'Practice', 'calc.name': 'Calculator', 'calc.desc': 'Functional calculator built as an entry point to DOM manipulation, event handling, and structured UI design with pure web technologies.',
      'edu.h': 'Academic Path', 'edu.deg': 'Software Engineering', 'edu.per': '2022 – Present · Propedeutic cycle program',
      'edu.note': 'Each completed cycle awards an independent professional title while building toward the full engineering degree.',
      'cyc1': 'Técnico Profesional en Programación — Completed',
      'cyc2': 'Tecnólogo en Desarrollo de Software — In progress',
      'cyc3': 'Ingeniería en Desarrollo de Software — Upcoming',
      'cert.h': 'Credentials', 'cert1.n': 'Python Fundamentals',
      'ct.h': "Let's Work Together", 'ct.p': "Whether you're looking to hire a committed developer, collaborate on a project, or just want to talk tech — I'm open to conversations that lead somewhere interesting.",
      'ct.wa': 'Message on WhatsApp', 'ct.fn': 'Name', 'ct.fe': 'Email', 'ct.fm': 'Message', 'ct.send': 'Send Message',
      'foot': 'Built with discipline. Deployed with ambition. © 2025'
    },
    es: {
      'nav.about': 'Sobre mí', 'nav.skills': 'Habilidades', 'nav.exp': 'Experiencia', 'nav.proj': 'Proyectos', 'nav.edu': 'Educación', 'nav.contact': 'Contacto',
      'hero.tag': 'Desarrollador de Software', 'hero.pre': 'Construyendo ', 'hero.cta1': 'Contactar por WhatsApp', 'hero.cta2': 'Ver mi trabajo',
      'about.h': 'Quién soy',
      'about.p1': 'Soy un desarrollador de software de 22 años de Pereira, Colombia, estudiando Ingeniería en Desarrollo de Software en el CIAF y adquiriendo experiencia como practicante en Outsourcing SAS BIC.',
      'about.p2': 'Desarrollé la mayoría de mis habilidades de forma autodidacta — combinando formación académica con proyectos reales. Me impulsa convertir problemas complejos en soluciones seguras y bien estructuradas.',
      'about.p3': 'Fuera del código, me apasionan los videojuegos, la música, los viajes, el gym y la lectura. Creo que la curiosidad amplia hace mejores desarrolladores.',
      'int.gaming': 'Gaming', 'int.travel': 'Viajes', 'int.music': 'Música', 'int.gym': 'Gym', 'int.reading': 'Lectura',
      'stat.age': 'años', 'stat.months': 'meses de experiencia', 'stat.proj': 'proyectos entregados', 'stat.learn': 'curva de aprendizaje',
      'sk.h': 'Stack Tecnológico', 'exp.h': 'Experiencia laboral',
      'exp1.per': '2024 – Presente', 'exp1.role': 'Practicante de Desarrollo y Soporte',
      'exp1.b1': 'Diseñé y desarrollé el <strong>Planeador Digital</strong> — portal corporativo en Blazor Server (.NET 9) que centraliza herramientas internas con control de acceso por roles y panel de administración completo.',
      'exp1.b2': 'Implementé hashing SHA-256, cifrado AES en URLs y revalidación de sesión cada 10 minutos para detectar usuarios desactivados en tiempo real.',
      'exp1.b3': 'Detecté y corregí un bug crítico de precedencia de operadores SQL en el procedimiento de autenticación que habría permitido iniciar sesión con la clave temporal de otro usuario — detectado en pruebas previas a producción.',
      'exp1.b4': 'Monitorea y gestiona operación de bots; realiza pruebas funcionales en sistemas internos con Postman y SoapUI.',
      'exp2.per': '2022 – 2024', 'exp2.role': 'Creador Digital y Community Manager', 'exp2.co': 'Freelance',
      'exp2.b1': 'Gestioné estrategia de redes sociales y contenido digital para varios clientes, desarrollando habilidades de comunicación que hoy informan cómo presento trabajo técnico.',
      'exp2.b2': 'Desarrollé una perspectiva centrada en el usuario y diseño UX — una ventaja inusual en un perfil de developer.',
      'proj.h': 'Trabajo destacado', 'proj1.lbl': 'Proyecto principal — Corporativo',
      'proj1.desc': 'Portal web corporativo que centraliza el acceso a todas las herramientas digitales internas de Outsourcing SAS — dashboards, kioscos y analizadores — bajo una interfaz autenticada con roles gestionados por administrador.',
      'proj1.note': 'Detecté y corregí un bug crítico de precedencia de operadores SQL en el procedimiento de login durante pruebas previas a producción — habría permitido autenticación con la clave temporal de otro usuario.',
      'proj1.lock': 'Privado — Corporativo',
      'ap.desc': 'Plataforma de adopción de mascotas que conecta animales con posibles dueños. Incluye listados navegables, perfiles de animales y flujo de solicitud de adopción.',
      'inv.lbl': 'Académico', 'inv.name': 'Express Project', 'inv.desc': 'App de gestión construida para practicar operaciones CRUD, validación de datos y diseño de UI limpio.',
      'calc.lbl': 'Práctica', 'calc.name': 'Calculadora', 'calc.desc': 'Calculadora funcional como punto de entrada a manipulación del DOM, manejo de eventos y diseño de UI estructurado.',
      'edu.h': 'Trayectoria académica', 'edu.deg': 'Ingeniería en Desarrollo de Software', 'edu.per': '2022 – Presente · Ciclos propedéuticos',
      'edu.note': 'Cada ciclo completado otorga un título profesional independiente mientras avanza hacia el título de ingeniería completo.',
      'cyc1': 'Técnico Profesional en Programación — Completado',
      'cyc2': 'Tecnólogo en Desarrollo de Software — En curso',
      'cyc3': 'Ingeniería en Desarrollo de Software — Próximo',
      'cert.h': 'Certificaciones', 'cert1.n': 'Fundamentos de Python',
      'ct.h': 'Trabajemos juntos', 'ct.p': 'Ya sea que busques contratar un desarrollador comprometido, colaborar en un proyecto, o simplemente hablar de tecnología — estoy abierto a conversaciones que lleven a algo interesante.',
      'ct.wa': 'Escribir por WhatsApp', 'ct.fn': 'Nombre', 'ct.fe': 'Correo electrónico', 'ct.fm': 'Mensaje', 'ct.send': 'Enviar mensaje',
      'foot': 'Construido con disciplina. Desplegado con ambición. © 2025'
    }
  };

  function apply(l) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n'), v = T[l] && T[l][k];
      if (v) el.innerHTML = v;
    });
    document.documentElement.lang = l;
    btn.textContent = l === 'en' ? 'ES' : 'EN';
  }

  btn.addEventListener('click', () => apply(lang = lang === 'en' ? 'es' : 'en'));
  apply(lang);
})();

/* ── MOBILE MENU ── */
(function () {
  const btn = document.getElementById('menu-btn'), nav = document.getElementById('mnav');
  btn.addEventListener('click', () => {
    const o = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', o);
    btn.classList.toggle('open', o);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); btn.classList.remove('open'); btn.setAttribute('aria-expanded', false);
  }));
})();

/* ── SCROLL REVEAL ── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const obs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
  }), { threshold: .1 });
  document.querySelectorAll('.rev').forEach(el => obs.observe(el));
})();

/* ── ACTIVE NAV ── */
(function () {
  const secs = document.querySelectorAll('section[id]'), links = document.querySelectorAll('.nav-links a');
  const obs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => {
      const active = l.getAttribute('href') === '#' + e.target.id;
      l.style.color = active ? 'var(--accent-b)' : '';
      l.style.background = active ? 'var(--surface)' : '';
    });
  }), { threshold: .35, rootMargin: '-60px 0px -60px 0px' });
  secs.forEach(s => obs.observe(s));
})();
