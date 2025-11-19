const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", !expanded);

  navList.classList.toggle("active");
});
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
