document.addEventListener('DOMContentLoaded', () => {

    // --- Header scroll ---
    const header = document.getElementById('header');
    const onScroll = () => header.classList.toggle('header--scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Burger ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger--active');
        nav.classList.toggle('nav--open');
        document.body.style.overflow = nav.classList.contains('nav--open') ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('burger--active');
            nav.classList.remove('nav--open');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 10,
                behavior: 'smooth'
            });
        });
    });

    // --- Scroll reveal ---
    const reveal = () => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 60) {
                el.classList.add('aos-visible');
            }
        });
    };
    window.addEventListener('scroll', reveal, { passive: true });
    reveal();

    // --- Form submit ---
    const form = document.getElementById('leadForm');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    const openModal = () => { modal.classList.add('modal--active'); document.body.style.overflow = 'hidden'; };
    const closeModal = () => { modal.classList.remove('modal--active'); document.body.style.overflow = ''; };

    form.addEventListener('submit', (e) => { e.preventDefault(); openModal(); form.reset(); });
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
