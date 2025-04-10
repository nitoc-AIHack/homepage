document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations
  AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true
  });
  
  // Initialize particles.js
  if (document.getElementById('particles-js')) {
      particlesJS('particles-js', {
          "particles": {
              "number": {
                  "value": 80,
                  "density": {
                      "enable": true,
                      "value_area": 800
                  }
              },
              "color": {
                  "value": "#7c3aed"
              },
              "shape": {
                  "type": "circle",
                  "stroke": {
                      "width": 0,
                      "color": "#000000"
                  },
                  "polygon": {
                      "nb_sides": 5
                  }
              },
              "opacity": {
                  "value": 0.5,
                  "random": false,
                  "anim": {
                      "enable": false,
                      "speed": 1,
                      "opacity_min": 0.1,
                      "sync": false
                  }
              },
              "size": {
                  "value": 3,
                  "random": true,
                  "anim": {
                      "enable": false,
                      "speed": 40,
                      "size_min": 0.1,
                      "sync": false
                  }
              },
              "line_linked": {
                  "enable": true,
                  "distance": 150,
                  "color": "#7c3aed",
                  "opacity": 0.4,
                  "width": 1
              },
              "move": {
                  "enable": true,
                  "speed": 2,
                  "direction": "none",
                  "random": false,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                  }
              }
          },
          "interactivity": {
              "detect_on": "canvas",
              "events": {
                  "onhover": {
                      "enable": true,
                      "mode": "grab"
                  },
                  "onclick": {
                      "enable": true,
                      "mode": "push"
                  },
                  "resize": true
              },
              "modes": {
                  "grab": {
                      "distance": 140,
                      "line_linked": {
                          "opacity": 1
                      }
                  },
                  "bubble": {
                      "distance": 400,
                      "size": 40,
                      "duration": 2,
                      "opacity": 8,
                      "speed": 3
                  },
                  "repulse": {
                      "distance": 200,
                      "duration": 0.4
                  },
                  "push": {
                      "particles_nb": 4
                  },
                  "remove": {
                      "particles_nb": 2
                  }
              }
          },
          "retina_detect": true
      });
  }
  
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileNav = document.querySelector('.mobile-nav');

  mobileMenuButton.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
  });

  // Function to handle scrolling
  function scrollToSection(targetId) {
      // Close mobile menu if open
      if (mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
      }
    
      // If target is "top", scroll to top of page
      if (targetId === 'top') {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
          return;
      }
    
      // Otherwise scroll to the target section
      const targetSection = document.getElementById(targetId);
    
      if (targetSection) {
          // Calculate header height for offset
          const headerHeight = document.querySelector('.header').offsetHeight;
      
          // Scroll to section with offset for fixed header
          window.scrollTo({
              top: targetSection.offsetTop - headerHeight,
              behavior: 'smooth'
          });
      }
  }
  
  // Add click event to nav links
  const navLinks = document.querySelectorAll('.nav-link[data-target]');
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('data-target');
          scrollToSection(targetId);
      });
  });
  
  // Add click event to the hero button
  const heroButtons = document.querySelectorAll('.hero .button[data-target]');
  heroButtons.forEach(button => {
      button.addEventListener('click', function() {
          const targetId = this.getAttribute('data-target');
          scrollToSection(targetId);
      });
  });

  // Highlight active section in navigation
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
      const scrollPosition = window.scrollY;
      const headerHeight = document.querySelector('.header').offsetHeight;
    
      // Reset all navigation links to default color first
      document.querySelectorAll('.nav-link').forEach(link => {
          link.style.color = '';
      });
    
      // Check if we're at the top of the page
      if (scrollPosition < 100) {
          document.querySelectorAll('.nav-link[data-target="top"]').forEach(link => {
              link.style.color = 'var(--primary)';
          });
          return;
      }
    
      // Check which section is in view and highlight corresponding nav link
      let activeSection = false;
    
      sections.forEach(section => {
          const sectionTop = section.offsetTop - headerHeight - 100; // Add some buffer
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
      
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              document.querySelectorAll(`.nav-link[data-target="${sectionId}"]`).forEach(link => {
                  link.style.color = 'var(--primary)';
              });
              activeSection = true;
          }
      });
    
      // If no section is active and we're not at the top, don't highlight any link
      if (!activeSection && scrollPosition >= 100) {
          document.querySelectorAll('.nav-link').forEach(link => {
              link.style.color = '';
          });
      }
  }
  
  window.addEventListener('scroll', highlightNavigation);
  
  // Initial call to highlight the current section
  highlightNavigation();
});