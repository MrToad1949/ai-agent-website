const readout = document.querySelector("#radar-readout");
const status = document.querySelector("#radar-status");
const bars = document.querySelector(".signal-bars");
const areas = ["北東部", "東部", "南東部", "南部", "西部", "北部"];
let tick = 0;

const zoomButton = document.querySelector(".image-zoom");
const imageModal = document.querySelector("#image-modal");
const modalClose = document.querySelector(".modal-close");
const reportButton = document.querySelector("#report-button");
const reportModal = document.querySelector("#report-modal");
const reportModalClose = document.querySelector("#report-modal-close");
const recordButtons = document.querySelectorAll(".record[data-record-id]");
const recordModal = document.querySelector("#record-modal");
const recordModalClose = document.querySelector("#record-modal-close");
const recordModalCode = document.querySelector("#record-modal-code");
const recordModalTitle = document.querySelector("#record-modal-title");
const recordModalSummary = document.querySelector("#record-modal-summary");
const recordModalStatus = document.querySelector("#record-modal-status");
const recordModalLocation = document.querySelector("#record-modal-location");
const recordModalDetail = document.querySelector("#record-modal-detail");
let activeRecordButton = null;

const recordDetails = {
  s041: {
    code: "S-041",
    title: "農道脇で短く太い影を確認",
    summary: "夕方に茶色い胴体状の影を見たとの報告です。写真はなく、周辺状況を確認中です。",
    status: "確認中",
    location: "山間部の農道脇。詳細な住所は非公開です。",
    detail: "側溝付近へ移動したように見えたとの内容です。似た時間帯の通行状況、周辺の小動物の活動、草の倒れ方を照合しています。"
  },
  s042: {
    code: "S-042",
    title: "沢沿いで幅広いこすれ跡を確認",
    summary: "落ち葉の上に連続したこすれ跡があったとの報告です。自然要因を含めて整理しています。",
    status: "再確認予定",
    location: "沢沿いの斜面。私有地に近いため詳細地点は非公開です。",
    detail: "雨水、落枝、小動物の移動跡など複数の可能性があります。次回の記録整理時に、天候と地面の状態をあわせて確認します。"
  },
  s043: {
    code: "S-043",
    title: "石垣付近で不明な音を聞いたとの報告",
    summary: "複数名から音に関する情報提供があり、録音データの有無を確認しています。",
    status: "資料整理中",
    location: "集落外れの石垣付近。生活圏に近いため詳細地点は非公開です。",
    detail: "短い破裂音のように聞こえたという報告です。鳥、虫、落石、人工音の可能性も含め、時間帯と周辺環境の情報を整理しています。"
  }
};

setInterval(() => {
  tick += 1;
  const strength = 58 + Math.round(Math.sin(tick * 0.9) * 18 + Math.random() * 10);
  const barLevel = Math.max(1, Math.min(4, Math.ceil(strength / 25)));
  const area = areas[tick % areas.length];

  readout.textContent = `受付集中度 ${strength}% / 区分 ${area}`;
  status.textContent = strength > 78 ? "高め" : "確認中";
  bars.dataset.strength = String(barLevel);
}, 1400);

const openModal = () => {
  imageModal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
};

const closeModal = () => {
  imageModal.hidden = true;
  document.body.classList.remove("modal-open");
  zoomButton.focus();
};

zoomButton.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !imageModal.hidden) {
    closeModal();
  }
});

const openReportModal = () => {
  reportModal.hidden = false;
  document.body.classList.add("modal-open");
  reportModalClose.focus();
};

const closeReportModal = () => {
  reportModal.hidden = true;
  document.body.classList.remove("modal-open");
  reportButton.focus();
};

reportButton.addEventListener("click", openReportModal);
reportModalClose.addEventListener("click", closeReportModal);
reportModal.addEventListener("click", (event) => {
  if (event.target === reportModal) {
    closeReportModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !reportModal.hidden) {
    closeReportModal();
  }
});

const openRecordModal = (recordId, button) => {
  const detail = recordDetails[recordId];

  if (!detail) {
    return;
  }

  activeRecordButton = button;
  recordModalCode.textContent = detail.code;
  recordModalTitle.textContent = detail.title;
  recordModalSummary.textContent = detail.summary;
  recordModalStatus.textContent = detail.status;
  recordModalLocation.textContent = detail.location;
  recordModalDetail.textContent = detail.detail;
  recordModal.hidden = false;
  document.body.classList.add("modal-open");
  recordModalClose.focus();
};

const closeRecordModal = () => {
  recordModal.hidden = true;
  document.body.classList.remove("modal-open");

  if (activeRecordButton) {
    activeRecordButton.focus();
  }
};

recordButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openRecordModal(button.dataset.recordId, button);
  });

  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openRecordModal(button.dataset.recordId, button);
    }
  });
});

recordModalClose.addEventListener("click", closeRecordModal);
recordModal.addEventListener("click", (event) => {
  if (event.target === recordModal) {
    closeRecordModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !recordModal.hidden) {
    closeRecordModal();
  }
});
