function showGlobalLoading() {
  document.getElementById("globalLoading").style.display = "flex";
}

function hideGlobalLoading() {
  document.getElementById("globalLoading").style.display = "none";
}

function addScrollIndicators() {
  const containers = ["servicesGrid", "bannerGrid"];

  containers.forEach((containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.addEventListener("scroll", () => {
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        console.log(
          `${containerId} scroll progress: ${
            (scrollLeft / (scrollWidth - clientWidth)) * 100
          }%`
        );
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", addScrollIndicators);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const activeContainer =
      document.querySelector(".overflow-x-auto:hover") ||
      document.getElementById("servicesGrid");
    if (activeContainer) {
      const scrollAmount = e.key === "ArrowLeft" ? -200 : 200;
      activeContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }
});

function handleResize() {
  const isMobile = window.innerWidth < 768;
  const services = document.querySelectorAll("#servicesGrid > div");
  const banners = document.querySelectorAll("#bannerGrid > div");

  console.log(`Screen size: ${isMobile ? "mobile" : "desktop"}`);
}

window.addEventListener("resize", handleResize);
document.addEventListener("DOMContentLoaded", handleResize);
