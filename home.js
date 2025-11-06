// ------------------ Tailwind Dark Mode ------------------
tailwind.config = { darkMode: 'class' };

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function updateToggleIcon() {
  if (html.classList.contains("dark")) {
    themeToggle.innerHTML = '<i class="bx bx-sun text-yellow-400"></i>';
  } else {
    themeToggle.innerHTML = '<i class="bx bx-moon text-gray-700"></i>';
  }
}
updateToggleIcon();

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  updateToggleIcon();
});

// ------------------ Cards Data ------------------
const cardsData = [
  { title: "Personality", category: "Personality", image: "Assets/1.jpg" },
  { title: "Favorite Anime", category: "Favorites", image: "Assets/2.jpg" },
  { title: "Dream World", category: "Dreams", image: "Assets/3.jpg" },
  { title: "Hobbies", category: "Hobbies", image: "Assets/4.jpg" },
  { title: "Quote", category: "Favorites", image: "Assets/5.jpg" },
  { title: "Adventure", category: "Hobbies", image: "Assets/6.jpg" },
  { title: "Friendship", category: "Personality", image: "Assets/7.jpg" },
  { title: "Learning", category: "Hobbies", image: "Assets/8.jpg" },
  { title: "Creativity", category: "Hobbies", image: "Assets/9.jpg" },
  { title: "Motivation", category: "Favorites", image: "Assets/10.jpg" },
  { title: "Relaxation", category: "Dreams", image: "Assets/11.jpg" },
  { title: "Future Goals", category: "Dreams", image: "Assets/12.jpg" }
];

// ------------------ Elements ------------------
const grid = document.getElementById("cardsGrid");
const modal = document.getElementById("infoModal");
const closeModalBtn = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDesc = document.getElementById("modalDesc");

const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");
const sidebarClose = document.getElementById("sidebarClose");

// ------------------ Display Cards ------------------
function displayCards(data) {
  grid.innerHTML = "";

  data.forEach((item, i) => {
    const card = document.createElement("div");
    card.classList.add(
      "card",
      "rounded-2xl","shadow-lg","overflow-hidden","cursor-pointer",
      "hover:scale-105","transform","transition",
      "bg-white","dark:bg-gray-700",
      "opacity-0","translate-y-6","transition-all","duration-700","ease-out"
    );

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="w-full h-56 object-cover">
      <div class="p-4">
        <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">${item.title}</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400">${item.category}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(item));
    grid.appendChild(card);

    // Animate cards with stagger
    setTimeout(() => {
      card.classList.remove("opacity-0","translate-y-6");
      card.classList.add("opacity-100","translate-y-0");
    }, i * 100);
  });
}

// ------------------ Modal Functions ------------------
function openModal(item) {
  modalImage.src = item.image;
  modalTitle.textContent = item.title;
  modalCategory.textContent = item.category;
  modalDesc.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti.";

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  const modalContent = modal.querySelector("div");
  modalContent.classList.add("scale-75","opacity-0","transition-all","duration-300","ease-out");
  setTimeout(() => {
    modalContent.classList.remove("scale-75","opacity-0");
    modalContent.classList.add("scale-100","opacity-100");
  }, 50);
}

function closeModal() {
  const modalContent = modal.querySelector("div");
  modalContent.classList.remove("scale-100","opacity-100");
  modalContent.classList.add("scale-75","opacity-0");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

closeModalBtn.addEventListener("click", closeModal);

// ------------------ Sidebar Animations ------------------
burger.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
  sidebar.classList.add("transition-transform","duration-300","ease-out");
});
sidebarClose.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  sidebar.classList.add("transition-transform","duration-300","ease-in");
});

// ------------------ Header Animation ------------------
const headerTitle = document.querySelector("header h1");
if (headerTitle) {
  headerTitle.classList.add("opacity-0","translate-y-6","transition-all","duration-700","ease-out");
  setTimeout(() => {
    headerTitle.classList.remove("opacity-0","translate-y-6");
    headerTitle.classList.add("opacity-100","translate-y-0");
  }, 100);
}

// ------------------ Search/Filter Animation ------------------
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");

[searchInput, genreFilter].forEach((el, i) => {
  el.classList.add("opacity-0","translate-y-4","transition-all","duration-500","ease-out");
  setTimeout(() => {
    el.classList.remove("opacity-0","translate-y-4");
    el.classList.add("opacity-100","translate-y-0");
  }, 400 + i*100);
});

// ------------------ Animate texts ------------------

// Animate header text
const headerText = document.querySelector("header h1");
if (headerText) {
  headerText.classList.add("opacity-0","translate-y-4","transition-all","duration-700","ease-out");
  setTimeout(() => {
    headerText.classList.remove("opacity-0","translate-y-4");
    headerText.classList.add("opacity-100","translate-y-0");
  }, 100);
}

// Animate sidebar texts (name, role, hobbies, etc.)
const sidebarTexts = document.querySelectorAll("#sidebar h3, #sidebar p, #sidebar .text-left p");
sidebarTexts.forEach((el, i) => {
  el.classList.add("opacity-0","translate-y-4","transition-all","duration-500","ease-out");
  setTimeout(() => {
    el.classList.remove("opacity-0","translate-y-4");
    el.classList.add("opacity-100","translate-y-0");
  }, 300 + i*100); // stagger
});

// Animate card texts separately after card image appears
const cards = document.querySelectorAll("#cardsGrid .card");
cards.forEach((card, i) => {
  const texts = card.querySelectorAll("h3, p");
  texts.forEach((txt, j) => {
    txt.classList.add("opacity-0","translate-y-2","transition-all","duration-500","ease-out");
    setTimeout(() => {
      txt.classList.remove("opacity-0","translate-y-2");
      txt.classList.add("opacity-100","translate-y-0");
    }, 200 + j*100 + i*100); // stagger by card and text
  });
});

// Animate modal texts
const modalTexts = modal.querySelectorAll("h3, p");
modalTexts.forEach((txt, i) => {
  txt.classList.add("opacity-0","translate-y-2","transition-all","duration-400","ease-out");
  setTimeout(() => {
    txt.classList.remove("opacity-0","translate-y-2");
    txt.classList.add("opacity-100","translate-y-0");
  }, 150 + i*100);
});


// ------------------ Initialize ------------------
displayCards(cardsData);
