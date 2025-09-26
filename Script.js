// Enhanced Sheikh Tais Academy JavaScript with Comprehensive Animations

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initSplashScreen()
  initNavigation()
  initScrollAnimations()
  initGalleryLightbox()
  initSmoothScrolling()
  initFAQ()
  initGalleryFilters()
  initEnhancedLightbox()
  initClickEffects()
  initScrollProgress()
  initCounterAnimations()
  initParallaxEffect()
  initIntersectionObserver()
  initMobileNavAnimations()
  initFormAnimations()
  initHoverEffects()
})
const images = [
"/img/unnamed (7).png",
"/img/file_000000004f14624685a3354dd87d601d.png",
"/img/unnamed (6).png"
];

  let index = 0;
  const imageElement = document.getElementById("slideshow-image");
  const overlayElement = document.getElementById("image-overlay");
  const overlayText = document.getElementById("overlay-text");
  const container = document.getElementById("image-container");

  // Slideshow effect (changes image every 2 seconds)
  setInterval(() => {
    index = (index + 1) % images.length;
    imageElement.style.opacity = 0;
    setTimeout(() => {
      imageElement.src = images[index];
      overlayText.textContent = overlayTexts[index];
      imageElement.style.opacity = 1;
    }, 300);
  }, 2000);
// Enhanced Splash Screen with Animation
function initSplashScreen() {
  const splashScreen = document.getElementById("splash-screen")

  // Only show splash screen on index.html
  if ((splashScreen && window.location.pathname.endsWith("index.html")) || window.location.pathname === "/") {
    // Add entrance animation
    splashScreen.style.opacity = "1"
    
    // Hide splash screen after 3 seconds with enhanced animation
    setTimeout(() => {
      splashScreen.style.transform = "translateY(-100%)"
      splashScreen.style.opacity = "0"
      setTimeout(() => {
        splashScreen.style.display = "none"
        // Trigger page entrance animations
        triggerPageAnimations()
      }, 500)
    }, 3000)
  } else if (splashScreen) {
    // Hide splash screen immediately on other pages
    splashScreen.style.display = "none"
    triggerPageAnimations()
  }
}

// Enhanced Navigation with Slide-up Animation
function initNavigation() {
  const hamburger = document.getElementById("hamburger")
  const sidebar = document.getElementById("sidebar")
  const sidebarClose = document.getElementById("sidebar-close")
  const sidebarLinks = document.querySelectorAll(".sidebar-link")
  const header = document.getElementById("header")

  // Create backdrop element
  const backdrop = document.createElement('div')
  backdrop.className = 'sidebar-backdrop'
  backdrop.id = 'sidebar-backdrop'
  document.body.appendChild(backdrop)

  // Enhanced hamburger menu toggle with animations
  hamburger.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Animate hamburger to X
    hamburger.classList.add("active")
    
    // Show sidebar with slide-up animation from bottom
    sidebar.classList.add("active")
    backdrop.classList.add("active")
    
    // Animate sidebar links with stagger effect
    animateSidebarLinks(true)
    
    // Prevent body scroll
    document.body.style.overflow = "hidden"
    
    // Add haptic feedback (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  })

  // Enhanced close sidebar
  function closeSidebar() {
    hamburger.classList.remove("active")
    sidebar.classList.remove("active")
    backdrop.classList.remove("active")
    
    // Animate sidebar links out
    animateSidebarLinks(false)
    
    // Restore body scroll
    document.body.style.overflow = ""
  }

  sidebarClose.addEventListener("click", closeSidebar)
  backdrop.addEventListener("click", closeSidebar)

  // Enhanced sidebar link animations
  function animateSidebarLinks(show) {
    sidebarLinks.forEach((link, index) => {
      link.style.setProperty('--i', index)
      if (show) {
        setTimeout(() => {
          link.style.opacity = "1"
          link.style.transform = "translateX(0)"
        }, index * 100)
      } else {
        link.style.opacity = "0"
        link.style.transform = "translateX(50px)"
      }
    })
  }

  // Close sidebar when clicking on links
  sidebarLinks.forEach((link, index) => {
    link.style.setProperty('--i', index)
    link.addEventListener("click", () => {
      closeSidebar()
    })
  })

  // Enhanced sticky header with animation
  let lastScrollY = window.scrollY
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY
    
    if (currentScrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.background = "#ffffff"
      header.style.backdropFilter = "none"
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }

    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }
    
    lastScrollY = currentScrollY
  })

  // Close sidebar with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar()
    }
  })
}

// Enhanced Mobile Navigation Animations
function initMobileNavAnimations() {
  const navItems = document.querySelectorAll('.nav-item')
  
  navItems.forEach((item, index) => {
    item.style.setProperty('--i', index)
    item.style.animationDelay = `${index * 0.1}s`
  })
}

// Enhanced Scroll Animations with Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")
        
        // Add stagger animation for children
        if (entry.target.classList.contains('stagger-children')) {
          const children = entry.target.children
          Array.from(children).forEach((child, index) => {
            child.style.setProperty('--i', index)
            child.style.animationDelay = `${index * 0.1}s`
          })
        }
      }
    })
  }, observerOptions)

  // Enhanced animation classes to elements
  const animatedElements = document.querySelectorAll(`
    .section-title, .section-subtitle, .feature-card, .doc-card, .news-card, 
    .gallery-item, .about-text, .about-image, .hero-content, .hero-image, 
    .download-text, .download-image, .stat-item, .footer-section, .cta-button
  `)

  animatedElements.forEach((el, index) => {
    el.classList.add("animate-on-scroll")
    el.style.setProperty('--i', index)
    observer.observe(el)
  })

  // Special animations for different element types
  const scaleElements = document.querySelectorAll('.feature-icon, .doc-icon, .social-link')
  scaleElements.forEach((el, index) => {
    el.classList.add("animate-scale")
    el.style.setProperty('--i', index)
    observer.observe(el)
  })

  const slideLeftElements = document.querySelectorAll('.about-text, .download-text')
  slideLeftElements.forEach((el, index) => {
    el.classList.add("animate-slide-left")
    el.style.setProperty('--i', index)
    observer.observe(el)
  })

  const slideRightElements = document.querySelectorAll('.about-image, .download-image')
  slideRightElements.forEach((el, index) => {
    el.classList.add("animate-slide-right")
    el.style.setProperty('--i', index)
    observer.observe(el)
  })
}

// Enhanced Click Effects with Ripple Animation
function initClickEffects() {
  const clickableElements = document.querySelectorAll(`
    .cta-button, .btn-primary, .btn-secondary, .doc-link, .news-link, 
    .download-btn, .social-link, .feature-card, .doc-card, .news-card, 
    .gallery-item, .nav-link, .sidebar-link
  `)

  clickableElements.forEach(element => {
    element.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span')
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
      `
      
      // Ensure element has relative positioning
      if (getComputedStyle(this).position === 'static') {
        this.style.position = 'relative'
      }
      
      this.appendChild(ripple)
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove()
      }, 600)
      
      // Add click scale animation
      this.style.transform = 'scale(0.95)'
      setTimeout(() => {
        this.style.transform = ''
      }, 150)
      
      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(25)
      }
    })
  })
}

// Enhanced Scroll Progress Indicator
function initScrollProgress() {
  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress"
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    progressBar.style.width = scrolled + "%"
  })
}

// Enhanced Counter Animations
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-item h3')
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''))
    const suffix = counter.textContent.replace(/[\d,]/g, '')
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        counter.textContent = target + suffix
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current) + suffix
      }
    }, 20)
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target)
      }
    })
  })

  counters.forEach(counter => {
    counterObserver.observe(counter)
  })
}

// Enhanced Gallery Lightbox with Animations
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item")
  
  // Create lightbox if it doesn't exist
  if (!document.getElementById("lightbox")) {
    const lightbox = document.createElement("div")
    lightbox.id = "lightbox"
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <button class="lightbox-prev">&#8249;</button>
        <button class="lightbox-next">&#8250;</button>
        <img id="lightbox-img" src="" alt="">
        <div class="lightbox-info">
          <h3 id="lightbox-title"></h3>
          <p id="lightbox-description"></p>
        </div>
      </div>
    `
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    `
    document.body.appendChild(lightbox)
  }
  
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const lightboxClose = document.querySelector(".lightbox-close")
  const lightboxTitle = document.getElementById("lightbox-title")
  const lightboxDescription = document.getElementById("lightbox-description")

  let currentIndex = 0

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img")
      const info = item.querySelector(".gallery-info")
      
      currentIndex = index
      lightboxImg.src = img.src
      lightboxImg.alt = img.alt
      
      if (info) {
        const title = info.querySelector("h4")
        const desc = info.querySelector("p")
        lightboxTitle.textContent = title ? title.textContent : ""
        lightboxDescription.textContent = desc ? desc.textContent : ""
      }
      
      // Show lightbox with animation
      lightbox.style.visibility = "visible"
      lightbox.style.opacity = "1"
      lightboxImg.style.transform = "scale(0.8)"
      lightboxImg.style.opacity = "0"
      
      setTimeout(() => {
        lightboxImg.style.transform = "scale(1)"
        lightboxImg.style.opacity = "1"
      }, 100)
      
      document.body.style.overflow = "hidden"
    })
  })

  // Close lightbox
  const closeLightbox = () => {
    lightboxImg.style.transform = "scale(0.8)"
    lightboxImg.style.opacity = "0"
    
    setTimeout(() => {
      lightbox.style.opacity = "0"
      lightbox.style.visibility = "hidden"
      document.body.style.overflow = ""
    }, 200)
  }

  lightboxClose.addEventListener("click", closeLightbox)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.visibility === "visible") {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") navigateGallery(-1)
      if (e.key === "ArrowRight") navigateGallery(1)
    }
  })

  function navigateGallery(direction) {
    currentIndex += direction
    if (currentIndex < 0) currentIndex = galleryItems.length - 1
    if (currentIndex >= galleryItems.length) currentIndex = 0
    
    const item = galleryItems[currentIndex]
    const img = item.querySelector("img")
    const info = item.querySelector(".gallery-info")
    
    // Animate transition
    lightboxImg.style.opacity = "0"
    setTimeout(() => {
      lightboxImg.src = img.src
      lightboxImg.alt = img.alt
      
      if (info) {
        const title = info.querySelector("h4")
        const desc = info.querySelector("p")
        lightboxTitle.textContent = title ? title.textContent : ""
        lightboxDescription.textContent = desc ? desc.textContent : ""
      }
      
      lightboxImg.style.opacity = "1"
    }, 200)
  }
}

// Enhanced Smooth Scrolling with Easing
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.getElementById("header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        // Enhanced smooth scroll with custom easing
        smoothScrollTo(targetPosition, 800)
      }
    })
  })
}

// Custom smooth scroll function with easing
function smoothScrollTo(target, duration) {
  const start = window.pageYOffset
  const distance = target - start
  let startTime = null

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = easeInOutQuad(timeElapsed, start, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d/2
    if (t < 1) return c/2*t*t + b
    t--
    return -c/2 * (t*(t-2) - 1) + b
  }

  requestAnimationFrame(animation)
}

// Enhanced FAQ functionality with animations
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item, index) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")

    if (question && answer) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active")

        // Close all FAQ items with animation
        faqItems.forEach((faq) => {
          faq.classList.remove("active")
          const faqAnswer = faq.querySelector(".faq-answer")
          if (faqAnswer) {
            faqAnswer.style.maxHeight = "0"
            faqAnswer.style.opacity = "0"
          }
        })

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add("active")
          answer.style.maxHeight = answer.scrollHeight + "px"
          answer.style.opacity = "1"
        }
      })
    }
  })
}

// Enhanced Gallery filter functionality with animations
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item[data-category]")

  if (filterBtns.length === 0) return

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter")

      // Update active button with animation
      filterBtns.forEach((b) => {
        b.classList.remove("active")
        b.style.transform = "scale(1)"
      })
      btn.classList.add("active")
      btn.style.transform = "scale(1.05)"

      // Filter gallery items with stagger animation
      galleryItems.forEach((item, index) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          item.classList.remove("hidden")
          item.style.display = "block"
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, index * 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          
          setTimeout(() => {
            item.classList.add("hidden")
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// Enhanced Lightbox
function initEnhancedLightbox() {
  // Implementation handled in initGalleryLightbox
}

// Enhanced Parallax Effect
function initParallaxEffect() {
  const heroSection = document.querySelector(".hero")
  const parallaxElements = document.querySelectorAll("[data-parallax]")

  // Hero parallax
  if (heroSection && (window.location.pathname.endsWith("index.html") || window.location.pathname === "/")) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.3
      heroSection.style.transform = `translateY(${rate}px)`
    })
  }

  // General parallax elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })
}

// Enhanced Intersection Observer for Advanced Animations
function initIntersectionObserver() {
  const advancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target
        
        // Trigger custom animations based on data attributes
        if (element.dataset.animation) {
          element.style.animation = element.dataset.animation
        }
        
        // Add custom classes
        if (element.dataset.animateClass) {
          element.classList.add(element.dataset.animateClass)
        }
        
        advancedObserver.unobserve(element)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  })

  // Observe elements with data-animate attributes
  document.querySelectorAll("[data-animation], [data-animate-class]").forEach(el => {
    advancedObserver.observe(el)
  })
}

// Enhanced Form Animations
function initFormAnimations() {
  const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea')
  const formGroups = document.querySelectorAll('.form-group')

  formInputs.forEach(input => {
    // Focus animations
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused')
      this.style.transform = 'translateY(-2px)'
    })

    // Blur animations
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused')
      this.style.transform = 'translateY(0)'
    })

    // Input animations
    input.addEventListener('input', function() {
      if (this.value) {
        this.parentElement.classList.add('has-value')
      } else {
        this.parentElement.classList.remove('has-value')
      }
    })
  })

  // Animate form groups on scroll
  formGroups.forEach((group, index) => {
    group.style.setProperty('--i', index)
  })
}

// Enhanced Hover Effects
function initHoverEffects() {
  // Feature cards hover effect
  const featureCards = document.querySelectorAll(".feature-card")
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
      card.style.zIndex = "10"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
      card.style.zIndex = "1"
    })
  })

  // Button hover effects
  const buttons = document.querySelectorAll(".cta-button, .download-btn, .btn-secondary")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-3px) scale(1.05)"
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0) scale(1)"
    })
  })

  // Social links hover effect
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link, index) => {
    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateY(-3px) scale(1.1) rotate(5deg)"
    })

    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateY(0) scale(1) rotate(0deg)"
    })
  })
}

// Global function for opening lightbox (used in gallery.html)
window.openLightbox = (element) => {
  const galleryItem = element.closest(".gallery-item")
  const allItems = document.querySelectorAll(".gallery-item")
  const index = Array.from(allItems).indexOf(galleryItem)

  if (index !== -1) {
    const event = new CustomEvent("openLightbox", { detail: { index } })
    document.dispatchEvent(event)
  }
}

// Trigger page animations
function triggerPageAnimations() {
  // Animate navigation items
  const navItems = document.querySelectorAll('.nav-item')
  navItems.forEach((item, index) => {
    item.style.opacity = '0'
    item.style.transform = 'translateY(-20px)'
    setTimeout(() => {
      item.style.opacity = '1'
      item.style.transform = 'translateY(0)'
    }, index * 100)
  })

  // Animate hero content
  const heroContent = document.querySelector('.hero-content')
  if (heroContent) {
    heroContent.style.opacity = '0'
    heroContent.style.transform = 'translateX(-50px)'
    setTimeout(() => {
      heroContent.style.opacity = '1'
      heroContent.style.transform = 'translateX(0)'
    }, 500)
  }

  // Animate hero image
  const heroImage = document.querySelector('.hero-image')
  if (heroImage) {
    heroImage.style.opacity = '0'
    heroImage.style.transform = 'translateX(50px)'
    setTimeout(() => {
      heroImage.style.opacity = '1'
      heroImage.style.transform = 'translateX(0)'
    }, 700)
  }
}

// Enhanced image loading animation
function initImageLoading() {
  const images = document.querySelectorAll("img")

  images.forEach((img) => {
    img.style.opacity = "100"
    img.style.transition = "opacity 0.5s ease"
    
    img.addEventListener("load", () => {
      img.style.opacity = "1"
    })

    img.addEventListener("error", () => {
      img.style.opacity = "0.5"
      console.log("Image failed to load:", img.src)
    })
  })
}

// Initialize image loading
document.addEventListener("DOMContentLoaded", initImageLoading)

// Enhanced touch and gesture support
function initTouchSupport() {
  let touchStartX = 0
  let touchStartY = 0
  let touchEndX = 0
  let touchEndY = 0

  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX
    touchStartY = e.changedTouches[0].screenY
  }, { passive: true })

  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX
    touchEndY = e.changedTouches[0].screenY
    handleSwipe()
  }, { passive: true })

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX
    const deltaY = touchEndY - touchStartY
    const minSwipeDistance = 50

    // Horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe right - close sidebar if open
        const sidebar = document.getElementById('sidebar')
        if (sidebar && sidebar.classList.contains('active')) {
          sidebar.classList.remove('active')
          document.getElementById('hamburger').classList.remove('active')
          document.getElementById('sidebar-backdrop').classList.remove('active')
          document.body.style.overflow = ""
        }
      } else {
        // Swipe left - could be used for navigation
      }
    }

    // Vertical swipes
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0) {
        // Swipe down
      } else {
        // Swipe up - could close sidebar
        const sidebar = document.getElementById('sidebar')
        if (sidebar && sidebar.classList.contains('active')) {
          sidebar.classList.remove('active')
          document.getElementById('hamburger').classList.remove('active')
          document.getElementById('sidebar-backdrop').classList.remove('active')
          document.body.style.overflow = ""
        }
      }
    }
  }
}

// Initialize touch support
document.addEventListener("DOMContentLoaded", initTouchSupport)

// Performance monitoring
function initPerformanceMonitoring() {
  // Monitor animation performance
  let animationFrameId
  let lastTime = performance.now()
  let fps = 0

  function measureFPS(currentTime) {
    fps = 1000 / (currentTime - lastTime)
    lastTime = currentTime
    
    // If FPS drops below 30, reduce animations
    if (fps < 30) {
      document.body.classList.add('reduced-animations')
    } else {
      document.body.classList.remove('reduced-animations')
    }
    
    animationFrameId = requestAnimationFrame(measureFPS)
  }

  // Start monitoring in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    animationFrameId = requestAnimationFrame(measureFPS)
  }
}

// Initialize performance monitoring
document.addEventListener("DOMContentLoaded", initPerformanceMonitoring)

// Enhanced accessibility support
function initAccessibility() {
  // Keyboard navigation for custom elements
  const interactiveElements = document.querySelectorAll('.cta-button, .feature-card, .doc-card, .news-card')
  
  interactiveElements.forEach(element => {
    // Make elements focusable
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0')
    }
    
    // Add keyboard support
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        element.click()
      }
    })
  })

  // Announce page changes for screen readers
  const announcer = document.createElement('div')
  announcer.setAttribute('aria-live', 'polite')
  announcer.setAttribute('aria-atomic', 'true')
  announcer.className = 'sr-only'
  announcer.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `
  document.body.appendChild(announcer)

  // Announce navigation changes
  const navLinks = document.querySelectorAll('.nav-link, .sidebar-link')
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const pageName = link.textContent.trim()
      announcer.textContent = `Navigating to ${pageName} page`
    })
  })
}

// Initialize accessibility
document.addEventListener("DOMContentLoaded", initAccessibility)

// Enhanced error handling
window.addEventListener('error', (e) => {
  console.error('Script error:', e.error);

  // Prevent false-positive spam from ResizeObserver warnings
  if (e.error && e.error.name !== 'ResizeObserver loop limit exceeded') {
    // Optional: show a toast, modal, or console alert for user-friendly feedback
    // Example:
    // alert("An error occurred: " + e.error.message);
  }
});

// Enhanced resize handling
let resizeTimeout
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    // Recalculate animations and layouts
    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach(el => {
      // Reset animation state if needed
      if (window.innerWidth !== el.dataset.lastWidth) {
        el.dataset.lastWidth = window.innerWidth
        // Could re-trigger animations here if needed
      }
    })
  }, 250)
})

// Initialize all enhancements
console.log('Sheikh Tais Academy enhanced animations loaded successfully!')