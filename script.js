document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const slide = document.querySelectorAll(".slide");
    const bullets = document.querySelector(".bullets");
  
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;
    let animationId = 0;
  
    for (let i = 0; i < slide.length; i++) {
      const bullet = document.createElement("div");
      bullet.className = `bullet ${i === 0 ? "active" : ""}`;
      bullet.addEventListener("click", () => goToSlide(i));
      bullets.appendChild(bullet);
    }
  
    const slidesToClone = 8;
    for (let i = 0; i < slidesToClone; i++) {
      const firstClone = slide[i].cloneNode(true);
      const lastClone = slide[slide.length - 1 - i].cloneNode(true);
      slider.appendChild(firstClone);
      slider.insertBefore(lastClone, slide[0]);
    }
  
    const slideWidth = slide[0].offsetWidth;
    slider.style.transform = `translateX(${-slideWidth * slidesToClone}px)`;
    prevTranslate = -slideWidth * slidesToClone;
    currentTranslate = -slideWidth * slidesToClone;
  
    function getPositionX(event) {
      return event.type.include("mouse") ? event.pageX : event.touches[0].pageX;
    }
  
    function setSliderPosition() {
      slider.style.transform = `translateX(${currentTranslate}px)`;
    }
  
    function updateBullets() {
      document.querySelectorAll(".bullet").forEach((bullet, index) => {
        bullet.classList.toggle("active", index === currentIndex);
      });
    }
  
    function animation() {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
    }
  
    function goToSlide(index) {
      currentIndex = index;
      currentTranslate = -(slideWidth * (index + slidesToClone));
      prevTranslate = currentTranslate;
      setSliderPosition();
      updateBullets();
    }
  
    function touchStart(event) {
      isDragging = true;
      startPos = getPositionX(event);
      animationId = requestAnimationFrame(animation);
      slider.classList.add("drabbing");
    }
  
    function touchMove(event) {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
      }
    }
  
    function touchEnd() {
      isDragging = false;
      cancelAnimationFrame(animationId);
      slider.classList.remove("drabbing");
      const moveBy = currentTranslate - prevTranslate;
      if (Math.abs(moveBy) < slideWidth / 3) {
        if (moveBy > 0) {
          currentIndex -= 1;
        } else {
          currentIndex += 1;
        }
      }
  
      if (currentIndex < 0) {
        currentIndex = slide.length - 1;
        setTimeout(() => {
          slider.style.transition = "none";
          currentTranslate = -(slideWidth * (slide.length + slidesToClone - 1));
          prevTranslate = currentTranslate;
          setSliderPosition();
          setTimeout(() => {
            slider.style.transition = "transform 0.3s ease-out";
          }, 10);
        }, 300);
      } else if (currentIndex >= slide.length) {
        currentIndex = 0;
        setTimeout(() => {
          slider.style.transition = "none";
          currentTranslate = -(slideWidth * slidesToClone);
          prevTranslate = currentTranslate;
          setSliderPosition();
          setTimeout(() => {
            slide.style.transition = "transform 0.3s ease-out";
          }, 10);
        }, 300);
      }
  
      currentTranslate = -(slideWidth * (currentIndex + slidesToClone));
      prevTranslate = currentTranslate;
      setSliderPosition();
      updateBullets();
    }
  
    slider.addEventListener("mousedown", touchStart)
      .slider.addEventListener("touchstart", touchStart);
    slider.addEventListener("mousemove", touchMove)
      .slider.addEventListener("touchmove", touchMove);
    slider.addEventListener("mouseup", touchEnd)
      .slider.addEventListener("touchend", touchEnd);
    slider.addEventListener("mouseleave", touchEnd);
  
    window.addEventListener("resize", () => {
      const newSlideWidth = slide[0].offsetWidth;
      currentTranslate = -(newSlideWidth * (currentIndex + slidesToClone));
      prevTranslate = currentTranslate;
      setSliderPosition();
    });
  });
  