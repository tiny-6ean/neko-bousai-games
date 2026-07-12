let currentProfile = "";
let currentPlaces = [];
let correctPlace = "";

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.querySelectorAll(".profile-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const profile = btn.dataset.profile;
    startGame(profile);
  });
});

function startGame(profile) {
  currentProfile = profile;
  currentPlaces = placesData[profile];

  correctPlace = currentPlaces[Math.floor(Math.random() * currentPlaces.length)].id;

  renderPlaces();
  showScreen("screen-game");
}

function renderPlaces() {
  const container = document.getElementById("place-container");
  container.innerHTML = "";

  currentPlaces.forEach(place => {
    const card = document.createElement("div");
    card.className = "place-card";
    card.dataset.id = place.id;

    card.innerHTML = `
      <img src="${place.img}" alt="${place.label}">
      <p>${place.label}</p>
    `;

    card.addEventListener("click", () => checkPlace(place.id));
    container.appendChild(card);
  });
}

function checkPlace(id) {
  if (id === correctPlace) {
    showResult(true);
  } else {
    showResult(false);
  }
}

function showResult(isCorrect) {
  const text = document.getElementById("result-text");

  if (isCorrect) {
    text.innerText =
      "見つけた！災害時、猫は普段と違う場所に隠れることがあります。性格によって行動が変わることもあります。";
  } else {
    text.innerText =
      "今回は見つけられなかったけれど、猫は予想外の場所に隠れることがあります。性格ごとの行動を知っておくと安心です。";
  }

  showScreen("screen-result");
}

document.getElementById("retry-btn").addEventListener("click", () => {
  showScreen("screen-start");
});
