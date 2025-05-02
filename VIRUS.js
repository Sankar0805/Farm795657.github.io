document.addEventListener('DOMContentLoaded', function() {

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const virusCards = document.querySelectorAll('.virus-card');

    function performSearch() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      if (!searchTerm) return;

      let found = false;
      
      virusCards.forEach(card => {
        const virusName = card.dataset.name;
        const virusTitle = card.querySelector('.virus-name').textContent.toLowerCase();
        const virusDesc = card.querySelector('.virus-desc').textContent.toLowerCase();
        
        if (virusName.includes(searchTerm) || virusTitle.includes(searchTerm) || virusDesc.includes(searchTerm)) {
          card.classList.add('search-highlight');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          found = true;
          setTimeout(() => {
            card.classList.remove('search-highlight');
          }, 2000);
        }
      });

      if (!found) {
        alert('No viruses found matching "' + searchTerm + '"');
      }
    }
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') performSearch();
    });
  });