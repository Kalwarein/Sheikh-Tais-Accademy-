// ============================================
// ELEVATION LODGE - MAIN SCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initNavigation()
  initRoomsFunctionality()
  initGalleryLightbox()
  initBookingForms()
  initSmoothScrolling()
  initHeroSlider()
  initScrollAnimations()
  initMinDateForBooking()
})

// ============================================
// NAVIGATION & MENU
// ============================================

function initNavigation() {
  const hamburger = document.querySelector('.hamburger')
  const navMenu = document.querySelector('.nav-menu')
  
  if (!hamburger || !navMenu) return

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active')
    hamburger.classList.toggle('active')
  })

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active')
      hamburger.classList.remove('active')
    })
  })
}

// ============================================
// ROOMS PAGE FUNCTIONALITY
// ============================================

const rooms = [
  {
    id: 1,
    name: 'Forest View Deluxe',
    type: 'Deluxe Room',
    price: 120,
    image: 'forest_deluxe.jpg',
    description: 'Experience luxury in our Forest View Deluxe room with stunning forest views, premium bedding, and modern amenities.',
    amenities: ['King-size bed', 'Marble bathroom', 'Private balcony', 'Flat-screen TV', 'Mini bar', 'High-speed WiFi', 'Climate control', 'Work desk'],
    details: 'Our Forest View Deluxe offers the perfect blend of comfort and elegance. Wake up to breathtaking forest vistas from your private balcony.'
  },
  {
    id: 2,
    name: 'Mountain Suite',
    type: 'Suite',
    price: 220,
    image: 'mountain_suite.jpg',
    description: 'Our premium Mountain Suite features panoramic views, spacious living area, and exclusive VIP amenities.',
    amenities: ['Master bedroom', 'Separate living area', 'Mountain views', 'Premium toiletries', 'Jacuzzi bathtub', 'Personal concierge', 'Champagne service', 'Priority dining'],
    details: 'Indulge in our Mountain Suite - the pinnacle of luxury. Enjoy panoramic mountain views from multiple windows.'
  },
  {
    id: 3,
    name: 'Cozy Standard',
    type: 'Standard Room',
    price: 80,
    image: 'cozy_standard.jpg',
    description: 'Comfortable and affordable, our Cozy Standard room offers essential amenities in a warm setting.',
    amenities: ['Double bed', 'Ensuite bathroom', 'Window view', 'Air conditioning', 'TV & WiFi', 'Telephone', 'Safe deposit', 'Daily housekeeping'],
    details: 'Our Cozy Standard room provides comfort at an affordable price. Perfect for budget-conscious travelers.'
  },
  {
    id: 4,
    name: 'Executive Room',
    type: 'Executive Room',
    price: 150,
    image: 'executive_room.jpg',
    description: 'Perfect for business travelers, our Executive Room combines style with functionality.',
    amenities: ['Queen-size bed', 'Executive work desk', 'Business lounge access', 'High-speed WiFi', 'Conference phone', 'Luxury bathroom', 'Room service', 'Priority checkout'],
    details: 'Designed for discerning business travelers, our Executive Room features a dedicated work space.'
  }
]

function initRoomsFunctionality() {
  document.querySelectorAll('.room-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const roomId = parseInt(e.target.dataset.roomId)
      openRoomModal(roomId)
    })
  })

  document.querySelectorAll('.room-book-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const roomName = e.target.dataset.roomName
      bookRoomWhatsApp(roomName)
    })
  })

  // Close room modal
  const roomModal = document.getElementById('roomModal')
  if (roomModal) {
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', closeRoomModal)
    })

    roomModal.addEventListener('click', (e) => {
      if (e.target === roomModal) closeRoomModal()
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeRoomModal()
    })
  }
}

function openRoomModal(roomId) {
  const room = rooms.find(r => r.id === roomId)
  if (!room) return

  const modal = document.getElementById('roomModal')
  if (!modal) return

  const img = modal.querySelector('.modal-room-image')
  if (img) img.src = room.image

  const nameEl = modal.querySelector('.modal-room-name')
  if (nameEl) nameEl.textContent = room.name

  const typeEl = modal.querySelector('.modal-room-type')
  if (typeEl) typeEl.textContent = room.type

  const priceEl = modal.querySelector('.modal-room-price')
  if (priceEl) priceEl.textContent = `$${room.price}/night`

  const descEl = modal.querySelector('.modal-room-description')
  if (descEl) descEl.textContent = room.details

  const amenitiesList = modal.querySelector('.modal-room-amenities')
  if (amenitiesList) {
    amenitiesList.innerHTML = room.amenities.map(a => `<li>✓ ${a}</li>`).join('')
  }

  modal.classList.add('active')
  document.body.style.overflow = 'hidden'
}

function closeRoomModal() {
  const modal = document.getElementById('roomModal')
  if (modal) {
    modal.classList.remove('active')
    document.body.style.overflow = 'auto'
  }
}

function bookRoomWhatsApp(roomName) {
  const whatsappNumber = '923001234567'
  const message = `Hi, I'd like to book the ${roomName} room. Could you please provide availability and pricing details?`
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappLink, '_blank')
}

// ============================================
// GALLERY LIGHTBOX
// ============================================

function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item')
  const modal = document.getElementById('galleryModal')

  if (!modal) return

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img')
      const modalImg = modal.querySelector('.modal-image')
      if (modalImg) modalImg.src = img.src
      modal.classList.add('active')
      document.body.style.overflow = 'hidden'
    })
  })

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active')
      document.body.style.overflow = 'auto'
    })
  })

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active')
      document.body.style.overflow = 'auto'
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active')
      document.body.style.overflow = 'auto'
    }
  })
}

// ============================================
// BOOKING FORMS
// ============================================

function initBookingForms() {
  const bookingForm = document.getElementById('quickBookingForm')
  const contactForm = document.getElementById('contactForm')

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault()
      handleBookingSubmit()
    })
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault()
      handleContactSubmit()
    })
  }
}

function handleBookingSubmit() {
  const roomType = document.getElementById('roomType')?.value
  const checkIn = document.getElementById('checkIn')?.value
  const checkOut = document.getElementById('checkOut')?.value
  const name = document.getElementById('name')?.value
  const phone = document.getElementById('phone')?.value
  const guests = document.getElementById('guests')?.value
  const specialRequests = document.getElementById('specialRequests')?.value

  if (!roomType || !checkIn || !checkOut || !name || !phone) {
    alert('Please fill in all required fields')
    return
  }

  const checkInDate = new Date(checkIn).toLocaleDateString()
  const checkOutDate = new Date(checkOut).toLocaleDateString()
  
  let message = `Hello! I would like to book the following:\n\n`
  message += `Room Type: ${roomType}\n`
  message += `Check-in: ${checkInDate}\n`
  message += `Check-out: ${checkOutDate}\n`
  message += `Guests: ${guests}\n`
  message += `Name: ${name}\n`
  message += `Phone: ${phone}\n`
  if (specialRequests) {
    message += `Special Requests: ${specialRequests}\n`
  }

  const whatsappNumber = '923001234567'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappLink, '_blank')

  document.getElementById('quickBookingForm').reset()
}

function handleContactSubmit() {
  const name = document.getElementById('contactName')?.value
  const email = document.getElementById('contactEmail')?.value
  const subject = document.getElementById('contactSubject')?.value
  const message = document.getElementById('contactMessage')?.value

  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields')
    return
  }

  const whatsappNumber = '923001234567'
  const whatsappMessage = `Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  window.open(whatsappLink, '_blank')

  document.getElementById('contactForm').reset()
  alert('Thank you for reaching out! We will respond shortly.')
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.room-card, .feature-card, .testimonial-card, .gallery-item, .pricing-card').forEach(el => {
    observer.observe(el)
  })
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute('href'))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })
}

// ============================================
// HERO SLIDER
// ============================================

function initHeroSlider() {
  const slides = document.querySelectorAll('.slide')
  if (slides.length === 0) return

  let currentSlide = 0

  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'))
    currentSlide = (n + slides.length) % slides.length
    slides[currentSlide].classList.add('active')
  }

  // Auto advance every 5 seconds
  const autoSlideInterval = setInterval(() => {
    showSlide(currentSlide + 1)
  }, 5000)

  // Manual controls
  const nextBtn = document.querySelector('.slide-next')
  const prevBtn = document.querySelector('.slide-prev')

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(autoSlideInterval)
      showSlide(currentSlide + 1)
      setTimeout(() => {
        autoSlideInterval
      }, 5000)
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      clearInterval(autoSlideInterval)
      showSlide(currentSlide - 1)
      setTimeout(() => {
        autoSlideInterval
      }, 5000)
    })
  }

  showSlide(0)
}

// ============================================
// DATE PICKER CONSTRAINTS
// ============================================

function initMinDateForBooking() {
  const checkInInput = document.getElementById('checkIn')
  const checkOutInput = document.getElementById('checkOut')

  if (!checkInInput) return

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0]
  checkInInput.setAttribute('min', today)

  // Update checkout minimum when checkin changes
  if (checkOutInput) {
    checkInInput.addEventListener('change', () => {
      const checkInDate = new Date(checkInInput.value)
      const tomorrow = new Date(checkInDate)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const minCheckOut = tomorrow.toISOString().split('T')[0]
      checkOutInput.setAttribute('min', minCheckOut)
    })
  }
}
