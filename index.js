
const gameContainer = document.getElementById("gameContainer");

const cardValues = [
  "🤥",
  "🤥",
  "😁",
  "😁",
  "😇",
  "😇",
  "💑",
  "💑",
  "😁",
  "😁",
  "🤣",
  "🤣",
  "🧐",
  "🧐",
  "😎",
  "😎",
];
// Хэрэглэгчийн оруулсан массивыг санамсаргүй байдлаар холих функц
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 0-аас i хүртэл санамсаргүй индекс
    [array[i], array[j]] = [array[j], array[i]]; // Хоёр элементийг солих
  }
  return array;
}

// Картуудыг үүсгэж, DOM руу нэмэх
shuffle(cardValues);
cardValues.forEach((value) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value; // Картын утгыг dataset-д хадгалах
  card.innerHTML = '<span class="hidden">' + value + "</span>";
  gameContainer.appendChild(card); // Картуудыг gameContainer дотор нэмэх
});

// Карт сонгох, хослол шалгах
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Карт дарсан үед ажиллах функц
function flipCard(event) {
  if (lockBoard) return; // Түгжигдсэн бол буцаах
  const clickedCard = event.target;

  // Нэг картыг давхар дарахаас сэргийлэх
  if (clickedCard === firstCard) return;

  // Картыг эргүүлэх
  clickedCard.classList.add("flipped");
  clickedCard.querySelector("span").classList.remove("hidden");

  // Эхний карт эсэхийг шалгах
  if (!firstCard) {
    firstCard = clickedCard; // Эхний карт
  } else {
    secondCard = clickedCard; // Хоёр дахь карт
    checkForMatch(); // Хослолыг шалгах
  }
}

// Хослолыг шалгах функц
function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;
  isMatch ? disableCards() : unflipCards();
}

// Таарсан бол картуудыг идэвхгүй болгох
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

// Таараагүй бол картуудыг буцааж хаах
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    firstCard.querySelector("span").classList.add("hidden");
    secondCard.classList.remove("flipped");
    secondCard.querySelector("span").classList.add("hidden");
    resetBoard();
  }, 1000); // 1 секундын дараа картуудыг буцаана
}

// Төлөвийг дахин тохируулах
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Карт бүрт дарах үйл явдлыг холбох
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", flipCard);
});