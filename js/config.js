const BASE_URL = "https://medhirely-backend.onrender.com/api";

window.APP_CONFIG = {
  // Core API Base
  BASE_URL: BASE_URL,

  // 1. Authentication & Session Endpoints (Used by login.html, logoutAccount.js)
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    SIGNUP: `${BASE_URL}/auth/register`,
  },

  // 2. Shift Management Endpoints (Used by newShift.js, shift-progress.html)
  SHIFTS: {
    CREATE: `${BASE_URL}/shifts/createShift`,
    COMPLETE: (shiftId) => `${BASE_URL}/shifts/${shiftId}/complete`,
    FLAG: (shiftId) => `${BASE_URL}/shifts/${shiftId}/flag`,
    REVIEW_HOURS: (shiftId) => `${BASE_URL}/shifts/${shiftId}/review`,
  },

  // 3. Verification Endpoints (Used by workerVerification.js, documentVerification.js)
  VERIFICATION: {
    WORKER_SUBMIT: `${BASE_URL}/verification/worker`,
    FACILITY_SUBMIT: `${BASE_URL}/verification/facility`,
    UPLOAD_DOCS: `${BASE_URL}/documents/upload`,
  },

  // 4. Pool Settings Endpoints (Used by preferredPool.js, notPreferredPool.js)
  POOLS: {
    PREFERRED: `${BASE_URL}/pools/preferred`,
    NOT_PREFERRED: `${BASE_URL}/pools/not-preferred`,
  },

  // 5. Ratings & Reviews Endpoints (Used by review.js, worker-review.html)
  REVIEWS: {
    SUBMIT: `${BASE_URL}/reviews/submit`,
    GET_RATINGS: (facilityId) => `${BASE_URL}/reviews/facility/${facilityId}`,
  },
};
