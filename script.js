// Wait for the entire page to load
window.addEventListener('load', () => {
    // Hide the loader
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
});

// Light/Dark Mode Toggle
const toggleBtn = document.getElementById('mode-toggle');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    // Update button text based on mode
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.textContent = 'Light Mode';
    } else {
        toggleBtn.textContent = 'Dark Mode';
    }
});

// Scroll-triggered Animations using GSAP
gsap.registerPlugin(ScrollTrigger);

// Animate Glass Cards on Scroll
gsap.utils.toArray('.glass-card').forEach(card => {
    gsap.fromTo(card, 
        { opacity: 0, y: 50 },
        {
            opacity: 1, 
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Parallax Effect using GSAP
gsap.utils.toArray('.parallax').forEach(section => {
    gsap.to(section, {
        backgroundPositionY: "20%",
        ease: "none",
        scrollTrigger: {
            trigger: section,
            scrub: true,
            start: "top bottom",
            end: "bottom top"
        }
    });
});

// Interactive Contact Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been sent.`);
    contactForm.reset();
});
