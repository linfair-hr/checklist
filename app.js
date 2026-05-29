document.addEventListener("DOMContentLoaded", () => {
  const projectListEl = document.getElementById("projectList");
  const categorySummaryEl = document.getElementById("categorySummary");
  const leaveSummaryEl = document.getElementById("leaveSummary");
  const qualificationChecklistEl = document.getElementById("qualificationChecklist");
  const totalAmountEl = document.getElementById("totalAmount");
  
  const scoreSelect = document.getElementById("performanceScore");
  const empNameInput = document.getElementById("employeeName");
  const deptSelect = document.getElementById("department"); // 已更新為下拉選單變數

  function init() {
    if(!projectListEl) return;
    renderProjects();
    renderQualifications();
    loadSavedData();
    updateCalculations();

    scoreSelect.addEventListener("change", () => {
      updateItemStatusByScore();
      updateCalculations();
      saveToStorage();
    });
    empNameInput.addEventListener("input", saveToStorage);
    deptSelect.addEventListener("change", saveToStorage); // 已更新：由 input 改為監聽 change 事件
    
    document.getElementById("resetBtn").addEventListener("click", resetForm);
    document.getElementById("printBtn").addEventListener("click", () => window.print());
  }

  function renderProjects() {
    let html = "";
    for (const [catKey, catData] of Object.entries(CHECKLIST_DATA.categories)) {
      html += `<div class="course-group">
        <h2 class="group-title">${catData.title}</h2>
        <div class="course-table">`;
      
      catData.items.forEach(item => {
        const displayValue = item.isLeave ? "假別獎勵" : `$${item.bonus.toLocaleString()}`;
        html += `
          <div class="course-row" id="row_${item.id}">
            <div class="course-cell-check">
              <input type="checkbox" id="${item.id}" data-category="${catKey}" data-bonus="${item.bonus}" data-isleave="${item.isLeave || false}" data-name="${item.name}" value="${item.id}">
            </div>
            <div class="course-cell-info" style="flex: 2; text-align: left;">
              <label for="${item.id}" style="font-weight:bold; cursor:pointer; display:block;">${item.name}</label>
              <div class="course-code" style="color: #666; font-size: 0.85em; margin-top: 4px;">門檻：達 ${item.minScore} 分以上 ｜ ${item.note}</div>
            </div>
            <div class="course-cell-credits" style="text-align: right; font-weight: bold; color: #2b6cb0; min-width: 80px;">
              ${displayValue}
            </div>
          </div>`;
      });
      html += `</div></div>`;
    }
    projectListEl.innerHTML = html;

    projectListEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener("change", () => {
        updateCalculations();
        saveToStorage();
      });
    });
  }

  function renderQualifications() {
    let html = "";
    CHECKLIST_DATA.qualifications.forEach(q => {
      html += `
        <li style="text-align: left; margin-bottom: 10px;">
          <label style="display: flex; gap: 8px; align-items: flex-start; cursor: pointer;">
            <input type="checkbox" id="${q.id}">
            <span>${q.text}</span>
          </label>
        </li>`;
    });
    qualificationChecklistEl.innerHTML = html;

    qualificationChecklistEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener("change", saveToStorage);
    });
  }

  function updateItemStatusByScore() {
    const currentScore = parseInt(scoreSelect.value) || 0;

    for (const [catKey, catData] of Object.entries(CHECKLIST_DATA.categories)) {
      catData.items.forEach(item => {
        const checkbox = document.getElementById(item.id);
        const row = document.getElementById(`row_${item.id}`);
        
        if (checkbox && row) {
          if (scoreSelect.value === "" || currentScore < item.minScore) {
            checkbox.checked = false;
            checkbox.disabled = true;
            row.style.opacity = "0.4";
            row.style.backgroundColor = "#f7fafc";
          } else {
            checkbox.disabled = false;
            row.style.opacity = "1";
            row.style.backgroundColor = "";
          }
        }
      });
    }
  }

  function updateCalculations() {
    let totalAmount = 0;
    const summary = {};
    const selectedLeaves = [];

    for (const key in CHECKLIST_DATA.categories) {
      summary[key] = { title: CHECKLIST_DATA.categories[key].title, count: 0, amount: 0 };
    }

    projectListEl.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      const bonus = parseInt(cb.getAttribute("data-bonus")) || 0;
      const catKey = cb.getAttribute("data-category");
      const isLeave = cb.getAttribute("data-isleave") === "true";
      const itemName = cb.getAttribute("data-name");
      
      totalAmount += bonus;
      summary[catKey].count += 1;
      summary[catKey].amount += bonus;

      if (isLeave) {
        selectedLeaves.push(itemName);
      }
    });

    totalAmountEl.textContent = totalAmount.toLocaleString();

    let summaryHtml = "";
    for (const key in summary) {
      summaryHtml += `
        <li style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.95em;">
          <span>${summary[key].title} (已選 ${summary[key].count} 項)</span>
          <strong style="color: #2d3748;">$${summary[key].amount.toLocaleString()}</strong>
        </li>`;
    }
    categorySummaryEl.innerHTML = summaryHtml;

    if (selectedLeaves.length > 0) {
      let leaveHtml = "";
      selectedLeaves.forEach(leave => {
        leaveHtml += `<li style="text-align: left; margin-bottom: 4px; padding-left: 5px; border-left: 3px solid #2b6cb0;">✔ ${leave}</li>`;
      });
      leaveSummaryEl.innerHTML = leaveHtml;
    } else {
      leaveSummaryEl.innerHTML = `<li style="text-align: left; color: #a0aec0; font-weight: normal; font-style: italic;">暫無申請假別</li>`;
    }
  }

  function saveToStorage() {
    const data = {
      name: empNameInput.value,
      dept: deptSelect.value, // 記憶下拉選單的值
      score: scoreSelect.value,
      checkedItems: [],
      checkedQuals: []
    };

    projectListEl.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      data.checkedItems.push(cb.id);
    });

    qualificationChecklistEl.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      data.checkedQuals.push(cb.id);
    });

    localStorage.setItem("perf_bonus_checklist_v2", JSON.stringify(data));
  }

  function loadSavedData() {
    const saved = localStorage.getItem("perf_bonus_checklist_v2");
    if (!saved) {
      updateItemStatusByScore();
      return;
    }

    try {
      const data = JSON.parse(saved);
      empNameInput.value = data.name || "";
      deptSelect.value = data.dept || ""; // 還原下拉選單的值

      updateItemStatusByScore();

      if (data.checkedItems) {
        data.checkedItems.forEach(id => {
          const cb = document.getElementById(id);
          if (cb && !cb.disabled) cb.checked = true;
        });
      }

      if (data.checkedQuals) {
        data.checkedQuals.forEach(id => {
          const cb = document.getElementById(id);
          if (cb) cb.checked = true;
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  function resetForm() {
    if (confirm("確定要清除所有已填寫的檢核內容嗎？")) {
      localStorage.removeItem("perf_bonus_checklist_v2");
      empNameInput.value = "";
      deptSelect.value = ""; // 清空選取狀態
      scoreSelect.value = "";
      
      projectListEl.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
      qualificationChecklistEl.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
      
      updateItemStatusByScore();
      updateCalculations();
    }
  }

  init();
});
