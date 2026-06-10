const menuItems = document.querySelectorAll(".menu-item");
const doneBtn = document.getElementById("doneActionBtn");
const successModal = document.getElementById("successModal");
const toast = document.getElementById("toastNotification");

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    menuItems.forEach((i) => {
      i.className =
        "menu-item flex items-center px-4 py-2.5 text-sm font-bold text-gray-900 rounded-md hover:bg-gray-100/80 transition pl-[38px]";
      if (i.getAttribute("data-tab") === "logout") {
        i.className =
          "menu-item flex items-center px-4 py-2.5 text-sm font-bold text-gray-900 rounded-md hover:bg-red-50 hover:text-red-600 transition pl-[38px]";
      }
    });

    if (item.getAttribute("data-tab") !== "logout") {
      item.className =
        "menu-item flex items-center gap-3.5 bg-[#e8f0fe] text-[#2f74fa] border border-[#2f74fa] px-4 py-2.5 rounded-md font-bold text-sm transition shadow-xs";
    }
  });
});

doneBtn.addEventListener("click", () => {
  doneBtn.innerText = "Processing Workspace...";
  doneBtn.className =
    "w-64 bg-emerald-600 text-white font-bold text-sm py-3 rounded-lg shadow-md transition pointer-events-none";

  setTimeout(() => {
    successModal.classList.replace("scale-100", "scale-95");
    successModal.classList.replace("opacity-100", "opacity-0");

    toast.classList.replace("translate-y-20", "translate-y-0");
    toast.classList.replace("opacity-0", "opacity-100");
  }, 800);

  setTimeout(() => {
    successModal.classList.replace("scale-95", "scale-100");
    successModal.classList.replace("opacity-0", "opacity-100");
    doneBtn.innerText = "Done";
    doneBtn.className =
      "w-64 bg-[#2f74fa] text-white font-bold text-sm py-3 rounded-lg border border-transparent shadow-md hover:bg-blue-600 transition active:scale-[0.99] focus:outline-none";

    // Hide Toast
    toast.classList.replace("translate-y-0", "translate-y-20");
    toast.classList.replace("opacity-100", "opacity-0");
  }, 3800);
});
