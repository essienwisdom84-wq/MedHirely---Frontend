

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        
        
        menuItems.forEach(i => {
          i.className = "menu-item flex items-center px-4 py-2 text-sm font-bold text-gray-900 rounded-md hover:bg-gray-100/80 transition-all pl-[38px]";
          
          if (i.getAttribute('data-tab') === 'logout') {
            i.className = "menu-item flex items-center px-4 py-2 text-sm font-bold text-gray-900 rounded-md hover:bg-red-50 hover:text-red-600 transition-all pl-[38px]";
          }
        });

        
        if (item.getAttribute('data-tab') !== 'logout') {
          item.className = "menu-item flex items-center gap-3.5 bg-[#e8f0fe] text-[#2f74fa] border border-[#2f74fa] px-4 py-2.5 rounded-md font-bold text-sm transition shadow-sm";
        }
      });
    });

    
    const starButtons = document.querySelectorAll('.star-btn');
    starButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetIndex = parseInt(button.getAttribute('data-index'), 10);
        
        starButtons.forEach(btn => {
          const btnIndex = parseInt(btn.getAttribute('data-index'), 10);
          if (btnIndex <= targetIndex) {
            
            btn.className = "star-btn text-[#2563eb] hover:scale-110 transition focus:outline-none";
            btn.querySelector('svg').style.fill = "currentColor";
          } else {
            
            btn.className = "star-btn text-[#2563eb] hover:scale-110 transition focus:outline-none";
            btn.querySelector('svg').style.fill = "currentColor";
          }
        });
      });
    });


    const reviewInput = document.getElementById('reviewInput');
    const charCounter = document.getElementById('charCounter');

    function updateCounter() {
      const length = reviewInput.value.length;
      charCounter.innerText = `${length}/500`;
    }

    reviewInput.addEventListener('input', updateCounter);
    
    updateCounter();

    const submitBtn = document.getElementById('submitReviewBtn');
    submitBtn.addEventListener('click', () => {
      submitBtn.innerText = "Review Submitted";
      submitBtn.className = "w-full bg-emerald-600 text-white font-bold text-sm py-2.5 rounded-lg shadow-md transition pointer-events-none";
      

      setTimeout(() => {
        submitBtn.innerText = "Submit Review";
        submitBtn.className = "w-full bg-[#2f74fa] text-white font-bold text-sm py-2.5 rounded-lg border border-transparent shadow-md hover:bg-blue-600 transition active:scale-[0.99] focus:outline-none";
      }, 3000);
    });