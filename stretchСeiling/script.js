document.addEventListener('DOMContentLoaded', () => {

    // --- Header scroll ---
    const header = document.getElementById('header');
    const onScroll = () => header.classList.toggle('header--scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Burger menu ---
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
            const offset = header.offsetHeight + 10;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - offset,
                behavior: 'smooth'
            });
        });
    });

    // --- Scroll reveal ---
    const reveal = () => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 80) {
                el.classList.add('aos-visible');
            }
        });
    };
    window.addEventListener('scroll', reveal, { passive: true });
    reveal();

    // --- Countdown timer (end of current month) ---
    const timerDays = document.getElementById('timerDays');
    const timerHours = document.getElementById('timerHours');
    const timerMinutes = document.getElementById('timerMinutes');

    const getEndOfMonth = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    };

    const updateTimer = () => {
        const diff = getEndOfMonth() - new Date();
        if (diff <= 0) return;

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);

        timerDays.textContent = String(days).padStart(2, '0');
        timerHours.textContent = String(hours).padStart(2, '0');
        timerMinutes.textContent = String(minutes).padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 60000);

    // --- Phone mask ---
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.startsWith('8')) val = '7' + val.slice(1);
        if (val.startsWith('7')) {
            let f = '+7';
            if (val.length > 1) f += ' (' + val.slice(1, 4);
            if (val.length > 4) f += ') ' + val.slice(4, 7);
            if (val.length > 7) f += '-' + val.slice(7, 9);
            if (val.length > 9) f += '-' + val.slice(9, 11);
            e.target.value = f;
        }
    });

    phoneInput.addEventListener('focus', () => {
        if (!phoneInput.value) phoneInput.value = '+7';
    });

    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value === '+7') phoneInput.value = '';
    });

    phoneInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && phoneInput.value.length <= 3) {
            e.preventDefault();
            phoneInput.value = '';
        }
    });

    // --- Form submit ---
    const form = document.getElementById('leadForm');
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
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
