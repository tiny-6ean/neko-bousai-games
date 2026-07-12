const screenStart = document.getElementById("screen-start");
const screenItems = document.getElementById("screen-items");
const screenResult = document.getElementById("screen-result");

const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const retryBtn = document.getElementById("retry-btn");

const selectPersonality = document.getElementById("select-personality");
const selectAge = document.getElementById("select-age");
const selectHealth = document.getElementById("select-health");

const itemContainer = document.getElementById("item-container");
const resultText = document.getElementById("result-text");

let selectedItems = [];

function showScreen(target) {
  screenStart.classList.remove("active");
  screenItems.classList.remove("active");
  screenResult.classList.remove("active");
  target.classList.add("active");
}

startBtn.addEventListener("click", () => {
  selectedItems = [];
  itemContainer.innerHTML = "";

  itemsData.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.dataset.id = item.id;

    card.innerHTML = `
      <img src="${item.img}" alt="${item.label}">
      <p>${item.label}</p>
    `;

    card.addEventListener("click", () => {
      card.classList.toggle("selected");

      if (selectedItems.includes(item.id)) {
        selectedItems = selectedItems.filter(i => i !== item.id);
      } else {
        selectedItems.push(item.id);
      }
    });

    itemContainer.appendChild(card);
  });

  showScreen(screenItems);
});

submitBtn.addEventListener("click", () => {
  const personality = selectPersonality.value;
  const age = selectAge.value;
  const health = selectHealth.value;

  const profilePriority = priorityMap[personality][age][health];

  const highPriority = [...profilePriority.high, ...extraPriority.high];
  const mediumPriority = [...profilePriority.medium, ...extraPriority.medium];
  const lowPriority = [...profilePriority.low];

  const missedHigh = highPriority.filter(id => !selectedItems.includes(id));
  const pickedMedium = mediumPriority.filter(id => selectedItems.includes(id));
  const pickedLow = lowPriority.filter(id => selectedItems.includes(id));

  let html = "";

  html += `<h3>高優先度（必ず入れたい）</h3><ul>`;
  highPriority.forEach(id => {
    const item = itemsData.find(i => i.id === id);
    html += `<li>${item.label} — ${advice[id]}</li>`;
  });
  html += `</ul><br>`;

  html += `<h3>中優先度（あると安心）</h3><ul>`;
  mediumPriority.forEach(id => {
    const item = itemsData.find(i => i.id === id);
    html += `<li>${item.label} — ${advice[id]}</li>`;
  });
  html += `</ul><br>`;

  html += `<h3>低優先度（状況による）</h3><ul>`;
  lowPriority.forEach(id => {
    const item = itemsData.find(i => i.id === id);
    html += `<li>${item.label} — ${advice[id]}</li>`;
  });
  html += `</ul><br>`;

  if (missedHigh.length > 0) {
    html += `<p><strong>⚠ 高優先度の中で不足しているものがあります：</strong><br>`;
    html += missedHigh.map(id => itemsData.find(i => i.id === id).label).join("、 ");
    html += `</p><br>`;
  } else {
    html += `<p>◎ 高優先度のアイテムはすべて揃っています</p><br>`;
  }

  if (pickedMedium.length > 0) {
    html += `<p>よく気づきました（中優先度）：<br>`;
    html += pickedMedium.map(id => itemsData.find(i => i.id === id).label).join("、 ");
    html += `</p><br>`;
  }

  if (pickedLow.length > 0) {
    html += `<p>低優先度のアイテムも選ばれています（状況によって役立ちます）</p>`;
  }

  resultText.innerHTML = html;
  resultText.style.textAlign = "left";

  showScreen(screenResult);
});

retryBtn.addEventListener("click", () => {
  selectedItems = [];
  showScreen(screenStart);
});

window.scrollTo({ top: 0, behavior: "smooth" });
