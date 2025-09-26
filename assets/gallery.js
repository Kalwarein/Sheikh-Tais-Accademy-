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
})

// Splash Screen
function initSplashScreen() {
  const splashScreen = document.getElementById("splash-screen")

  // Only show splash screen on index.html
  if ((splashScreen && window.location.pathname.endsWith("index.html")) || window.location.pathname === "/") {
    // Hide splash screen after 3 seconds
    setTimeout(() => {
      splashScreen.classList.add("fade-out")
      setTimeout(() => {
        splashScreen.style.display = "none"
      }, 500)
    }, 3000)
  } else if (splashScreen) {
    // Hide splash screen immediately on other pages
    splashScreen.style.display = "none"
  }
}

// Navigation
function initNavigation() {
  const hamburger = document.getElementById("hamburger")
  const sidebar = document.getElementById("sidebar")
  const sidebarClose = document.getElementById("sidebar-close")
  const sidebarLinks = document.querySelectorAll(".sidebar-link")
  const header = document.getElementById("header")

  // Hamburger menu toggle
  hamburger.addEventListener("click", () => {
    sidebar.classList.add("active")
  })

  // Close sidebar
  sidebarClose.addEventListener("click", () => {
    sidebar.classList.remove("active")
  })

  // Close sidebar when clicking on links
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active")
    })
  })

  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove("active")
    }
  })

  // Sticky header on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "#ffffff"
      header.style.backdropFilter = "none"
    }
  })
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")
      }
    })
  }, observerOptions)

  // Add animation classes to elements
  const animatedElements = document.querySelectorAll(
    ".section-title, .section-subtitle, .feature-card, .doc-card, .news-card, .gallery-item, .about-text, .about-image, .hero-content, .hero-image, .download-text, .download-image",
  )

  animatedElements.forEach((el, index) => {
    el.classList.add("animate-on-scroll")
    el.style.animationDelay = `${index * 0.1}s`
    observer.observe(el)
  })

  // Add stagger animation to feature cards
  const featureCards = document.querySelectorAll(".feature-card")
  featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
  })
}

// Gallery Lightbox
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item")
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const lightboxClose = document.querySelector(".lightbox-close")

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img")
      lightboxImg.src = img.src
      lightboxImg.alt = img.alt
      lightbox.classList.add("active")
    })
  })

  // Close lightbox
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active")
  })

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active")
    }
  })

  // Close lightbox with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active")
    }
  })
}

// Smooth Scrolling
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

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// FAQ functionality for documentation page
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faq) => faq.classList.remove("active"))

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })
}

// Gallery filter functionality
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item[data-category]")

  if (filterBtns.length === 0) return

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter")

      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Filter gallery items
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          item.classList.remove("hidden")
          item.style.display = "block"
        } else {
          item.classList.add("hidden")
          item.style.display = "none"
        }
      })
    })
  })
}

function initEnhancedLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item")
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const lightboxClose = document.querySelector(".lightbox-close")
  const lightboxTitle = document.getElementById("lightbox-title")
  const lightboxDescription = document.getElementById("lightbox-description")
  const lightboxPrev = document.querySelector(".lightbox-prev")
  const lightboxNext = document.querySelector(".lightbox-next")

  if (!lightbox) return

  let currentIndex = 0
  let visibleItems = []

  function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(
      (item) => !item.classList.contains("hidden") && item.style.display !== "none",
    )
  }

  function openLightbox(index) {
    updateVisibleItems()
    currentIndex = index
    const item = visibleItems[currentIndex]
    const img = item.querySelector("img")
    const info = item.querySelector(".gallery-info")

    lightboxImg.src = img.src
    lightboxImg.alt = img.alt

    if (lightboxTitle && lightboxDescription && info) {
      const title = info.querySelector("h4")
      const desc = info.querySelector("p")
      lightboxTitle.textContent = title ? title.textContent : ""
      lightboxDescription.textContent = desc ? desc.textContent : ""
    }

    lightbox.classList.add("active")
  }

  function showPrevious() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1
    openLightbox(currentIndex)
  }

  function showNext() {
    currentIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0
    openLightbox(currentIndex)
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      updateVisibleItems()
      const visibleIndex = visibleItems.indexOf(item)
      if (visibleIndex !== -1) {
        openLightbox(visibleIndex)
      }
    })
  })

  // Navigation buttons
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", showPrevious)
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", showNext)
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("active")) {
      if (e.key === "ArrowLeft") showPrevious()
      if (e.key === "ArrowRight") showNext()
      if (e.key === "Escape") lightbox.classList.remove("active")
    }
  })

  // Close lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active")
    })
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active")
    }
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

// Add hover effects for interactive elements
document.addEventListener("DOMContentLoaded", () => {
  // Feature cards hover effect
  const featureCards = document.querySelectorAll(".feature-card")
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // Button hover effects
  const buttons = document.querySelectorAll(".cta-button, .download-btn, .btn-secondary")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-3px)"
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)"
    })
  })
})

// Add loading animation for images
function initImageLoading() {
  const images = document.querySelectorAll("img")

  images.forEach((img) => {
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

// Add scroll progress indicator
function initScrollProgress() {
  const progressBar = document.createElement("div")
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #5C4033, #FFC107);
        z-index: 9999;
        transition: width 0.3s ease;
    `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    progressBar.style.width = scrolled + "%"
  })
}

// Initialize scroll progress
document.addEventListener("DOMContentLoaded", initScrollProgress)

function initParallaxEffect() {
  const heroSection = document.querySelector(".hero")

  // Only apply parallax on home page
  if (heroSection && (window.location.pathname.endsWith("index.html") || window.location.pathname === "/")) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      heroSection.style.transform = `translateY(${rate}px)`
    })
  }
}

// Initialize parallax effect
document.addEventListener("DOMContentLoaded", initParallaxEffect)
