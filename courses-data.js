const CHECKLIST_DATA = {
  categories: {
    welfare: {
      title: "員工福利",
      items: [
        { id: "wel_fit_m", name: "員工健康檢查補助 (主管職)", bonus: 6000, minScore: 90, note: "檢附健檢發票/收據、符合申請健檢補助通知之 mail 頁面" },
        { id: "wel_fit_s", name: "員工健康檢查補助 (部屬職)", bonus: 5000, minScore: 90, note: "檢附健檢發票/收據、符合申請健檢補助通知之 mail 頁面" },
        { id: "wel_fit_85", name: "員工健康檢查補助", bonus: 5000, minScore: 85, note: "檢附健檢發票/收據、符合申請健檢補助通知之 mail 頁面" },
        { id: "wel_fit_80", name: "員工健康檢查補助", bonus: 3000, minScore: 80, note: "檢附健檢發票/收據、符合申請健檢補助通知之 mail 頁面" },
        { id: "wel_tour_95", name: "旅遊補助金", bonus: 6000, minScore: 95, note: "檢附當年度績效考核成績達 95 分以上相關與收據與同行同仁證明" },
        { id: "wel_tour_80", name: "旅遊補助金", bonus: 3000, minScore: 80, note: "檢附當年度績效考核成績達 80 分以上相關與收據與同行同仁證明" },
        { id: "wel_tour_70", name: "旅遊補助金", bonus: 1500, minScore: 70, note: "檢附當年度績效考核成績達 70~79 分相關與收據與同行同仁證明" },
        { id: "wel_birthday", name: "生日假", bonus: 0, minScore: 80, isLeave: true, note: "檢附當年度績效考核成績達 80 分以上之 mail 頁面" },
        { id: "wel_newbie", name: "新人假", bonus: 0, minScore: 85, isLeave: true, note: "檢附當年度新進人員考核成績達 85 分以上之 mail 頁面" }
      ]
    },
    bonus: {
      title: "各類獎金",
      items: [
        { id: "bon_team", name: "聚餐獎金申請 (每人補助 1,000 元)", bonus: 1000, minScore: 85, note: "部門全體同仁考核成績達 85 分以上者。檢附簽到表、當年度績效考核成績達 85 分之證明" }
      ]
    },
    excellent: {
      title: "績優員工獎",
      items: [
        { id: "exc_sport", name: "運動獎金申請 (每月最高 1,500 元)", bonus: 1500, minScore: 85, note: "檢附訓練證明、收據、當年度績效考核成績達 85 分之證明" },
        { id: "exc_off", name: "每月一週 周休三日", bonus: 0, minScore: 85, isLeave: true, note: "檢附當年度績效考核成績達 85 分之證明" },
        { id: "exc_festival", name: "優員工節金 (中秋、端午發放金額各 3,500 元)", bonus: 7000, minScore: 90, note: "檢附當年度績效考核成績達 90 分之證明" }
      ]
    }
  },
  qualifications: [
    { id: "q1", text: "已通過新進人員考核並參與各類績效考核者。" },
    { id: "q2", text: "凡受本公司正式任用並已通過新進人員考核。" },
    { id: "q3", text: "任職滿 1 年之員工，並參與各類績效考核者。" },
    { id: "q4", text: "參與全年上下年度 OKR 考核符合發放標準之員工均適用之。" },
    { id: "q5", text: "已通過新進人員考核並參與各類績效考核者。" },
    { id: "q6", text: "旅遊補助金: 年度申請一次為限，生效年度為公司公告舉辦之當年(含上下年)度。" },
    { id: "q7", text: "生日假: 限於生日當月當天或當月請畢，不得逾期、延期 or 要求折換代金。" },
    { id: "q8", text: "新人假: 使用期間為通過新人考核後滿半年為主。" },
    { id: "q9", text: "運動獎金: 每個月可申請一次，每次補助最高1,500元。" },
    { id: "q10", text: "每月一週周休三日: 績效考核成績公布後二週內提出申請，逾時不補且無相關補償代金。" },
    { id: "q11", text: "績優員工節金(中秋、端午): 績效考核成績公布後二週內提出申請，逾時不補且無相關補償代金。" }
  ]
};
