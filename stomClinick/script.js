document.addEventListener('DOMContentLoaded', () => {

    // --- Header scroll ---
    const header = document.getElementById('header');

    const handleScroll = () => {
        header.classList.toggle('header--scrolled', window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile menu ---
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

    // --- Animated counters ---
    const animateCounters = () => {
        document.querySelectorAll('[data-target]').forEach(counter => {
            if (counter.dataset.animated) return;

            const rect = counter.getBoundingClientRect();
            if (rect.top > window.innerHeight || rect.bottom < 0) return;

            counter.dataset.animated = 'true';
            const target = parseInt(counter.dataset.target, 10);
            const duration = 2000;
            const start = performance.now();

            const step = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(ease * target);

                counter.textContent = current.toLocaleString('ru-RU');

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
        });
    };

    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();

    // --- Scroll reveal (AOS-like) ---
    const reveal = () => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            const rect = el.getBoundingClientRect();
            const visible = rect.top < window.innerHeight - 80;
            if (visible) el.classList.add('aos-visible');
        });
    };

    window.addEventListener('scroll', reveal, { passive: true });
    reveal();

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = header.offsetHeight + 10;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // --- Phone mask ---
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.startsWith('8')) val = '7' + val.slice(1);
        if (val.startsWith('7')) {
            let formatted = '+7';
            if (val.length > 1) formatted += ' (' + val.slice(1, 4);
            if (val.length > 4) formatted += ') ' + val.slice(4, 7);
            if (val.length > 7) formatted += '-' + val.slice(7, 9);
            if (val.length > 9) formatted += '-' + val.slice(9, 11);
            e.target.value = formatted;
        }
    });

    phoneInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && phoneInput.value.length <= 3) {
            e.preventDefault();
            phoneInput.value = '';
        }
    });

    phoneInput.addEventListener('focus', () => {
        if (!phoneInput.value) phoneInput.value = '+7';
    });

    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value === '+7') phoneInput.value = '';
    });

    // --- Form submission ---
    const form = document.getElementById('appointmentForm');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    const openModal = () => {
        modal.classList.add('modal--active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('modal--active');
        document.body.style.overflow = '';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        openModal();
        form.reset();
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
