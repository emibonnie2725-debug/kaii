const loadingCanvas = document.getElementById('loading-matrix');
const loadingCtx = loadingCanvas.getContext('2d');

loadingCanvas.width = window.innerWidth;
loadingCanvas.height = window.innerHeight;

const loadingLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const loadingFontSize = 14;
const loadingColumns = Math.floor(loadingCanvas.width / loadingFontSize);
const loadingDrops = [];

for (let x = 0; x < loadingColumns; x++) {
  loadingDrops[x] = Math.random() * loadingCanvas.height / loadingFontSize;
}

function drawLoading() {
  loadingCtx.fillStyle = 'rgba(45, 27, 105, 0.05)';
  loadingCtx.fillRect(0, 0, loadingCanvas.width, loadingCanvas.height);

  loadingCtx.fillStyle = '#8b5cf6';
  loadingCtx.font = loadingFontSize + 'px monospace';

  for (let i = 0; i < loadingDrops.length; i++) {
    const text = loadingLetters.charAt(Math.floor(Math.random() * loadingLetters.length));
    loadingCtx.fillText(text, i * loadingFontSize, loadingDrops[i] * loadingFontSize);

    if (loadingDrops[i] * loadingFontSize > loadingCanvas.height && Math.random() > 0.975) {
      loadingDrops[i] = 0;
    }
    loadingDrops[i]++;
  }
}

const loadingInterval = setInterval(drawLoading, 50);

// Loading progress
let progress = 0;
const progressFill = document.getElementById('progress-fill');
const loadingText = document.getElementById('loading-text');
const texts = ['Decrypting data...', 'Initializing systems...', 'Loading agent profile...', 'Establishing secure connection...', 'System ready.'];

function updateProgress() {
  progress += Math.random() * 5;
  if (progress > 100) progress = 100;
  progressFill.style.width = progress + '%';
  loadingText.textContent = texts[Math.floor(progress / 20)] || 'System ready.';

  if (progress < 100) {
    setTimeout(updateProgress, 200);
  } else {
    setTimeout(() => {
      document.getElementById('loading-screen').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        clearInterval(loadingInterval);
      }, 1000);
    }, 500);
  }
}

window.addEventListener('load', () => {
  updateProgress();
});

// Typing effect for the name
const nameElement = document.querySelector('.home-content h1 em') || document.querySelector('.panel-content h1 em');
if (nameElement) {
  const nameText = 'Kylene Mae\nLauron';
  let index = 0;
  let lineIndex = 0;
  const lines = nameText.split('\n');

  function typeWriter() {
    if (lineIndex < lines.length) {
      if (index < lines[lineIndex].length) {
        nameElement.innerHTML += lines[lineIndex].charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      } else {
        nameElement.innerHTML += '<br>';
        index = 0;
        lineIndex++;
        setTimeout(typeWriter, 500);
      }
    }
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      nameElement.innerHTML = '';
      typeWriter();
    }, 4000); // After loading
  });
}

// Newsletter functionality
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    const newsletterInput = newsletterForm.querySelector('.newsletter-input');
    const newsletterBtn = newsletterForm.querySelector('.newsletter-btn');

    newsletterBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const email = newsletterInput.value.trim();

      if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }

      // Simulate subscription
      newsletterBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Subscribing...';
      newsletterBtn.disabled = true;

      setTimeout(() => {
        showNotification('Thank you for subscribing! Welcome to the creative community! 🎨', 'success');
        newsletterInput.value = '';
        newsletterBtn.innerHTML = 'Subscribed! ✨';
        newsletterBtn.style.background = '#4ade80';
        newsletterBtn.style.borderColor = '#4ade80';

        setTimeout(() => {
          newsletterBtn.innerHTML = 'Subscribe ✨';
          newsletterBtn.disabled = false;
          newsletterBtn.style.background = '#fff';
          newsletterBtn.style.borderColor = '#fff';
          newsletterBtn.style.color = 'var(--violet-deep)';
        }, 3000);
      }, 1500);
    });

    newsletterInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        newsletterBtn.click();
      }
    });
  }

  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document.querySelectorAll('.stat-box, .service-card, .portfolio-item, .skill-category, .testimonial-card, .process-step').forEach(card => {
    observer.observe(card);
  });

  // Add hover sound effect simulation (visual feedback)
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add particle effect on hero section
  createParticles();
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type) {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}"></i>
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => notification.classList.add('show'), 100);

  // Auto remove
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

function createParticles() {
  const heroSection = document.querySelector('.home');
  if (!heroSection) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    heroSection.appendChild(particle);
  }
}

// Enhanced scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for header
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scroll progress indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.appendChild(scrollProgress);

  const progressBar = scrollProgress.querySelector('.scroll-progress-bar');

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();

  // Enhanced scroll animations with stagger effect
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100); // Stagger animation by 100ms
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all animatable elements
  document.querySelectorAll('.stat-box, .service-card, .portfolio-item, .skill-category, .testimonial-card, .process-step, .section-header').forEach(element => {
    scrollObserver.observe(element);
  });

  // Add parallax effect to hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.home-bg');
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Auto-hide header on scroll down, show on scroll up
  let lastScrollTop = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });
});