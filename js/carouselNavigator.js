const track = document.querySelector('.about-track');
const slides = document.querySelectorAll('.about__text');
const totalSlides = slides.length;
let currentIndex = 0;

function updateSlidePosition() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.getElementById('next').addEventListener('click', () => {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
    updateSlidePosition();
  }
});

document.getElementById('prev').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlidePosition();
  }
});

// Swipe support
let startX = 0;
track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50 && currentIndex < totalSlides - 1) {
    currentIndex++;
    updateSlidePosition();
  } else if (diff < -50 && currentIndex > 0) {
    currentIndex--;
    updateSlidePosition();
  }
});
