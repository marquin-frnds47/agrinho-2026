const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Alternar Nav
        nav.classList.toggle('nav-active');

        // Animar Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animação Burger
        burger.classList.toggle('toggle');
    });
}

// Efeito de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Fechar menu mobile se estiver aberto
        const nav = document.querySelector('.nav-links');
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            document.querySelector('.burger').classList.remove('toggle');
        }
    });
});

// Animação simples de entrada ao rolar a página
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.text-content, .image-content, .feature-card, .timeline-item, .stat-card, .qa-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Efeito de contador para as estatísticas
const stats = document.querySelectorAll('.stat-item h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const count = parseInt(target.innerText);
            let current = 0;
            const timer = setInterval(() => {
                current += Math.ceil(count / 20);
                if (current >= count) {
                    target.innerText = count + (target.innerText.includes('%') ? '%' : '');
                    clearInterval(timer);
                } else {
                    target.innerText = current + (target.innerText.includes('%') ? '%' : '');
                }
            }, 50);
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 1 });

stats.forEach(stat => statsObserver.observe(stat));

navSlide();
