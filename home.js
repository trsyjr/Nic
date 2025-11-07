// ------------------ Theme Toggle (Boxicons) ------------------
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

if (localStorage.getItem("theme") === "dark") html.classList.add("dark");

function updateToggleIcon() {
  themeToggle.innerHTML = html.classList.contains("dark")
    ? '<i class="bx bx-sun text-yellow-400 text-3xl"></i>'
    : '<i class="bx bx-moon text-gray-700 text-3xl"></i>';
}
updateToggleIcon();

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  updateToggleIcon();
});

// ------------------ Sidebar Toggle ------------------
const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");
const sidebarClose = document.getElementById("sidebarClose");

burger?.addEventListener("click", () => sidebar.classList.toggle("-translate-x-full"));
sidebarClose?.addEventListener("click", () => sidebar.classList.add("-translate-x-full"));

// ------------------ Cards Data ------------------
const cardsData = [
  {
    title: "Origin Story",
    category: "Personal",
    images: [
      "Assets/O1.jpeg","Assets/O2.jpeg","Assets/O3.png","Assets/O4.png","Assets/O5.png",
      "Assets/O6.jpeg","Assets/O7.jpeg","Assets/O8.jpeg","Assets/O9.jpeg","Assets/O10.jpeg"
    ],
    desc: "Born into a humble family, I am the third child among six siblings..."
  },
  {
    title: "Personality",
    category: "Personality",
    images: ["Assets/P1.jpeg","Assets/P2.jpeg","Assets/P3.jpeg","Assets/P4.jpeg"],
    desc: "People often see me as outgoing and fun, but deep inside..."
  },
  {
    title: "Favorite Soundtrack",
    category: "Favorites",
    images: ["Assets/M1.gif"],
    soundtrack: "Assets/Show Yourself.mp3",
    desc: "I listen to a wide variety of music — from Philippine hip-hop and K-pop songs..."
  },
  {
    title: "Dreams",
    category: "Dreams",
    images: ["Assets/D1.jpeg","Assets/D2.jpeg","Assets/D3.jpeg","Assets/D4.jpeg"],
    desc: "Ever since I can remember, I’ve been someone who didn’t really dream big..."
  },
  {
    title: "Hobbies",
    category: "Hobbies",
    images: ["Assets/H1.png"],
    desc: "I spend most of my time reading mangas and watching series with my loving girlfriend..."
  }
];

// ------------------ Display Cards ------------------
const grid = document.getElementById("cardsGrid");

function displayCards(data) {
  if (!grid) return;
  grid.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-700 transition-transform hover:scale-105 cursor-pointer";

    card.innerHTML = `
      <img src="${item.images[0]}" alt="${item.title}" class="w-full h-56 object-cover">
      <div class="p-4">
        <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">${item.title}</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">${item.category}</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">${item.desc}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(item));
    grid.appendChild(card);
  });
}

// ------------------ Modal ------------------
const modal = document.getElementById("infoModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDesc = document.getElementById("modalDesc");
const swiperWrapper = document.querySelector(".modal-swiper .swiper-wrapper");
const closeModalBtn = document.getElementById("closeModal");

let modalSwiper;

function openModal(item) {
  modalTitle.textContent = item.title;
  modalCategory.textContent = item.category;
  modalDesc.textContent = item.desc;

  swiperWrapper.innerHTML = "";

  if (item.soundtrack) {
    swiperWrapper.innerHTML = `
      <div class="swiper-slide flex flex-col items-center justify-center gap-4">
        <img src="${item.images[0]}" class="w-60 sm:w-80 h-auto object-contain animate-spin-slow" alt="Soundtrack Disc">
        <audio controls class="w-full mt-4">
          <source src="${item.soundtrack}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
    `;
  } else {
    swiperWrapper.innerHTML = item.images.map(img => `
      <div class="swiper-slide flex justify-center">
        <img src="${img}" class="w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg" />
      </div>
    `).join("");
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex", "animate-fadeIn");

  if (modalSwiper) modalSwiper.destroy(true, true);

  modalSwiper = new Swiper(".modal-swiper", {
    loop: true,
    speed: 700,
    autoplay: { delay: 3500, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
  });
}

function closeModal() {
  modal.classList.remove("animate-fadeIn");
  modal.classList.add("animate-fadeOut");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex", "animate-fadeOut");
  }, 300);
}

closeModalBtn?.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
window.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal(); });

// ------------------ Filter & Search ------------------
const genreFilter = document.getElementById("genreFilter");
const searchInput = document.getElementById("searchInput");

function filterCards() {
  const searchValue = searchInput.value.toLowerCase();
  const genreValue = genreFilter.value;

  const filtered = cardsData.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchValue) || card.desc.toLowerCase().includes(searchValue);
    const matchesGenre = genreValue === "All" || card.category === genreValue;
    return matchesSearch && matchesGenre;
  });

  displayCards(filtered);
}

genreFilter.addEventListener("change", filterCards);
searchInput.addEventListener("input", filterCards);

// ------------------ Initialize ------------------
document.addEventListener("DOMContentLoaded", () => displayCards(cardsData));
