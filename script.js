const hero = document.querySelector(".fixed-hero");
const heroCopy = document.querySelector(".hero-copy");
const heroKicker = document.querySelector("#hero-kicker-text");
const heroTitle = document.querySelector("#hero-title");
const heroDescription = document.querySelector("#hero-description");
const heroDots = Array.from(document.querySelectorAll(".hero-slide-dot"));
const navbar = document.querySelector(".navbar-pill");
const videos = Array.from(document.querySelectorAll(".hero-video"));
const serviceBackgroundVideo = document.querySelector(".services-background-video");
const serviceOptions = Array.from(document.querySelectorAll(".service-option"));
const serviceCount = document.querySelector("#service-count");
const serviceCaptionTitle = document.querySelector("#service-caption-title");
const menuButton = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");
const cookieBox = document.querySelector(".cookie-box");
let activeVideo = 0;
let heroTimer;
const heroSlides = [
  {
    kicker: "Integrated energy and infrastructure · est. 2003",
    title: "Rising to<br><em>excellence</em><br>with DIC.",
    description:
      "DIC's remarkable journey began in 2003 and grew into a multi-diversified contractor serving Kuwait's essential industries.",
  },
  {
    kicker: "Innovative and sustainable solutions for growth",
    title: "Sustainable<br><em>solutions</em><br>for growth.",
    description:
      "DIC delivers comprehensive, competitive solutions that enhance operational excellence while reducing environmental footprint.",
  },
  {
    kicker: "Offshore and marine excellence",
    title: "Partnering for<br><em>offshore and</em><br>marine excellence.",
    description:
      "Marine operations, vessel support, offshore coordination, and practical field execution for demanding coastal and energy environments.",
  },
  {
    kicker: "Quality, health, safety and environment",
    title: "Quality, health,<br><em>safety and</em><br>environment.",
    description:
      "A QHSE-driven culture protects people, assets, and the environment through clear standards, training, reporting, and continuous improvement.",
  },
];

function setActiveVideo(index) {
  if (!videos.length) return;
  activeVideo = index;

  videos.forEach((video, videoIndex) => {
    const active = videoIndex === index;
    video.classList.toggle("is-active", active);
    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });

  heroDots.forEach((dot, dotIndex) => {
    const active = dotIndex === index;
    dot.classList.toggle("is-active", active);
    dot.setAttribute("aria-selected", String(active));
  });

  const slide = heroSlides[index] || heroSlides[0];
  heroCopy?.classList.add("is-changing");
  window.setTimeout(() => {
    if (heroKicker) heroKicker.textContent = slide.kicker;
    if (heroTitle) heroTitle.innerHTML = slide.title;
    if (heroDescription) heroDescription.textContent = slide.description;
    heroCopy?.classList.remove("is-changing");
  }, 180);
}

function rotateHero() {
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => {
    setActiveVideo((activeVideo + 1) % videos.length);
  }, 7200);
}

videos.forEach((video) => {
  video.addEventListener("loadeddata", () => {
    hero?.classList.add("has-video");
  });
});

heroDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    setActiveVideo(Number(dot.dataset.heroIndex));
    rotateHero();
  });
});

function setActiveService(index) {
  const activeOption = serviceOptions.find((option) => Number(option.dataset.serviceIndex) === index);

  serviceOptions.forEach((option) => {
    const active = Number(option.dataset.serviceIndex) === index;
    option.classList.toggle("is-active", active);
    option.setAttribute("aria-selected", String(active));
  });

  if (serviceCount) serviceCount.textContent = String(index + 1).padStart(2, "0");
  if (serviceCaptionTitle && activeOption?.dataset.serviceTitle) {
    serviceCaptionTitle.textContent = activeOption.dataset.serviceTitle;
  }
}

if (serviceBackgroundVideo) {
  serviceBackgroundVideo.playbackRate = 2;
  serviceBackgroundVideo.play().catch(() => {});
}

serviceOptions.forEach((option) => {
  const index = Number(option.dataset.serviceIndex);
  option.addEventListener("mouseenter", () => setActiveService(index));
  option.addEventListener("focus", () => setActiveService(index));
  option.addEventListener("click", () => setActiveService(index));
});

setActiveVideo(0);
rotateHero();
setActiveService(0);

window.addEventListener("scroll", () => {
  navbar?.classList.toggle("is-scrolled", window.scrollY > 24);
});

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.classList.toggle("is-open");
  menuPanel?.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuPanel?.setAttribute("aria-hidden", String(!isOpen));
});

menuPanel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.classList.remove("is-open");
    menuPanel.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuPanel.setAttribute("aria-hidden", "true");
  });
});

if (window.localStorage.getItem("dic_cookie_choice")) {
  cookieBox?.classList.add("is-hidden");
}

cookieBox?.querySelectorAll("[data-cookie]").forEach((button) => {
  button.addEventListener("click", () => {
    window.localStorage.setItem("dic_cookie_choice", button.dataset.cookie || "set");
    cookieBox.classList.add("is-hidden");
  });
});

document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
});
