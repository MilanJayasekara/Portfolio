// Professional Portfolio with Advanced Cursor System
document.addEventListener('DOMContentLoaded', function() {
  // Initialize advanced cursor
  initAdvancedCursor();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize navbar effects
  initNavbar();
  
  // Initialize animations
  initAnimations();
});

function initAdvancedCursor() {
  if (window.innerWidth > 768) {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);
    
    const clickEffect = document.createElement('div');
    clickEffect.classList.add('cursor-click-effect');
    document.body.appendChild(clickEffect);
    
    // Mouse position variables
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let dotX = 0;
    let dotY = 0;
    
    // Animation variables
    let isHovering = false;
    let isClicking = false;
    let animationFrame;
    
    // Cursor speed (lower is faster)
    const followerSpeed = 0.15;
    const dotSpeed = 0.05;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
      isClicking = true;
      cursorDot.classList.add('cursor-active');
      cursorFollower.classList.add('cursor-follower-active');
      
      // Show click effect
      clickEffect.style.left = `${mouseX}px`;
      clickEffect.style.top = `${mouseY}px`;
      clickEffect.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
      isClicking = false;
      cursorDot.classList.remove('cursor-active');
      cursorFollower.classList.remove('cursor-follower-active');
      clickEffect.classList.remove('active');
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll(
      'a, button, .btn, input, textarea, select, [data-cursor-hover]'
    );
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        isHovering = true;
        cursorDot.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-follower-hover');
        
        // Special effects for different elements
        if (el.classList.contains('btn-primary')) {
          cursorDot.style.backgroundColor = 'white';
          cursorFollower.style.borderColor = 'white';
        }
      });
      
      el.addEventListener('mouseleave', () => {
        isHovering = false;
        cursorDot.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-follower-hover');
        
        // Reset special effects
        cursorDot.style.backgroundColor = '';
        cursorFollower.style.borderColor = '';
      });
    });
    
    // Animation loop
    function animateCursor() {
      // Calculate new positions with easing
      dotX += (mouseX - dotX) * dotSpeed;
      dotY += (mouseY - dotY) * dotSpeed;
      
      followerX += (mouseX - followerX) * followerSpeed;
      followerY += (mouseY - followerY) * followerSpeed;
      
      // Apply positions
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
      
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      
      // Continue animation
      animationFrame = requestAnimationFrame(animateCursor);
    }
    
    // Start animation
    animateCursor();
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursorDot.classList.add('cursor-hidden');
      cursorFollower.classList.add('cursor-hidden');
    });
    
    document.addEventListener('mouseenter', () => {
      cursorDot.classList.remove('cursor-hidden');
      cursorFollower.classList.remove('cursor-hidden');
    });
  }
}

function initSmoothScrolling() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initAnimations() {
  // Simple intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}