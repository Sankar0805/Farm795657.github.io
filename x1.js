document.addEventListener('DOMContentLoaded', function() {
  const toggleShowMore = (buttonId, contentId) => {
    const btn = document.getElementById(buttonId);
    const content = document.getElementById(contentId);
    
    if (btn && content) {
      btn.addEventListener('click', function() {
        const isHidden = content.style.display !== 'block';
        content.style.display = isHidden ? 'block' : 'none';
        btn.textContent = isHidden ? 'Show Less' : 'Show More';
        
        if (isHidden) {
          setTimeout(() => {
            content.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      });
    }
  };
  toggleShowMore('showMoreCropsBtn', 'additionalCrops');
  toggleShowMore('showMoreRemediesBtn', 'additionalRemedies');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-btn');

  const performSearch = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) return;

    let foundCard = null;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
      const cardText = card.querySelector('.card-text').textContent.toLowerCase();

      if (cardTitle.includes(searchTerm) || cardText.includes(searchTerm)) {
        foundCard = card;
        card.style.animation = 'highlight 1s';
        card.addEventListener('animationend', () => card.style.animation = '');
      }
    });

    if (foundCard) {
      foundCard.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      foundCard.classList.add('search-highlight');
      setTimeout(() => foundCard.classList.remove('search-highlight'), 2000);
    } else {
      alert(`No crops or remedies found for "${searchTerm}"`);
    }
  };
  if (searchBtn) searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    performSearch();
  });

  if (searchInput) searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });
  const carouselTrack = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelectorAll('.indicator');
  
  if (carouselTrack && slides.length > 0) {
    let currentIndex = 0;
    const slideCount = slides.length;
    let carouselInterval;

    function updateCarousel() {
      carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      updateCarousel();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateCarousel();
    }
    
    function startAutoRotate() {
      carouselInterval = setInterval(nextSlide, 5000);
    }

    updateCarousel();
    startAutoRotate();
    if (prevBtn) prevBtn.addEventListener('click', () => {
      clearInterval(carouselInterval);
      prevSlide();
      startAutoRotate();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
      clearInterval(carouselInterval);
      nextSlide();
      startAutoRotate();
    });
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        clearInterval(carouselInterval);
        currentIndex = index;
        updateCarousel();
        startAutoRotate();
      });
    });
    
    carouselTrack.addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });
    
    carouselTrack.addEventListener('mouseleave', startAutoRotate);
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes highlight {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7); }
      50% { transform: scale(1.02); box-shadow: 0 0 15px 5px rgba(46, 204, 113, 0.4); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
    }
    .search-highlight {
      outline: 3px solid #2ecc71;
      transition: outline 0.3s ease;
    }
    .additional-content {
      display: none;
    }
    .carousel-track {
      display: flex;
      transition: transform 0.5s ease;
    }
    .carousel-slide {
      min-width: 100%;
    }
    .indicator.active {
      background-color: #2ecc71;
    }
  `;
  document.head.appendChild(style);
});