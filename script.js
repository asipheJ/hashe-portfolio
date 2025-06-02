// DOM Elements
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section');
const aboutBtns = document.querySelectorAll('.about-btn');
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('header nav');
const form = document.querySelector('form');

// Variables
let currentSection = '';
let portfolioIndex = 0;

// Initialize active states
function initializeActiveStates() {
    // Set home as active by default
    document.getElementById('home').classList.add('active');
    
    // Set first nav link as active
    navLinks[0].classList.add('active');
    
    // Set first about button and detail as active
    aboutBtns[0].classList.add('active');
    document.querySelector('.about-detail').classList.add('active');
    
    // Set first portfolio item as active
    activePortfolio();
}

// Navigation active state
function updateActivePage() {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 300) && 
            window.scrollY < (sectionTop + sectionHeight - 300)) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// About section tabs
function setupAboutTabs() {
    aboutBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const aboutDetails = document.querySelectorAll('.about-detail');

            aboutBtns.forEach(btn => btn.classList.remove('active'));
            aboutDetails.forEach(detail => detail.classList.remove('active'));

            btn.classList.add('active');
            aboutDetails[idx].classList.add('active');
        });
    });
}

// Portfolio carousel
function activePortfolio() {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');

    imgSlide.style.transform = `translateX(calc(${portfolioIndex * -100}% - ${portfolioIndex * 2}rem))`;

    portfolioDetails.forEach(detail => detail.classList.remove('active'));
    portfolioDetails[portfolioIndex].classList.add('active');

    // Update button states
    arrowLeft.classList.toggle('disabled', portfolioIndex === 0);
    arrowRight.classList.toggle('disabled', portfolioIndex === portfolioDetails.length - 1);
}

function setupPortfolioNavigation() {
    arrowRight.addEventListener('click', () => {
        const portfolioDetails = document.querySelectorAll('.portfolio-detail');
        if (portfolioIndex < portfolioDetails.length - 1) {
            portfolioIndex++;
            activePortfolio();
        }
    });

    arrowLeft.addEventListener('click', () => {
        if (portfolioIndex > 0) {
            portfolioIndex--;
            activePortfolio();
        }
    });
}

// Mobile menu
function setupMobileMenu() {
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('fa-xmark');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuIcon.classList.remove('fa-xmark');
        });
    });
}

// Form submission
function setupForm() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Form submitted successfully!');
        form.reset();
    });
}

// Event Listeners
window.addEventListener('scroll', updateActivePage);
window.addEventListener('DOMContentLoaded', () => {
    initializeActiveStates();
    setupAboutTabs();
    setupPortfolioNavigation();
    setupMobileMenu();
    setupForm();
});