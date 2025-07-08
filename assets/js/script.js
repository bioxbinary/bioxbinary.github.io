// Particle animation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Chat toggle functionality
const chatToggle = document.querySelector('.chat-toggle');
if (chatToggle) {
    chatToggle.addEventListener('click', function() {
        alert('AI Assistant: Initializing communication protocol...\n\nGreetings! I am the Bioxbinary AI Assistant. How may I assist you with your research inquiry or collaboration request?');
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0,0,0,0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0,255,255,0.3)';
    } else {
        nav.style.background = 'rgba(0,0,0,0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Glitch effect for title
function glitchTitle() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    const originalText = title.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    setInterval(() => {
        if (Math.random() < 0.1) {
            let glitched = originalText;
            for (let i = 0; i < 3; i++) {
                const pos = Math.floor(Math.random() * glitched.length);
                const char = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                glitched = glitched.substr(0, pos) + char + glitched.substr(pos + 1);
            }
            title.textContent = glitched;
            setTimeout(() => {
                title.textContent = originalText;
            }, 100);
        }
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    glitchTitle();
});