// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (in production, this would send to a server)
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and portfolio items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .about-text, .contact-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Modal functionality
const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

// Store timeout reference to clear it if needed
let modalCloseTimeout = null;

function openModal(content) {
    // Clear any pending close timeout to prevent race conditions
    if (modalCloseTimeout) {
        clearTimeout(modalCloseTimeout);
        modalCloseTimeout = null;
    }
    
    // Set content immediately
    modalBody.innerHTML = content;
    
    // If modal is already open, we don't need to re-add the class
    // but we ensure it's visible
    if (!modal.classList.contains('active')) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal() {
    // Clear any pending close timeout
    if (modalCloseTimeout) {
        clearTimeout(modalCloseTimeout);
        modalCloseTimeout = null;
    }
    
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Clear content after animation completes
    modalCloseTimeout = setTimeout(() => {
        modalBody.innerHTML = '';
        modalCloseTimeout = null;
    }, 300); // Clear content after animation
}

// Close modal when clicking backdrop or close button
modalBackdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Service card click handler
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        
        const modalContent = `
            <h2>${title}</h2>
            <p>${description}</p>
            <p>Contact us today to learn more about our ${title.toLowerCase()} services and get a free consultation for your project.</p>
        `;
        
        openModal(modalContent);
    });
});

// Portfolio item click handler
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        const title = overlay.querySelector('h3').textContent;
        const subtitle = overlay.querySelector('p').textContent;
        const portfolioImage = item.querySelector('.portfolio-image');
        
        // Get background image URL
        const imageId = portfolioImage.id;
        let imageUrl = '';
        
        // Map portfolio IDs and titles to image URLs
        const imageMap = {
            'kitchen': 'assets/kitchen.jpg',
            'bathroom': 'assets/bathroom.jpg',
            'fireplace': 'assets/step3.jpg',
            'Custom Flooring': 'assets/stairs.jpg',
            'Outdoor Patio': 'assets/outdoor_grill.jpg',
            'Commercial Project': 'assets/kitchen-commercial.jpg'
        };
        
        // Try to get image by title first, then by ID, then by index
        imageUrl = imageMap[title] || imageMap[imageId] || 
                   (index === 3 ? 'assets/stairs.jpg' : 
                    index === 4 ? 'assets/outdoor_grill.jpg' : 
                    index === 5 ? 'assets/kitchen-commercial.jpg' : 'assets/kitchen.jpg');
        
        const modalContent = `
            <h2>${title}</h2>
            <p class="modal-subtitle" style="color: var(--secondary-color); font-size: 1.2rem; margin-bottom: 1.5rem;">${subtitle}</p>
            <div class="modal-image-container" style="background-image: url('${imageUrl}');"></div>
            <p>This project showcases our expertise in ${subtitle.toLowerCase()}. Our team worked closely with the client to bring their vision to life, combining quality materials with precision craftsmanship.</p>
        `;
        
        openModal(modalContent);
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});



