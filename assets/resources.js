const videos = [
  {
    id: "ey1",
    title: "EY Holistic Planning",
    description: "Holistic planning: Integrating insurance products for better outcomes in retirement",
    url: "https://drive.google.com/file/d/1Nx0X23YHi-SEP1BOHCrTgN6IgEC4ezsd/preview",
    length: "10 min",
    topic: "Saving & compound interest",
  },
  {
    id: "yuzhouvul1",
    title: "Example VUL Statement",
    description: "Sample VUL statement to understand how saving taxes and fees impact your returns over time",
    url: "https://drive.google.com/file/d/1SSNEL0KFIhL_aYDZIhycyr6DFFHs3QVp/preview",
    length: "2 min",
    topic: "Tax Free",
  },
  {
    id: "excelretirementcalculator1",
    title: "Retirement Calculator in Excel",
    description: "Step-by-step guide to building a retirement calculator in Excel to project your savings growth and retirement income",
    url: "https://docs.google.com/spreadsheets/d/1-eDSgS3y3iLCxmdlXf3apmCqjvEGJ-D44k0T1KZVIeY/preview",
    length: "2 min",
    topic: "Retirement",
  }
];

const GALLERY_PAGE_SIZE = 6;

function initVideoViews() {
  const track = document.getElementById("videoCarouselTrack");
  const dotsContainer = document.getElementById("videoCarouselDots");
  const carouselContainer = document.getElementById("videoCarousel");
  const gallery = document.getElementById("videoGallery");
  const galleryGrid = document.getElementById("videoGalleryGrid");
  const galleryPagination = document.getElementById("videoGalleryPagination");
  const viewToggleButtons = document.querySelectorAll(".view-toggle-btn");

  if (!track || !dotsContainer) return;

  track.innerHTML = "";
  dotsContainer.innerHTML = "";

  videos.forEach((video, index) => {
    const slide = document.createElement("article");
    slide.className = "carousel-slide";
    slide.dataset.index = String(index);
    slide.innerHTML = `
      <div class="carousel-video">
        <iframe
          src="${video.url}"
          title="${video.title}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <div class="carousel-caption">
        <h3>${video.title}</h3>
        <p>${video.description}</p>
        <div class="carousel-meta">
          <span>${video.topic}</span> &middot; <span>${video.length}</span>
        </div>
        <a href="${video.url}" target="_blank" rel="noopener" class="carousel-open-btn">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
              fill="currentColor" />
          </svg>
          Open
        </a>
      </div>
    `;
    track.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "carousel-dot";
    dot.dataset.index = String(index);
    dotsContainer.appendChild(dot);
  });

  let currentIndex = 0;
  let hasUserInteracted = false;

  function updateCarousel(index, skipScroll = false) {
    const clampedIndex = Math.max(0, Math.min(videos.length - 1, index));
    currentIndex = clampedIndex;

    // Only scroll if user has interacted or skipScroll is false
    if (!skipScroll) {
      // Center the active slide within the visible track
      const slide = track.querySelector(`.carousel-slide[data-index="${clampedIndex}"]`);
      if (slide) {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const targetScroll = Math.max(0, slideCenter - track.clientWidth / 2);
        track.scrollTo({ left: targetScroll, behavior: "smooth" });
      } else {
        // fallback: scroll by approx slide width
        const offset = clampedIndex * track.clientWidth;
        track.scrollTo({ left: offset, behavior: "smooth" });
      }
    }

    dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === clampedIndex);
    });
  }

  const arrows = document.querySelectorAll(".carousel-arrow");
  arrows.forEach((btn) => {
    btn.addEventListener("click", () => {
      hasUserInteracted = true;
      const dir = btn.dataset.direction === "next" ? 1 : -1;
      updateCarousel(currentIndex + dir);
    });
  });

  dotsContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("carousel-dot")) {
      hasUserInteracted = true;
      const idx = Number(target.dataset.index || "0");
      updateCarousel(idx);
    }
  });

  window.addEventListener("resize", () => {
    // Skip scroll recalculation on resize unless user has interacted
    updateCarousel(currentIndex, !hasUserInteracted);
  });

  updateCarousel(0);

  function renderGallery(page) {
    const totalPages = Math.max(1, Math.ceil(videos.length / GALLERY_PAGE_SIZE));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const start = (currentPage - 1) * GALLERY_PAGE_SIZE;
    const items = videos.slice(start, start + GALLERY_PAGE_SIZE);

    galleryGrid.innerHTML = "";
    items.forEach((video) => {
      const card = document.createElement("article");
      card.className = "gallery-card";
      card.innerHTML = `
        <h3 class="gallery-card-title">${video.title}</h3>
        <div class="gallery-card-meta">${video.topic} · ${video.length}</div>
        <p>${video.description}</p>
        <a href="${video.url}" target="_blank" rel="noopener" class="gallery-card-link">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
              fill="currentColor" />
          </svg>  
          Open
        </a>
      `;
      galleryGrid.appendChild(card);
    });

    galleryPagination.innerHTML = "";
    const prev = document.createElement("button");
    prev.textContent = "Previous";
    prev.disabled = currentPage === 1;
    prev.addEventListener("click", () => renderGallery(currentPage - 1));

    const next = document.createElement("button");
    next.textContent = "Next";
    next.disabled = currentPage === totalPages;
    next.addEventListener("click", () => renderGallery(currentPage + 1));

    const label = document.createElement("span");
    label.textContent = `Page ${currentPage} of ${totalPages}`;

    galleryPagination.appendChild(prev);
    galleryPagination.appendChild(label);
    galleryPagination.appendChild(next);
  }

  if (gallery && galleryGrid && galleryPagination) {
    renderGallery(1);
  }

  if (viewToggleButtons && carouselContainer && gallery) {
    viewToggleButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        viewToggleButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const showCarousel = view === "carousel";
        carouselContainer.hidden = !showCarousel;
        gallery.hidden = showCarousel;
      });
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

document.addEventListener("DOMContentLoaded", initVideoViews);

