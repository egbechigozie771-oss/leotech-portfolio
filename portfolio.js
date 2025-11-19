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
