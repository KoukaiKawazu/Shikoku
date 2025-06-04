const sections = Array.from(document.querySelectorAll("main > div[id]"));
const navLinks = {};
sections.forEach(sec => {
  const id = sec.id;
  navLinks[id] = document.getElementById(`link-${id}`);
});

let currentIndex = 0;
let isScrolling = false;

// Highlight nav link based on currentIndex
function highlightNav(index) {
  sections.forEach((sec, i) => {
    const link = navLinks[sec.id];
    if (link) {
      link.classList.toggle("active", i === index);
    }
  });
}

function scrollToIndex(index) {
  if (index < 0 || index >= sections.length) return;
  isScrolling = true;
  sections[index].scrollIntoView({ behavior: "smooth" });
  currentIndex = index;
  highlightNav(currentIndex);

  setTimeout(() => {
    isScrolling = false;
  }, 800);
}

// Wheel scroll handler
function handleWheel(event) {
  if (isScrolling) return;

  if (event.deltaY > 50) {
    scrollToIndex(currentIndex + 1);
  } else if (event.deltaY < -50) {
    scrollToIndex(currentIndex - 1);
  }
}

// Keyboard scroll handler
function handleKeydown(e) {
  if (isScrolling) return;

  if (e.key === "ArrowDown") scrollToIndex(currentIndex + 1);
  if (e.key === "ArrowUp") scrollToIndex(currentIndex - 1);
}

// Handle click on nav links manually
function handleNavClick(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href").substring(1);
  const targetIndex = sections.findIndex(sec => sec.id === targetId);
  if (targetIndex !== -1) {
    scrollToIndex(targetIndex);
  }
}

// Attach event listeners
window.addEventListener("wheel", handleWheel, { passive: true });
window.addEventListener("keydown", handleKeydown);
Object.values(navLinks).forEach(link => {
  if (link) link.addEventListener("click", handleNavClick);
});

// Optional: initialize highlight on load
highlightNav(currentIndex);
