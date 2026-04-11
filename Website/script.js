document.addEventListener('DOMContentLoaded', () => {
    
    // ---- PRELOADER ----
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 300); // Slight delay so the user sees the professional loader
    });

    // ---- NAVBAR SCROLL EFFECT ----
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- MOBILE MENU TOGGLE ----
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times (X)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // ---- SCROLL ANIMATIONS (Intersection Observer) ----
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay if attribute exists
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }
                
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));

    // ---- CONTACT FORM REAL SUBMIT ----
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Visual feedback
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            
            // Real network request using Formsubmit
            fetch("https://formsubmit.co/ajax/HaydenHill2026@protonmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    interest: document.getElementById('interest').value,
                    _subject: "New Campaign Website Submission!"
                })
            })
            .then(response => response.json())
            .then(data => {
                btn.innerHTML = '<i class="fas fa-check"></i> Thanks for joining!';
                btn.classList.replace('btn-primary', 'btn-outline');
                btn.style.backgroundColor = 'var(--primary-blue)';
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-outline', 'btn-primary');
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                console.error(error);
                btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error. Try Again.';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 3000);
            });
        });
    }
});
