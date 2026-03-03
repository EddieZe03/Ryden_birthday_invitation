// Carousel functionality
let currentSlide = 0;
let autoScrollInterval;
let totalSlides = 0;
let photosLoaded = 0;

function openWelcomePage() {
    const posterPage = document.getElementById('posterPage');
    const welcomePage = document.getElementById('welcomePage');
    const welcomeFooter = document.getElementById('welcomeFooter');

    if (posterPage) {
        posterPage.classList.add('hidden');
    }

    if (welcomePage) {
        welcomePage.classList.add('active');
        welcomePage.setAttribute('aria-hidden', 'false');
    }

    if (welcomeFooter) {
        welcomeFooter.classList.add('active');
        welcomeFooter.setAttribute('aria-hidden', 'false');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    initializeCarousel();
}

function getSlides() {
    return Array.from(document.querySelectorAll('.carousel-slide'));
}

document.addEventListener('DOMContentLoaded', function() {
    // Add sparkle effect on mouse move
    document.addEventListener('mousemove', createSparkle);
    
    // Add scroll animations
    addScrollAnimations();
});

// Initialize photo carousel
function initializeCarousel() {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const slides = getSlides();
    const placeholder = document.getElementById('photoPlaceholder');
    let processedPhotos = 0;
    
    clearInterval(autoScrollInterval);
    currentSlide = 0;
    photosLoaded = 0;
    totalSlides = slides.length;

    if (track) {
        track.style.transform = 'translateX(0)';
    }

    if (dotsContainer) {
        dotsContainer.innerHTML = '';
    }

    if (placeholder) {
        placeholder.classList.remove('show');
    }

    const handleLoaded = () => {
        photosLoaded++;
        if (placeholder) {
            placeholder.classList.remove('show');
        }
    };

    const handleError = (slide) => {
        slide.remove();
    };

    const finishInitialization = () => {
        totalSlides = getSlides().length;

        if (totalSlides === 0 && placeholder) {
            placeholder.classList.add('show');
            return;
        }

        if (placeholder) {
            placeholder.classList.remove('show');
        }

        createDots();
        goToSlide(0);
        startAutoScroll();
    };

    const onImageProcessed = () => {
        processedPhotos++;
        if (processedPhotos === slides.length) {
            finishInitialization();
        }
    };
    
    // Check each photo
    slides.forEach((slide) => {
        const img = slide.querySelector('img');

        if (img.complete) {
            if (img.naturalWidth > 0) {
                handleLoaded();
            } else {
                handleError(slide);
            }
            onImageProcessed();
            return;
        }

        img.addEventListener('load', function() {
            handleLoaded();
            onImageProcessed();
        }, { once: true });

        img.addEventListener('error', function() {
            handleError(slide);
            onImageProcessed();
        }, { once: true });
    });

    if (slides.length === 0) {
        finishInitialization();
    }
}

// Create navigation dots
function createDots() {
    const dotsContainer = document.getElementById('carouselDots');
    const slides = getSlides();

    if (!dotsContainer) {
        return;
    }

    dotsContainer.innerHTML = '';
    
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

// Go to specific slide
function goToSlide(index) {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    const slides = getSlides();

    if (!track || slides.length === 0) {
        return;
    }

    totalSlides = slides.length;
    
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Start automatic scrolling
function startAutoScroll() {
    clearInterval(autoScrollInterval);

    if (totalSlides <= 1) {
        return;
    }

    autoScrollInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 3500); // Change photo every 3.5 seconds
}

// Stop auto-scroll when user interacts
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Pause auto-scroll on hover
const photoContainer = document.querySelector('.photo-container');
if (photoContainer) {
    photoContainer.addEventListener('mouseenter', () => {
        stopAutoScroll();
    });
    
    photoContainer.addEventListener('mouseleave', () => {
        startAutoScroll();
    });

    photoContainer.addEventListener('touchstart', () => {
        stopAutoScroll();
    }, { passive: true });

    photoContainer.addEventListener('touchend', () => {
        startAutoScroll();
    }, { passive: true });
}

// Create sparkle effect
function createSparkle(e) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    
    const size = Math.random() * 10 + 5;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    const colors = ['#FFD700', '#FF69B4', '#4A90E2', '#9B59B6', '#00F2FE'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle styles dynamically
const style = document.createElement('style');
style.textContent = `
    .sparkle {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleAnimation 1s ease-out forwards;
        box-shadow: 0 0 10px currentColor;
    }
    
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll animations
function addScrollAnimations() {
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
    
    const animatedElements = document.querySelectorAll('.info-card, .message-section, .rsvp-section');
    animatedElements.forEach(el => observer.observe(el));
}

// RSVP Button Handler
function handleRSVP() {
    // Create confetti effect
    createConfetti();
    
    // You can customize this to:
    // 1. Open a form
    // 2. Send an email
    // 3. Link to a Google Form
    // 4. Open WhatsApp/SMS
    
    // Example: Open email client
    const email = 'eddiechin0305@gmail.com';
    const subject = encodeURIComponent("RSVP for Ryden's 1st Birthday 🎉");
    const body = encodeURIComponent("Hi! I'd love to attend Ryden's birthday party!\n\nName: \nNumber of Guests: \n\nLooking forward to celebrating!");
    
    setTimeout(() => {
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }, 500);
}

// Confetti animation
function createConfetti() {
    const colors = ['#FFD700', '#FF69B4', '#4A90E2', '#9B59B6', '#FF6B6B', '#20B2AA'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Add confetti styles
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        top: -10px;
        z-index: 9999;
        animation: confettiFall 3s linear forwards;
        pointer-events: none;
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Add interactive hover effects to floating elements
document.querySelectorAll('.floating-stitch').forEach(stitch => {
    stitch.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.5)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    stitch.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add 3D tilt effect to the main container
const container = document.querySelector('.birthday-details');
if (container) {
    container.addEventListener('mousemove', function(e) {
        if (!document.getElementById('welcomePage')?.classList.contains('active')) {
            return;
        }

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    container.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}
