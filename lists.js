document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your consultation request. Our rice specialist will contact you within 24 hours.');
    this.reset();
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.virus-card, .condition-card, .location-card').forEach(card => {
    observer.observe(card);
});