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
    desc: `Born into a humble family, I am the third child among six siblings. My parents had always wished for a daughter, and during my mother’s pregnancy, 
    everyone believed I would be one. That is how I came to be named Nicole. To their surprise, however, a boy was born instead. Our youngest sibling eventually 
    became the daughter they had hoped for. My eldest brother and I serve as the family’s breadwinners, while our other siblings are still pursuing their studies. 
    My parents manage a small sari-sari store and dedicate much of their time to caring for my younger brother who has ASD. Growing up in this environment taught 
    me the value of responsibility, resilience, and compassion, qualities that continue to shape who I am today.`
  },
  {
    title: "Personality",
    category: "Personality",
    images: ["Assets/P1.jpeg","Assets/P2.jpeg","Assets/P3.jpeg","Assets/P4.jpeg"],
    desc: `People often see me as outgoing and fun, but deep inside, I am actually a timid and shy person. I often experience numbness and intense nervousness 
    when placed in public or awkward situations. I manage to cope by reminding myself that it is part of my responsibility and my job to interact with others. 
    Outside of my professional role, however, I tend to be quiet and reserved. I usually do not speak unless spoken to and often prefer to avoid unnecessary interactions.
`
  },
  {
    title: "Favorite Soundtrack",
    category: "Favorites",
    images: ["Assets/M1.gif"],
    soundtrack: "Assets/Show Yourself.mp3",
    desc: `I listen to a wide variety of music, from Philippine hip-hop and K-pop songs to timeless classics and even the Frozen II soundtrack. 
    I appreciate music in all its forms and enjoy discovering different genres that match my mood. Some days I find myself drawn to energetic beats and catchy lyrics, 
    while on other days I prefer calm and nostalgic tunes. For me, music adds color to everyday life and makes even the simplest moments feel a little more meaningful.`
  },
  {
    title: "Dreams",
    category: "Dreams",
    images: ["Assets/D1.jpeg","Assets/D2.jpeg","Assets/D3.jpeg","Assets/D4.jpeg"],
    desc: `Ever since I can remember, I’ve been someone who didn’t really dream big. My only goal was to provide for my family as soon as I could and, if life allowed, 
    to someday settle into a quiet and simple life. For the longest time, that was enough for me. But as I grew and learned more about myself, I realized that I wanted more. 
    I became a little greedy in the best way. I want to achieve great things, to excel in what I do, and to find purpose in every step I take. I want to teach, to contribute 
    to society, and to leave a lasting impact on the lives I touch.`
  },
  {
    title: "Hobbies",
    category: "Hobbies",
    images: ["Assets/H1.png"],
    desc: `I spend most of my time reading mangas and watching series with my loving girlfriend. It’s one of the ways we relax and enjoy each other’s company. 
    Aside from that, I also enjoy playing badminton. It helps me stay active, clear my mind, and have fun, whether I’m playing casually or just rallying for a good workout.`
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

const openBtn = document.getElementById('openGameModal');
  const closeBtn = document.getElementById('closeGameModal');
  const gameModal = document.getElementById('gameModal');
  const modalContent = document.getElementById('modalContent');

  openBtn.addEventListener('click', async () => {
    // Load game.html content into modal
    const response = await fetch('game.html'); 
    const html = await response.text();
    modalContent.innerHTML = html;

    // Execute any scripts inside game.html
    const scripts = modalContent.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.textContent = script.textContent;
      document.body.appendChild(newScript);
    });

    gameModal.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    gameModal.classList.add('hidden');
    modalContent.innerHTML = ''; // Clear game when closed
  });