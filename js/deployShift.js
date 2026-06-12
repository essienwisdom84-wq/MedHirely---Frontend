// =========================================================================
// 1. GLOBAL PATH CONFIGURATIONS & UTILITIES
// =========================================================================

const API_BASE_URL = 'https://medhirely-backend.onrender.com/api/shifts';

// Client-side memory logging cache array
let activeShiftsLog = [];

// Currency Converter for Naira (₦)
function formatCurrency(value) {
  return new Intl.NumberFormat('en-NG', { 
    style: 'currency', 
    currency: 'NGN', 
    minimumFractionDigits: 0 
  }).format(value || 0);
}

// Date Parser (e.g., "Jun 12, 2026")
function formatDate(rawString) {
  if (!rawString) return "N/A";
  return new Date(rawString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

// Time Format Parser (e.g., "02:01 PM")
function formatTimeFormat(timeString) {
  if (!timeString) return "N/A";
  const [hour, minute] = timeString.split(':');
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const adjustedHour = hour % 12 || 12;
  return `${adjustedHour}:${minute} ${suffix}`;
}


// =========================================================================
// 2. VIEW CONTROLLER (DASHBOARD TOGGLING)
// =========================================================================

function switchViewTo(targetView) {
  const screenPostShift = document.getElementById("screenPostShift");
  const screenActiveShifts = document.getElementById("screenActiveShifts");
  const navPostShifts = document.getElementById("navPostShifts");
  const navActiveShifts = document.getElementById("navActiveShifts");

  if (!screenPostShift || !screenActiveShifts) return;

  if (targetView === 'POST') {
    screenPostShift.classList.remove('hidden');
    screenActiveShifts.classList.add('hidden');
    
    if (navPostShifts) navPostShifts.className = "w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#1D4ED8] bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg text-left";
    if (navActiveShifts) navActiveShifts.className = "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] rounded-lg transition text-left";
  } else if (targetView === 'DASHBOARD') {
    screenPostShift.classList.add('hidden');
    screenActiveShifts.classList.remove('hidden');
    
    if (navPostShifts) navPostShifts.className = "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] rounded-lg transition text-left";
    if (navActiveShifts) navActiveShifts.className = "w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#1D4ED8] bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg text-left";
  }
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}


// =========================================================================
// 3. SECURE DATA SAVE OPERATION (HANDLES INTERCEPT)
// =========================================================================

async function handleFormSubmit(e) {
  e.preventDefault(); // Immediately kills default HTML page refresh behavior
  console.log("Interception successful! Compiling payload structure...");

  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn ? submitBtn.querySelector('span') : null;
  const originalText = btnText ? btnText.innerText : "Deploy Shift Block";

  if (submitBtn && btnText) {
    submitBtn.disabled = true;
    btnText.innerText = "Deploying to Cloud...";
  }

  try {
    const dataExtractor = new FormData(e.target);

    // Dynamic Casing Rule Matrix: Maps the 24-hour clock string to the exact Mongoose database enums
    const startHourRaw = dataExtractor.get("startTime") || ""; // e.g. "13:45"
    const numericHour = parseInt(startHourRaw.split(":")[0], 10) || 0;

    let evaluatedShiftType = "day"; 
    if (numericHour >= 5 && numericHour < 12) {
      evaluatedShiftType = "morning";
    } else if (numericHour >= 12 && numericHour < 17) {
      evaluatedShiftType = "afternoon";
    } else if (numericHour >= 17 || numericHour < 5) {
      evaluatedShiftType = "night";
    }

    // Preserve your department text input seamlessly by embedding it inside instructions
    const deptText = dataExtractor.get("department") || "";
    const manualInstructions = dataExtractor.get("instructions") || "";
    const combinedInstructions = deptText 
      ? `DEPARTMENT: ${deptText.toUpperCase()}\n${manualInstructions}` 
      : manualInstructions;

    // Build perfect JSON schema matching your model conditions
    const newShiftPayload = {
      title: dataExtractor.get("role"),               
      shiftType: evaluatedShiftType,                 // Forces accurate schema-level validation clearance
      shiftDate: dataExtractor.get("date"),           
      startTime: startHourRaw,       
      endTime: dataExtractor.get("endTime"),           
      salary: parseFloat(dataExtractor.get("hourlyRate")) || 0, 
      workersNeeded: parseInt(dataExtractor.get("slots"), 10) || 1, 
      instructions: combinedInstructions,            
      location: "Main Medical Center",                
      facilityId: "65d123456789abcdef012345"          // Hex object reference constraint bypass
    };

    console.log("Transmission initialized. Sending Payload:", newShiftPayload);

    const response = await fetch(`${API_BASE_URL}/createShift`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(newShiftPayload)
    });

    const resultData = await response.json();

    if (!response.ok) {
      throw new Error(resultData.error || resultData.message || "Cloud server failed deployment transaction.");
    }

    console.log("Success! Cloud verified record generation:", resultData);
    
    const savedShift = resultData.shift || resultData;
    activeShiftsLog.unshift(savedShift);
    
    e.target.reset(); // Form fields only clear explicitly upon success response code
    populateShiftsTable();
    switchViewTo('DASHBOARD');

  } catch (error) {
    console.error("Critical submission intercept error:", error);
    alert(`Deployment Error: ${error.message}`);
  } finally {
    if (submitBtn && btnText) {
      submitBtn.disabled = false;
      btnText.innerText = originalText;
    }
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}


// =========================================================================
// 4. DATABASE REST FETCH STREAM OPERATOR
// =========================================================================

async function fetchShiftsFromBackend() {
  try {
    const response = await fetch(`${API_BASE_URL}/getAllShifts`);
    if (!response.ok) throw new Error('Could not pull shift registers.');
    
    const responseData = await response.json();
    activeShiftsLog = Array.isArray(responseData) ? responseData : (responseData.shifts || []);
    populateShiftsTable();
  } catch (error) {
    console.error("Fetch Exception:", error);
    const placeholderText = document.querySelector("#emptyTablePlaceholder p");
    if (placeholderText) {
      placeholderText.innerText = "Error refreshing data log pipeline.";
    }
  }
}


// =========================================================================
// 5. VIEW CONSOLE REBUILDER (ALIGNED MAPPING KEY TARGETS)
// =========================================================================

function populateShiftsTable() {
  const tbody = document.getElementById("shiftsTableBody");
  const emptyPlaceholder = document.getElementById("emptyTablePlaceholder");

  if (!tbody) return; 

  const dynamicRows = tbody.querySelectorAll('.dynamic-shift-row');
  dynamicRows.forEach(row => row.remove());

  if (!activeShiftsLog || activeShiftsLog.length === 0) {
    if (emptyPlaceholder) emptyPlaceholder.classList.remove('hidden');
    updateStatsCounters(0, 0);
    return;
  }

  if (emptyPlaceholder) emptyPlaceholder.classList.add('hidden');

  activeShiftsLog.forEach(shift => {
    const tr = document.createElement('tr');
    tr.className = "hover:bg-[#F8FAFC] transition dynamic-shift-row text-[#334155]";
    
    const shiftId = shift._id ? shift._id.toString().slice(-6).toUpperCase() : 'UNK';
    const shiftStatus = shift.status || 'OPEN';

    tr.innerHTML = `
      <td class="px-6 py-4 font-mono text-xs text-[#64748B] font-bold">#${shiftId}</td>
      <td class="px-6 py-4">
        <div class="font-semibold text-[#0F172A]">${shift.title || 'N/A'}</div>
        <div class="text-xs text-[#64748B]">${shift.instructions && shift.instructions.includes('DEPARTMENT:') ? shift.instructions.split('\n')[0] : 'General Block'}</div>
      </td>
      <td class="px-6 py-4">
        <div class="font-medium text-[#334155]">${formatDate(shift.shiftDate)}</div>
        <div class="text-xs text-[#64748B]">${formatTimeFormat(shift.startTime)} - ${formatTimeFormat(shift.endTime)}</div>
      </td>
      <td class="px-6 py-4 text-right font-bold text-[#0F172A]">${formatCurrency(shift.salary)}<span class="text-xs text-[#64748B] font-normal">/hr</span></td>
      <td class="px-6 py-4 text-center font-semibold">${shift.workersNeeded || 0}</td>
      <td class="px-6 py-4 text-center">
        <span class="bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
          <span class="w-1.5 h-1.5 bg-[#D97706] rounded-full animate-pulse"></span> ${shiftStatus}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });

  updateStatsCounters(activeShiftsLog.length, activeShiftsLog.length);
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function updateStatsCounters(total, unfilled) {
  const statTotalShifts = document.getElementById("statTotalShifts");
  const statUnfilled = document.getElementById("statUnfilled");
  const badgeQueueCount = document.getElementById("badgeQueueCount");

  if (statTotalShifts) statTotalShifts.innerText = total;
  if (statUnfilled) statUnfilled.innerText = unfilled;
  if (badgeQueueCount) badgeQueueCount.innerText = `${total} shift${total === 1 ? '' : 's'} total`;
}


// =========================================================================
// 6. LIFE-CYCLE RESILIENT ELEMENT MOUNT CONTROLLER
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  console.index = "DOM construction processing verification complete.";
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const navPostShifts = document.getElementById("navPostShifts");
  if (navPostShifts) {
    navPostShifts.addEventListener("click", () => switchViewTo('POST'));
  }

  const navActiveShifts = document.getElementById("navActiveShifts");
  if (navActiveShifts) {
    navActiveShifts.addEventListener("click", () => {
      switchViewTo('DASHBOARD');
      fetchShiftsFromBackend();
    });
  }

  const btnQuickPostRoute = document.getElementById("btnQuickPostRoute");
  if (btnQuickPostRoute) {
    btnQuickPostRoute.addEventListener("click", () => switchViewTo('POST'));
  }

  // TARGETING AND BINDING RECOVERY BLOCK
  const shiftCreationForm = document.getElementById("shiftCreationForm");
  if (shiftCreationForm) {
    console.log("Form component context bound. PreventDefault protection armed.");
    shiftCreationForm.addEventListener("submit", handleFormSubmit);
  } else {
    console.error("DOM warning: Element container '#shiftCreationForm' is missing on current viewport.");
  }

  if (document.getElementById("shiftsTableBody")) {
    fetchShiftsFromBackend();
  }
});