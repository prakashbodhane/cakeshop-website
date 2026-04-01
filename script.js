// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Menu filter and pagination functionality
const filterButtons = document.querySelectorAll('.btn-filter');
const menuItems = document.querySelectorAll('.menu-item');
const itemsPerPage = 6;
let currentPage = 1;
let currentFilter = 'all';

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        currentFilter = button.getAttribute('data-filter');
        currentPage = 1; // Reset to first page when filter changes
        
        displayMenuItems();
    });
});

// Set initial state for menu items
menuItems.forEach(item => {
    item.style.transition = 'all 0.3s ease';
});

// Display menu items based on filter and pagination
function displayMenuItems() {
    // Get filtered items
    let filteredItems = Array.from(menuItems);
    
    if (currentFilter !== 'all') {
        filteredItems = filteredItems.filter(item => 
            item.getAttribute('data-category') === currentFilter
        );
    }
    
    // Hide all items first
    menuItems.forEach(item => {
        item.style.display = 'none';
        item.style.opacity = '0';
    });
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Show items for current page
    filteredItems.slice(startIndex, endIndex).forEach(item => {
        item.style.display = 'block';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 10);
    });
    
    // Update pagination
    updatePagination(totalPages, filteredItems.length);
}

// Update pagination controls
function updatePagination(totalPages, totalItems) {
    const paginationContainer = document.getElementById('menuPagination');
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) {
        return; // Don't show pagination if only one page
    }
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#menu" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
    prevLi.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayMenuItems();
            scrollToMenu();
        }
    });
    paginationContainer.appendChild(prevLi);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageLi = document.createElement('li');
        pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageLi.innerHTML = `<a class="page-link" href="#menu">${i}</a>`;
        pageLi.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            displayMenuItems();
            scrollToMenu();
        });
        paginationContainer.appendChild(pageLi);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#menu" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
    nextLi.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            displayMenuItems();
            scrollToMenu();
        }
    });
    paginationContainer.appendChild(nextLi);
}

// Scroll to menu section
function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = menuSection.offsetTop - navbarHeight - 20;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Initialize menu display
displayMenuItems();

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message (you can replace this with actual form submission)
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (emailInput.value) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// Intersection Observer for scroll animations
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

// Observe elements for animation
document.querySelectorAll('.menu-card, .testimonial-card, .team-card, .contact-info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect sound (optional - requires audio files)
const menuCards = document.querySelectorAll('.menu-card');
menuCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Counter animation for stats (if you want to add stats section)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Mobile menu close on outside click
document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
    }
});

// View button functionality - Show product details in modal
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const name = btn.getAttribute('data-name');
        const description = btn.getAttribute('data-description');
        const image = btn.getAttribute('data-image');
        const category = btn.getAttribute('data-category');
        
        // Update modal content
        document.getElementById('modalName').textContent = name;
        document.getElementById('modalDescription').textContent = description;
        document.getElementById('modalImage').src = image;
        document.getElementById('modalImage').alt = name;
        document.getElementById('modalCategory').textContent = category;
        document.getElementById('productModalLabel').textContent = 'Product Details';
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    });
});

// Order Now button - Redirect to contact section
document.getElementById('orderNowBtn').addEventListener('click', () => {
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    modal.hide();
    
    // Wait for modal to close, then scroll to contact section
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = contactSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }, 300);
});

console.log('Frost Factory website loaded successfully! 🎂');

// Image loading error handler
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add error handler for each image
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            // Try alternative URL without fit parameter
            if (this.src.includes('&fit=crop')) {
                this.src = this.src.replace('&fit=crop', '');
            }
        });
        
        // Add load success handler
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    console.log('Total images found:', images.length);
});
