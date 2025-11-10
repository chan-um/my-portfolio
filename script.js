document.addEventListener("DOMContentLoaded", () => {
    
    // --- New Typing Effect Script ---
    const typingTarget = document.getElementById('typing-target');
    const phrases = [
        "Machine Learning",
        "Data-Driven Solutions",
        "Full-Stack Development",
        "Drug Discovery"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delay = 2000;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting
            typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, typeSpeed);
            } else {
                setTimeout(type, deleteSpeed);
            }
        } else {
            // Typing
            typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, delay);
            } else {
                setTimeout(type, typeSpeed);
            }
        }
    }
    
    // Start the typing effect
    setTimeout(type, 500);


    // --- Intersection Observer for Fade-in/Slide-up Effect ---
    // This is the "fancy" part. It watches for elements and adds
    // a 'visible' class when they scroll into view.

    const sections = document.querySelectorAll('.portfolio-section');

    const options = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.15 // 15% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });


    // --- Active Nav Link Highlighting on Scroll ---
    // This highlights the nav link corresponding to the section
    // currently in view.
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    const allSections = document.querySelectorAll('section[id], header[id]');

    window.addEventListener('scroll', () => {
        let current = 'home'; // Default to home

        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // A small offset to make the highlight trigger a bit earlier
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

});