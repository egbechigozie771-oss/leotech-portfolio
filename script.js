// ==========================
// Theme Switcher + Contact Form
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const tsToggle = document.getElementById('tsToggle');
  const tsMenu = document.getElementById('tsMenu');
  const themeSwitcher = document.querySelector('.theme-switcher');

  const themeMap = {
    light: 'theme-light',
    dark: 'theme-dark',
    green: 'theme-green',
    glass: 'theme-glass',
    flat: 'theme-flat',
    rounded: 'theme-rounded',
    neon: 'theme-neon'
  };

  // Load saved theme
  const savedTheme = localStorage.getItem('siteTheme') || 'light';
  applyTheme(savedTheme);

  tsToggle.addEventListener('click', () => {
    themeSwitcher.classList.toggle('open');
    tsToggle.setAttribute('aria-expanded', themeSwitcher.classList.contains('open'));
  });

  tsMenu.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    const key = button.getAttribute('data-theme');
    if (!key) return;
    applyTheme(key);
    localStorage.setItem('siteTheme', key);
    themeSwitcher.classList.remove('open');
    tsToggle.setAttribute('aria-expanded', 'false');
  });

  function applyTheme(key) {
    Object.values(themeMap).forEach(c => document.body.classList.remove(c));
    document.body.classList.add(themeMap[key] || themeMap.light);
  }

  // Close theme menu on outside click
  document.addEventListener('click', (e) => {
    if (!themeSwitcher.contains(e.target)) {
      themeSwitcher.classList.remove('open');
      tsToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      themeSwitcher.classList.remove('open');
      tsToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ==========================
  // Contact Form
  // ==========================
  const contactForm = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');
  const clearBtn = document.getElementById('clearBtn');

contactForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  alertBox.textContent = "";

  const formData = new FormData(contactForm);

  const response = await fetch(contactForm.action, {
    method: "POST",
    body: formData,
    headers: { "Accept": "application/json" }
  });

  if (response.ok) {
    alertBox.textContent = "Message sent successfully!";
    contactForm.reset();
  } else {
    alertBox.textContent = "Failed to send. Try again.";
  }
});



  clearBtn.addEventListener('click', () => {
    contactForm.reset();
    alertBox.textContent = '';
  });

  // ==========================
  // Mobile Navbar
  // ==========================
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", !expanded);

  navList.classList.toggle("active");
});


  // ==========================
  // Contact Modal
  // ==========================
  const modal = document.getElementById("contactModal");
  const contactBtn = document.getElementById("contactBtn");
  const closeModal = document.getElementById("closeModal");

  contactBtn.onclick = () => modal.style.display = "block";
  closeModal.onclick = () => modal.style.display = "none";
  window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

  // ==========================
  // Draggable Modal
  // ==========================
  const modalBox = document.getElementById("modalBox");
  const dragHeader = document.getElementById("dragHeader");

  let isDown = false, offsetX, offsetY;

  dragHeader.addEventListener("mousedown", (e) => {
    isDown = true;
    offsetX = e.clientX - modalBox.offsetLeft;
    offsetY = e.clientY - modalBox.offsetTop;
  });

  document.addEventListener("mouseup", () => isDown = false);

  document.addEventListener("mousemove", (e) => {
    if (isDown) {
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;
      // Keep modal inside viewport
      x = Math.max(0, Math.min(window.innerWidth - modalBox.offsetWidth, x));
      y = Math.max(0, Math.min(window.innerHeight - modalBox.offsetHeight, y));
      modalBox.style.left = `${x}px`;
      modalBox.style.top = `${y}px`;
    }
  });

  // ==========================
  // Fade-in Effects
  // ==========================
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = ".6s ease-in-out";
  });

  function revealServices() {
    serviceCards.forEach(card => {
      const top = card.getBoundingClientRect().top;
      if (top < window.innerHeight - 50) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  }

  window.addEventListener("scroll", revealServices);
  revealServices();

  const aboutSection = document.querySelector("#about");
  aboutSection.style.opacity = "0";
  aboutSection.style.transform = "translateY(40px)";
  aboutSection.style.transition = ".7s ease-in-out";

  function revealAbout() {
    const top = aboutSection.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      aboutSection.style.opacity = "1";
      aboutSection.style.transform = "translateY(0)";
    }
  }

  window.addEventListener("scroll", revealAbout);
  revealAbout();

  // ==========================
  // Portfolio Slider
  // ==========================
  const slider = document.getElementById("slider");
  const slideLeft = document.getElementById("slideLeft");
  const slideRight = document.getElementById("slideRight");
  let position = 0;
  const moveAmount = 370;

  slideRight.addEventListener("click", () => {
    const maxMove = -(slider.scrollWidth - slider.parentElement.offsetWidth);
    position = Math.max(position - moveAmount, maxMove);
    slider.style.transform = `translateX(${position}px)`;
  });

  slideLeft.addEventListener("click", () => {
    position = Math.min(position + moveAmount, 0);
    slider.style.transform = `translateX(${position}px)`;
  });

  // ==========================
  // Hero Role Rotator
  // ==========================
  const roles = document.querySelectorAll(".role");
  let roleIndex = 0;

  setInterval(() => {
    roles[roleIndex].classList.remove("current");
    roleIndex = (roleIndex + 1) % roles.length;
    roles[roleIndex].classList.add("current");
  }, 2500);
});
// DRAGGABLE THEME BUTTON
document.addEventListener("DOMContentLoaded", () => {
  const tsBox = document.getElementById("themeSwitcher");

  if (!tsBox) {
    console.error("Theme Switcher element not found!");
    return;
  }

  let isDraggingTS = false;
  let offsetXTS, offsetYTS;

  tsBox.addEventListener("mousedown", (e) => {
    isDraggingTS = true;
    tsBox.style.cursor = "grabbing";
    offsetXTS = e.clientX - tsBox.offsetLeft;
    offsetYTS = e.clientY - tsBox.offsetTop;
  });

  document.addEventListener("mouseup", () => {
    isDraggingTS = false;
    tsBox.style.cursor = "grab";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDraggingTS) {
      tsBox.style.left = `${e.clientX - offsetXTS}px`;
      tsBox.style.top = `${e.clientY - offsetYTS}px`;
    }
  });
});
