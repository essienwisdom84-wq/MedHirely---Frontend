// Adjust values within the Staff count control element
      function adjustCount(val) {
        const el = document.getElementById("staff-count");
        let num = parseInt(el.value) || 1;
        num += val;
        if (num < 1) num = 1;
        el.value = num;
      }

      // Toggle focus state of shift configuration selections
      function toggleShiftBtn(activeBtn) {
        const btns = document
          .getElementById("shift-type-group")
          .querySelectorAll(".shift-btn");
        btns.forEach((b) => {
          b.className =
            "shift-btn flex items-center justify-between gap-3 px-5 py-2.5 bg-slate-200/70 text-slate-700 text-xs font-bold rounded-full transition min-w-[90px] hover:bg-slate-200";
        });
        activeBtn.className =
          "shift-btn flex items-center justify-between gap-3 px-5 py-2.5 bg-brand-600 text-white text-xs font-bold rounded-full shadow-sm transition min-w-[90px]";
      }
    