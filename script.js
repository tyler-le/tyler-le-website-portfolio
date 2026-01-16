// ============================================
// Modern Portfolio JavaScript
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
const updateActiveNav = () => {
    const scrollPos = window.scrollY + 150;

    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Intersection Observer for animations
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

// Observe sections for fade-in animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Observe experience cards
document.querySelectorAll('.experience-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});

// Observe skill categories
document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(category);
});

// Terminal typing animation (skip on mobile where terminal is hidden)
const terminal = document.querySelector('.terminal-content');
const isMobile = window.innerWidth <= 768;
if (terminal && !isMobile) {
    const commandLine = terminal.querySelector('.command');
    const outputLines = terminal.querySelectorAll('.terminal-line.output');

    // Type the command
    if (commandLine) {
        const originalText = commandLine.textContent;
        commandLine.textContent = '';
        commandLine.style.opacity = '1';

        let charIndex = 0;
        const typeCommand = () => {
            if (charIndex < originalText.length) {
                commandLine.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeCommand, 50); // Typing speed
            } else {
                // After command is typed, show outputs
                setTimeout(() => {
                    outputLines.forEach((line, index) => {
                        const lineText = line.textContent;
                        line.textContent = '';
                        line.style.opacity = '1';

                        let outputCharIndex = 0;
                        const typeOutput = () => {
                            if (outputCharIndex < lineText.length) {
                                line.textContent += lineText.charAt(outputCharIndex);
                                outputCharIndex++;
                                setTimeout(typeOutput, 30); // Faster typing for output
                            }
                        };

                        setTimeout(() => typeOutput(), index * 800);
                    });

                    // Show cursor after all typing is done
                    setTimeout(() => {
                        const cursor = terminal.querySelector('.cursor');
                        if (cursor) {
                            cursor.style.opacity = '1';
                        }
                    }, 2000);
                }, 300);
            }
        };

        setTimeout(() => typeCommand(), 1000);
    }
}


// Add ripple animation to CSS via style tag
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animated number counting for stats
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    // Check if this stat should have a "+" suffix by looking at the label
    const statItem = element.closest('.stat-item');
    const statLabel = statItem ? statItem.querySelector('.stat-label').textContent : '';
    const shouldAddPlus = statLabel.includes('M+') || statLabel.includes('Records') || statLabel.includes('Users');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            if (target === 99.9) {
                element.textContent = '99.9';
            } else if (shouldAddPlus) {
                element.textContent = Math.floor(target) + '+';
            } else {
                element.textContent = Math.floor(target);
            }
            clearInterval(timer);
        } else {
            if (target === 99.9) {
                element.textContent = current.toFixed(1);
            } else if (shouldAddPlus) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }
    }, 16);
}

// Observe stats section and animate numbers
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                // Check if this is the "Years of Experience" stat (target is 2)
                const statItem = stat.closest('.stat-item');
                const statLabel = statItem ? statItem.querySelector('.stat-label').textContent : '';
                const isYearsOfExperience = statLabel.includes('Years of Experience') || target === 2;

                // Use faster animation for Years of Experience (500ms), slower for others (2000ms)
                const duration = isYearsOfExperience ? 500 : 2000;
                animateNumber(stat, target, duration);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Performance optimization - throttle scroll events
let ticking = false;
const optimizedScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', optimizedScroll, { passive: true });

// Console message
console.log('%c🚀 Welcome to Tyler Le\'s Portfolio', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with modern web technologies', 'color: #a0aec0; font-size: 12px;');
