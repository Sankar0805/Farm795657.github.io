document.addEventListener('DOMContentLoaded', function() {
    let originalCardStates = new Map();
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
  
    const performSearch = () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      if (!searchTerm) {
        document.querySelectorAll('.card').forEach(card => {
          const originalState = originalCardStates.get(card);
          if (originalState) {
            card.style.display = originalState.display;
            card.style.opacity = originalState.opacity;
            card.style.order = originalState.order;
            card.classList.remove('search-highlight');
          }
        });
        document.getElementById('showMoreCropsBtn').textContent = 'Show More';
        document.getElementById('showMoreRemediesBtn').textContent = 'Show More';
        return;
      }
      document.querySelectorAll('.card').forEach(card => {
        if (!originalCardStates.has(card)) {
          originalCardStates.set(card, {
            display: card.style.display || 'block',
            opacity: card.style.opacity || '1',
            order: card.style.order || '0'
          });
        }
      });
      document.getElementById('additionalCrops').style.display = 'block';
      document.getElementById('additionalRemedies').style.display = 'block';
      document.getElementById('showMoreCropsBtn').textContent = 'Show Less';
      document.getElementById('showMoreRemediesBtn').textContent = 'Show Less';
  
      let foundAny = false;
      const allCards = document.querySelectorAll('.card');
      let visibleCardsInRow = 0;
      let currentRow = 1;
  
      allCards.forEach((card, index) => {
        const cardTitle = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const cardText = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
        const cardMatch = cardTitle.includes(searchTerm) || cardText.includes(searchTerm);
  
        if (cardMatch) {
          foundAny = true;
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.order = currentRow * 100 + visibleCardsInRow;
          card.classList.add('search-highlight');
          
          visibleCardsInRow++;
          if (visibleCardsInRow >= 3) {
            visibleCardsInRow = 0;
            currentRow++;
          }
        } else {
          card.style.display = 'block';
          card.style.opacity = '0.2';
          card.style.order = '9999';
          card.classList.remove('search-highlight');
        }
      });
      while (visibleCardsInRow > 0 && visibleCardsInRow < 3) {
        visibleCardsInRow++;
      }
  
      if (!foundAny) {
        alert(`No results found for "${searchTerm}"`);
        allCards.forEach(card => {
          const originalState = originalCardStates.get(card);
          if (originalState) {
            card.style.display = originalState.display;
            card.style.opacity = originalState.opacity;
            card.style.order = originalState.order;
          }
        });
      } else {
        const firstMatch = document.querySelector('.search-highlight');
        if (firstMatch) {
          firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
      });
    }
  
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          performSearch();
        }
      });
      searchInput.addEventListener('input', (e) => {
        if (searchInput.value.trim() === '') {
          performSearch();
        }
      });
    }
    const setupToggleButtons = () => {
      document.getElementById('showMoreCropsBtn')?.addEventListener('click', function() {
        const additionalCrops = document.getElementById('additionalCrops');
        if (additionalCrops.style.display === 'none') {
          additionalCrops.style.display = 'block';
          this.textContent = 'Show Less';
        } else {
          additionalCrops.style.display = 'none';
          this.textContent = 'Show More';
        }
      });
  
      document.getElementById('showMoreRemediesBtn')?.addEventListener('click', function() {
        const additionalRemedies = document.getElementById('additionalRemedies');
        if (additionalRemedies.style.display === 'none') {
          additionalRemedies.style.display = 'block';
          this.textContent = 'Show Less';
        } else {
          additionalRemedies.style.display = 'none';
          this.textContent = 'Show More';
        }
      });
    };
    setupToggleButtons();
    const style = document.createElement('style');
    style.textContent = `
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      .card {
        transition: all 0.3s ease;
        will-change: transform;
      }
      @keyframes highlight {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7); }
        50% { transform: scale(1.02); box-shadow: 0 0 15px 5px rgba(46, 204, 113, 0.4); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
      }
      .search-highlight {
        animation: highlight 1s;
        outline: 3px solid #2ecc71;
      }
      .additional-content {
        display: none;
      }
    `;
    document.head.appendChild(style);
  });
document.addEventListener('DOMContentLoaded', function() {
  const carouselTrack = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelectorAll('.indicator');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  
  function updateCarousel() {
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      slides[currentIndex].classList.add('active');
      indicators[currentIndex].classList.add('active');
      
      const slideWidth = slides[0].getBoundingClientRect().width;
      carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      updateCarousel();
  }
  function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateCarousel();
  }
  function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
  }
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => goToSlide(index));
  });
  
  let autoSlideInterval = setInterval(nextSlide, 5000);
  
  carouselTrack.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
  });
  
  carouselTrack.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(nextSlide, 5000);
  });
  let touchStartX = 0;
  let touchEndX = 0;
  
  carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
          nextSlide();
      } else if (touchEndX > touchStartX + 50) {
          prevSlide();
      }
  }
  updateCarousel();
  window.addEventListener('resize', () => {
      updateCarousel();
  });
});