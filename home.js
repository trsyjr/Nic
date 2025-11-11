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
    title: "Chapter 1: Origin",
    category: "Chapter 1",
    images: [
      "Assets/O1.jpeg","Assets/O2.jpeg","Assets/O3.png"
    ],
    desc: `On the 7th day of December, 2000, a son was born into a humble family from Malabon. The child was given the name “Nicole”, an uncommon name for a young boy. 
    The name reflected his parents’ long-held wish for a daughter—a wish that would finally be fulfilled years later with their sixth and youngest child.
    Nicole had a simple and joyful childhood, but as the family grew, life became more difficult. Coming from modest beginnings, he learned early on what it meant to struggle. 
    Adding to his challenges, Nicole helped care for his brother with special needs—an experience that demanded patience, empathy, and strength far beyond his years.`
  },
  {
    title: "Chapter 2: The Plight of the Free-Spirited Child",
    category: "Chapter 2",
    images: ["Assets/P2.jpeg","Assets/P3.jpeg","Assets/P4.jpeg","Assets/C2-1.png","Assets/C2-2.png","Assets/C2-3.png","Assets/C2-4.png","Assets/C2-5.png"],
    desc: `People often see me as outgoing and fun, but deep inside, I am actually a timid and shy person. I often experience numbness and intense nervousness 
    when placed in public or awkward situations. I manage to cope by reminding myself that it is part of my responsibility and my job to interact with others. 
    Outside of my professional role, however, I tend to be quiet and reserved. I usually do not speak unless spoken to and often prefer to avoid unnecessary interactions.
`
  },
  {
    title: "Chapter 3: Soundtrack",
    category: "Chapter 3",
    images: ["Assets/M1.gif"],
    soundtrack: "Assets/Show Yourself.mp3",
    desc: `I listen to a wide variety of music, from Philippine hip-hop and K-pop songs to timeless classics and even the Frozen II soundtrack. 
    I appreciate music in all its forms and enjoy discovering different genres that match my mood. Some days I find myself drawn to energetic beats and catchy lyrics, 
    while on other days I prefer calm and nostalgic tunes. For me, music adds color to everyday life and makes even the simplest moments feel a little more meaningful.`
  },
  {
    title: "Chapter 4: The World Hits Hard, So I Hit Back",
    category: "Chapter 4",
    images: ["Assets/C4-1.jpeg","Assets/C4-2.jpeg","Assets/C4-3.jpeg","Assets/C4-4.jpeg"],
    desc: `As time passed, the sprout became a tree—the carefree boy turned into an adult. Nicole began to understand the true cost of happiness: hard work and dedication.
    Coming from a struggling family, he learned that luck isn’t something that just happens—it’s something that finds those who keep moving forward. Nicole never had a 
    clear dream growing up—no dream school, no dream job. What he did have was a deep desire to help his family as soon as he could.Now one of his family’s breadwinners, 
    Nicole knows exactly what his happiness costs, and he works tirelessly to protect it. Even today, he continues to persevere in pursuit of his own version of “happyness.”`
  },
  {
    title: "Chapter 5: Even the Brightest Moon Has a Dark Side",
    category: "Chapter 5",
    images: ["Assets/C5-1.jpeg","Assets/C5-2.jpeg","Assets/C5-3.jpeg","Assets/C5-4.jpeg","Assets/C5-5.jpeg"],
    desc: `It might surprise some to hear that behind Nicole’s outgoing personality lies a shy and timid soul. He trembles when speaking in public; his voice cracks, 
    his body stiffens, and his heart races—a fear he has yet to fully overcome. At work, he copes by reminding himself that if a task is part of his duty, then it is his 
    responsibility to deliver. But outside of work, he still struggles with simple interactions—like asking for directions—often needing to build up the courage just to approach someone.
    The Nicole people see today is a ball of energy—passionate, driven, and sincere. He appreciates all kinds of music, from witty parodies and timeless classics to K-pop, 
    Pinoy hip-hop, and beautifully written Disney soundtracks like Frozen II. But deep down, he remains the same anxious boy, constantly pushing himself to do better.
    He understands now that fear is a waste of time. How can one learn or grow without the courage to try? And if ever fear still wins, he takes comfort in knowing there 
    are people who will always be there to help him.`
  },
  {
    title: "Chapter 6: Dreams and Aspirations (Epilogue)",
    category: "Chapter 6",
    images: ["Assets/C6-2.png","Assets/C6-1.jpeg"],
    desc: `After a rollercoaster ride of experiences, Nicole’s dreams have become beautifully simple: To see his family and parents live comfortably.
    To build a modest home and start a family with his loving girlfriend. And someday, to teach in the field of social work—to share his story and inspire future generations.`
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
      <img src="${item.images[0]}" 
           class="w-[22rem] sm:w-full h-auto object-contain animate-spin-slow" 
           alt="Soundtrack Disc">
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

displayCards(cardsData);

// ------------------ Feedback Modal ------------------
const feedbackBtn = document.getElementById("feedbackBtn");
const feedbackModal = document.getElementById("feedbackModal");
const closeFeedbackModalBtn = document.getElementById("closeFeedbackModal");
const feedbackForm = document.getElementById("feedbackForm");

// Open Feedback Modal
feedbackBtn?.addEventListener("click", () => {
  feedbackModal.classList.remove("hidden");
  feedbackModal.classList.add("flex", "animate-fadeIn");
});

// Close Feedback Modal
function closeFeedbackModal() {
  feedbackModal.classList.remove("animate-fadeIn");
  feedbackModal.classList.add("animate-fadeOut");
  setTimeout(() => {
    feedbackModal.classList.add("hidden");
    feedbackModal.classList.remove("flex", "animate-fadeOut");
  }, 300);
}

closeFeedbackModalBtn?.addEventListener("click", closeFeedbackModal);
feedbackModal.addEventListener("click", e => { if (e.target === feedbackModal) closeFeedbackModal(); });
window.addEventListener("keydown", e => { if (e.key === "Escape" && !feedbackModal.classList.contains("hidden")) closeFeedbackModal(); });

// Handle EmailJS Submission
feedbackForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY' with EmailJS credentials
  emailjs.sendForm('service_mqqndw9', 'template_et2og3p', feedbackForm, '4uCGVPBz3H1dGhGwQ')
    .then(() => {
      alert("Feedback sent successfully!");
      feedbackForm.reset();
      closeFeedbackModal();
    })
    .catch(err => {
      console.error(err);
      alert("Failed to send feedback. Please try again later.");
    });
});
