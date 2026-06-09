/* ============================================================
   Bioxbinary — site interactions
   Toned-down: no glitch, no particle storm. Just clean motion.
   ============================================================ */

// Sticky-nav state on scroll
const nav = document.querySelector('.nav');
if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll-reveal — fade sections/cards in once
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => observer.observe(el));
}

// Scroll-spy: highlight the in-view section in the nav
const spySections = document.querySelectorAll('section[id]');
const spyLinks = document.querySelectorAll('.nav-links a[href*="#"]');
if (spySections.length && spyLinks.length) {
    window.addEventListener('scroll', () => {
        let current = '';
        spySections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 180) {
                current = section.getAttribute('id');
            }
        });
        spyLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href.endsWith('#' + current) && current !== '');
        });
    }, { passive: true });
}

// Chat toggle placeholder
const chatToggle = document.querySelector('.chat-toggle');
if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        alert('Chat is coming soon — for now, reach us at hello@bioxbinary.in or via the Contact page.');
    });
}
