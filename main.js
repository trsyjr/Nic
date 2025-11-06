// Hero animations
gsap.from("#heroTitle", { 
  y: 50, 
  opacity: 0, 
  duration: 1.5, 
  ease: "power3.out" 
});

gsap.from("#heroSubtitle", {
  y: 20,
  opacity: 0,
  delay: 0.5,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from("#heroButton", {
  y: -10,
  repeat: -1,
  yoyo: true,
  duration: 1,
  ease: "power1.inOut"
});

// Generate sparkles
const sparklesContainer = document.getElementById('sparkles');
const sparkleCount = 60;

for (let i = 0; i < sparkleCount; i++) {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');

  // Random initial position
  sparkle.style.left = `${Math.random() * window.innerWidth}px`;
  sparkle.style.top = `${window.innerHeight + Math.random() * 100}px`;

  // Random size
  const size = 2 + Math.random() * 4;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;

  sparklesContainer.appendChild(sparkle);

  // Animate upwards like dust
  gsap.to(sparkle, {
    y: - (window.innerHeight + Math.random() * 100),
    opacity: 0,
    duration: 5 + Math.random() * 5,
    repeat: -1,
    ease: 'sine.out',
    delay: Math.random() * 5,
    onRepeat: () => {
      // Reset position after each cycle
      sparkle.style.left = `${Math.random() * window.innerWidth}px`;
      sparkle.style.top = `${window.innerHeight + Math.random() * 50}px`;
      sparkle.style.opacity = 0.8;
    }
  });
}
