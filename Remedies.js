document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const remedyCards = document.querySelectorAll('.remedy-card');

    function performSearch() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      if (!searchTerm) return;

      let found = false;
      
      remedyCards.forEach(card => {
        const remedyName = card.dataset.name;
        const remedyTitle = card.querySelector('.remedy-title').textContent.toLowerCase();
        const remedyDesc = card.querySelector('.remedy-desc').textContent.toLowerCase();
        
        if (remedyName.includes(searchTerm) || remedyTitle.includes(searchTerm) || remedyDesc.includes(searchTerm)) {
          card.classList.add('search-highlight');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          found = true;
          setTimeout(() => {
            card.classList.remove('search-highlight');
          }, 2000);
        }
      });

      if (!found) {
        alert('No remedies found matching "' + searchTerm + '"');
      }
    }
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') performSearch();
    });
  });