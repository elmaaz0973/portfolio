// Matrix background
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
let width, height;
function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>/?アィゥェォ';
const fontSize = 16;
let drops = [];
function initDrops() {
    const columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
}
initDrops();
window.addEventListener('resize', initDrops);
function drawMatrix() {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#38bdf8';
    ctx.font = `${fontSize}px monospace`;
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    themeToggle.classList.replace('fa-moon', 'fa-sun');
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    if (document.body.classList.contains('light')) {
        themeToggle.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// Typing Effect
const texts = ["Full-Stack JavaScript", "React & Node.js", "UI/UX Enthusiast"];
let count = 0, index = 0;
function type() {
    const current = texts[count];
    document.getElementById('typing').textContent = current.slice(0, ++index);
    if (index === current.length) {
        count = (count + 1) % texts.length;
        index = 0;
        setTimeout(type, 1800);
    } else {
        setTimeout(type, 70);
    }
}
type();

// Projects
const projects = [
    {title:"Dental Clinic System", category:"frontend", img:"images/dental.png", link:"https://elmaaz0973.github.io/dental-clinic-system/"},
    {title:"MoaazStore E-commerce", category:"frontend", img:"images/store.png", link:"https://elmaaz0973.github.io/MoaazStore/"},
    {title:"Apple Website Clone", category:"frontend", img:"images/apple.png", link:"https://elmaaz0973.github.io/apple/"},
    {title:"Natgas Complaints System", category:"frontend", img:"images/natgas.png", link:"#"},
    {title:"Salary Sheet - GAS Serve", category:"data", img:"images/gasServe.png", link:"#"}
];

function renderProjects(filter = 'all') {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${p.img}" alt="${p.title}" loading="lazy">
            <div style="padding:22px;">
                <h3 style="font-size:clamp(15px,2.5vw,18px);">${p.title}</h3>
                <p style="margin-top:8px;font-size:14px;color:#94a3b8;">Professional ${p.category} project</p>
                <a href="${p.link}" class="btn" style="margin-top:15px;">Live Demo</a>
            </div>
        `;
        container.appendChild(card);
    });
}
renderProjects();

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

// Hamburger menu — close on link click
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// Language toggle
const translations = {
    en:{about:'About',education:'Education',experience:'Experience',projects:'Projects',skills:'Skills',contact:'Contact'},
    ar:{about:'من أنا',education:'التعليم',experience:'الخبرات',projects:'المشاريع',skills:'المهارات',contact:'التواصل'}
};
document.getElementById('lang-toggle').addEventListener('click', () => {
    const isAr = document.documentElement.lang === 'ar';
    document.documentElement.lang = isAr ? 'en' : 'ar';
    document.getElementById('lang-toggle').textContent = isAr ? 'AR' : 'EN';
});

// Fade on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.12 });
document.querySelectorAll('.fade').forEach(el => observer.observe(el));
