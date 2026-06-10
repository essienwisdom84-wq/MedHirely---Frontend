
    // System Pointers Setup Map configuration parameters parameters
    const facilityCards = document.querySelectorAll('.facility-list-card');
    const inputNote = document.getElementById('inputAdminNoteField');
    const btnAddNote = document.getElementById('btnSubmitAdminNote');
    const notesFeed = document.getElementById('adminNotesFeedList');
    
    // Header Operation Triggers References
    const btnApprove = document.getElementById('btnApprove');
    const btnRequestInfo = document.getElementById('btnRequestInfo');
    const btnReject = document.getElementById('btnReject');
    
    // Card Information Fields Hook references pointers
    const detailImg = document.getElementById('detailFacilityImg');
    const detailName = document.getElementById('detailFacilityName');
    const detailId = document.getElementById('detailFacilityId');
    const detailDate = document.getElementById('detailFacilityDate');
    const detailType = document.getElementById('detailFacilityType');
    const detailStatusText = document.getElementById('detailStatusText');
    const detailStatusDot = document.getElementById('detailStatusDot');
    
    const infoName = document.getElementById('infoCardName');
    const infoType = document.getElementById('infoCardType');
    const infoEmail = document.getElementById('infoCardEmail');
    const infoPhone = document.getElementById('infoCardPhone');
    const infoAddress = document.getElementById('infoCardAddress');
    const infoWebsite = document.getElementById('infoCardWebsite');
    
    const licenseNum = document.getElementById('licenseCardNum');
    const licenseAuth = document.getElementById('licenseCardAuth');
    const licenseIssue = document.getElementById('licenseCardIssue');
    const licenseExpiry = document.getElementById('licenseCardExpiry');
    
    const timelineActiveText = document.getElementById('timelineActiveText');
    const complianceBackgroundText = document.getElementById('complianceBackgroundReviewText');
    const statPendingCount = document.getElementById('statPendingCount');

    // Global Interactive Mock Data Store Object Matrix Array Configuration
    const databaseMockRegistry = {
      "FAC-000485": {
        name: "St Luke's Hospital",
        date: "May 28, 2026",
        type: "Hospital",
        img: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=200&h=140",
        email: "admin@stlukes.com",
        phone: "+2348012345678",
        address: "13 Dbs Road, Lekki, Lagos",
        web: "www.stlukes.com",
        licNum: "LIC-2345986",
        licAuth: "Medical & Dental Council of Nigeria",
        licIssue: "12 Jan 2025",
        licExpiry: "12 Jan 2027",
        complianceBackground: "Pending",
        timelineStatus: "Awaiting Approval"
      },
      "FAC-991204": {
        name: "Icon Clinic",
        date: "May 27, 2026",
        type: "Clinic",
        img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=200&h=140",
        email: "contact@iconclinic.org",
        phone: "+2348123456789",
        address: "45 Delta Crescent, Asaba",
        web: "www.iconclinic.org",
        licNum: "LIC-8812043",
        licAuth: "Ministry of Health Nigeria",
        licIssue: "04 Mar 2024",
        licExpiry: "04 Mar 2028",
        complianceBackground: "Pending",
        timelineStatus: "Reviewing Documents"
      },
      "FAC-481902": {
        name: "Central City Hospital",
        date: "May 27, 2026",
        type: "Hospital",
        img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=200&h=140",
        email: "info@centralcityhosp.com",
        phone: "+2349033445566",
        address: "Garki Area 11, Abuja",
        web: "www.centralcityhosp.com",
        licNum: "LIC-0029341",
        licAuth: "Medical & Dental Council of Nigeria",
        licIssue: "20 Sep 2023",
        licExpiry: "20 Sep 2026",
        complianceBackground: "Pending",
        timelineStatus: "Background Check"
      },
      "FAC-110294": {
        name: "Hopewell Clinic - Kwara",
        date: "May 26, 2026",
        type: "Clinic",
        img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=200&h=140",
        email: "kwara@hopewell.com",
        phone: "+2347055667788",
        address: "88 Taiwo Road, Ilorin",
        web: "www.hopewellclinics.com",
        licNum: "LIC-9930122",
        licAuth: "Kwara State Health Board",
        licIssue: "15 May 2025",
        licExpiry: "15 May 2027",
        complianceBackground: "Pending",
        timelineStatus: "Awaiting Verification"
      },
      "FAC-755490": {
        name: "Hopewell Clinic - Owerri",
        date: "May 26, 2026",
        type: "Clinic",
        img: "https://images.unsplash.com/photo-1502740479796-6199bf3430c5?auto=format&fit=crop&q=80&w=200&h=140",
        email: "owerri@hopewell.com",
        phone: "+2348099887766",
        address: "Wetheral Road, Owerri",
        web: "www.hopewellclinics.com",
        licNum: "LIC-7554901",
        licAuth: "Imo State Bureau of Health",
        licIssue: "01 Dec 2024",
        licExpiry: "01 Dec 2026",
        complianceBackground: "Pending",
        timelineStatus: "Review Started"
      }
    };

    // --- A. GLOBAL ALERT TOAST WIDGET HELPER ROUTINE ---
    const globalToast = document.getElementById('actionFeedbackToastPortal');
    const toastIcon = document.getElementById('toastIconPayload');
    const toastText = document.getElementById('toastTextPayload');

    function fireToastNotification(message, icon = "⚙️") {
      toastIcon.innerText = icon;
      toastText.innerText = message;
      globalToast.classList.replace('translate-y-24', 'translate-y-0');
      globalToast.classList.replace('opacity-0', 'opacity-100');
      
      setTimeout(() => {
        globalToast.classList.replace('translate-y-0', 'translate-y-24');
        globalToast.classList.replace('opacity-100', 'opacity-0');
      }, 3000);
    }

    // --- B. FACILITY LIST ITEM CLICK FLOW HANDLER CONTROLLER ---
    facilityCards.forEach(card => {
      card.addEventListener('click', () => {
        // Clear active styles off other cards parameters setup
        facilityCards.forEach(c => {
          c.className = "facility-list-card bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-2.5 relative cursor-pointer shadow-2xs transition-all";
        });
        
        // Highlight chosen selection card target node context
        card.className = "facility-list-card bg-[#f8faff] border-2 border-[#2f74fa] rounded-xl p-2.5 relative cursor-pointer shadow-2xs transition-all";
        
        // Extract parameters metrics data store object properties values match
        const facId = card.getAttribute('data-facility-id');
        const dataRecord = databaseMockRegistry[facId];
        
        if (dataRecord) {
          // Render updates inside right profile details workspace window view variables
          detailImg.src = dataRecord.img;
          detailName.innerText = dataRecord.name;
          detailId.innerText = facId;
          detailDate.innerText = dataRecord.date;
          detailType.innerText = dataRecord.type;
          
          infoName.innerText = dataRecord.name;
          infoType.innerText = dataRecord.type;
          infoEmail.innerText = dataRecord.email;
          infoPhone.innerText = dataRecord.phone;
          infoAddress.innerText = dataRecord.address;
          infoWebsite.innerText = dataRecord.web;
          infoWebsite.href = "#";
          
          licenseNum.innerText = dataRecord.licNum;
          licenseAuth.innerText = dataRecord.licAuth;
          licenseIssue.innerText = dataRecord.licIssue;
          licenseExpiry.innerText = dataRecord.licExpiry;
          
          timelineActiveText.innerText = dataRecord.timelineStatus;
          complianceBackgroundText.innerText = dataRecord.complianceBackground;
          
          // Sync state modifications visually to view match constraints setup parameters
          if (dataRecord.timelineStatus === "Approved") {
            detailStatusText.innerText = "Approved";
            detailStatusDot.className = "w-2 h-2 rounded-full bg-emerald-500";
            complianceBackgroundText.className = "text-emerald-600 font-black text-[10px] uppercase tracking-tight";
          } else if (dataRecord.timelineStatus === "Rejected") {
            detailStatusText.innerText = "Rejected";
            detailStatusDot.className = "w-2 h-2 rounded-full bg-red-500";
            complianceBackgroundText.className = "text-red-600 font-black text-[10px] uppercase tracking-tight";
          } else {
            detailStatusText.innerText = "Pending Review";
            detailStatusDot.className = "w-2 h-2 rounded-full bg-orange-500 animate-pulse";
            complianceBackgroundText.className = "text-orange-500 font-black text-[10px] uppercase tracking-tight";
          }
          
          fireToastNotification(`Loaded details for: ${dataRecord.name}`, "📂");
        }
      });
    });

    // --- C. DYNAMIC INTERACTIVE AD-HOC NOTE CREATOR ENGINE ACTION ROUTINE ---
    function submitNewAdminNote() {
      const noteStringText = inputNote.value.trim();
      if (!noteStringText) return;
      
      // Build document node layout capsule
      const noteElementNode = document.createElement('div');
      noteElementNode.className = "bg-blue-50/60 border border-blue-100/70 rounded-lg p-2 text-[10px] leading-tight animate-fade-in shadow-3xs";
      noteElementNode.innerHTML = `
        <p class="text-slate-700 font-semibold">${noteStringText}</p>
        <div class="flex items-center justify-between mt-1.5 text-[9px] text-slate-400 font-bold">
          <span class="text-[#2f74fa]">Admin Dera <span class="text-slate-400 font-medium">Just now</span></span>
        </div>
      `;
      
      // Prepend layout wrapper array feed loop child elements node context setup
      notesFeed.insertBefore(noteElementNode, notesFeed.firstChild);
      inputNote.value = "";
      fireToastNotification("Comment logged to facility notes timeline logs feed stream.", "✍️");
    }

    btnAddNote.addEventListener('click', submitNewAdminNote);
    inputNote.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitNewAdminNote(); });

    // --- D. VERIFICATION DIRECT ACTION STATUS CONTROLLERS HOOK ENGINE ROUTINE ---
    btnApprove.addEventListener('click', () => {
      const currentActiveId = detailId.innerText;
      if (databaseMockRegistry[currentActiveId]) {
        databaseMockRegistry[currentActiveId].timelineStatus = "Approved";
        databaseMockRegistry[currentActiveId].complianceBackground = "Verified";
        
        detailStatusText.innerText = "Approved";
        detailStatusDot.className = "w-2 h-2 rounded-full bg-emerald-500";
        timelineActiveText.innerText = "Approved";
        complianceBackgroundText.innerText = "Verified";
        complianceBackgroundText.className = "text-emerald-600 font-black text-[10px] uppercase tracking-tight";
        
        fireToastNotification("Facility status modified permanently to 'Approved'. Activation sequence initiated.", "✅");
      }
    });

    btnReject.addEventListener('click', () => {
      const currentActiveId = detailId.innerText;
      if (databaseMockRegistry[currentActiveId]) {
        databaseMockRegistry[currentActiveId].timelineStatus = "Rejected";
        databaseMockRegistry[currentActiveId].complianceBackground = "Failed";
        
        detailStatusText.innerText = "Rejected";
        detailStatusDot.className = "w-2 h-2 rounded-full bg-red-500";
        timelineActiveText.innerText = "Rejected";
        complianceBackgroundText.innerText = "Failed";
        complianceBackgroundText.className = "text-red-600 font-black text-[10px] uppercase tracking-tight";
        
        fireToastNotification("Facility review marked as 'Rejected'. Notification dispatched to administrator.", "❌");
      }
    });

    btnRequestInfo.addEventListener('click', () => {
      fireToastNotification("Dispatched request documentation info prompt ticket sequence checklist out to facility coordinator contact node mail channels.", "✉️");
    });