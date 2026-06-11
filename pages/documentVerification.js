

    lucide.createIcons();

    
    document.querySelectorAll('.file-input-control').forEach(input => {
      input.addEventListener('change', function(e) {
        if (this.files.length > 0) {
          const nameDisplayElement = this.closest('label').querySelector('.file-name-display');
          if (nameDisplayElement) {
            nameDisplayElement.innerText = this.files[0].name;
            nameDisplayElement.classList.add('italic');
          }
        }
      });
    });

    
    document.getElementById("additionalDocsInput").addEventListener("change", function(e) {
      if(this.files.length > 0) {
        document.getElementById("additionalDocsLabel").innerText = this.files[0].name;
      }
    });

    
    document.getElementById("verificationForm").addEventListener("submit", function(e) {
      e.preventDefault();
      

      const boundaryDataStream = new FormData(this);
      
      console.log("Ready for transmission to your Express/Multer backend handler pipeline.");
      alert("Dispatched standard Multipart Payload successfully.");
    });