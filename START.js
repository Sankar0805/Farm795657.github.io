const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

document.querySelector('.btn[href="#guide"]').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#guide').scrollIntoView({
    behavior: 'smooth'
  });
});

let currentGuideIndex = 0;
let guideInterval;
const guideTrack = document.getElementById('guideTrack');
const guideSlides = document.querySelectorAll('.guide-slide');
const guidePrevBtn = document.getElementById('guidePrevBtn');
const guideNextBtn = document.getElementById('guideNextBtn');
const guideIndicators = document.querySelectorAll('.guide-indicator');

function updateGuideCarousel() {
  guideTrack.style.transform = `translateX(-${currentGuideIndex * 100}%)`;
  guideIndicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentGuideIndex);
  });
}

function goToGuideSlide(index) {
  currentGuideIndex = (index + guideSlides.length) % guideSlides.length;
  updateGuideCarousel();
}

function nextGuideSlide() {
  goToGuideSlide(currentGuideIndex + 1);
}

function prevGuideSlide() {
  goToGuideSlide(currentGuideIndex - 1);
}

function startGuideAutoSlide() {
  guideInterval = setInterval(nextGuideSlide, 5000);
}

function resetGuideAutoSlide() {
  clearInterval(guideInterval);
  startGuideAutoSlide();
}

guideNextBtn.addEventListener('click', () => {
  nextGuideSlide();
  resetGuideAutoSlide();
});

guidePrevBtn.addEventListener('click', () => {
  prevGuideSlide();
  resetGuideAutoSlide();
});

guideIndicators.forEach(indicator => {
  indicator.addEventListener('click', () => {
    const index = parseInt(indicator.getAttribute('data-index'));
    goToGuideSlide(index);
    resetGuideAutoSlide();
  });
});

let guideTouchStartX = 0;
let guideTouchEndX = 0;

guideTrack.addEventListener('touchstart', (e) => {
  guideTouchStartX = e.changedTouches[0].clientX;
}, {passive: true});

guideTrack.addEventListener('touchend', (e) => {
  guideTouchEndX = e.changedTouches[0].clientX;
  if (guideTouchEndX < guideTouchStartX - 50) nextGuideSlide();
  else if (guideTouchEndX > guideTouchStartX + 50) prevGuideSlide();
  resetGuideAutoSlide();
}, {passive: true});

guideTrack.addEventListener('mouseenter', () => clearInterval(guideInterval));
guideTrack.addEventListener('mouseleave', () => resetGuideAutoSlide());

startGuideAutoSlide();