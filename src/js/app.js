import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const headerMenu = document.querySelector(".header__menu");
const headerNav = document.querySelector(".header__nav");
const body = document.body;

headerMenu.addEventListener("click", function () {
  const isActive = this.classList.toggle("active");
  this.classList.toggle("closed", !isActive);
  body.classList.toggle("no-scroll", isActive);
  headerNav.classList.toggle("active", isActive);

  isActive ? lenis.stop() : lenis.start();
});

const tabs = document.querySelectorAll(".features__tabs-item");
const items = document.querySelectorAll(".features__item");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    items.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    items[index].classList.add("active");
  });
});

const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination],
  loop: true,
  slidesPerView: "auto",
  spaceBetween: -15,
  centeredSlides: true,
  pagination: {
    enabled: true,
    el: ".advantages__slider-dots",
    type: "bullets",
    clickable: true,
    bulletElement: "span",
  },
  navigation: {
    nextEl: ".advantages__slider-next",
    prevEl: ".advantages__slider-prev",
  },
  breakpoints: {
    576: {
      spaceBetween: -10,
    },
    768: {
      spaceBetween: -20,
    },
    992: {
      spaceBetween: -40,
    },
  },
});

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".animation--fade-up").forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    y: 100,
    duration: 0.6,
    scrollTrigger: {
      trigger: item,
      start: "top 95%",
    },
  });
});

gsap.utils.toArray(".animation--fade-in").forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    delay: 0.5,
    duration: 0.5,
    scrollTrigger: {
      trigger: item,
      start: "top 95%",
    },
  });
});

const featuresBlock = document.querySelector(".features__block");
let activeIndex = 0;
let isSmallScreen = checkScreenSize();

function checkScreenSize() {
  return window.innerWidth < 768;
}

function switchTab(index) {
  if (activeIndex === index) return;

  tabs.forEach((tab, i) => tab.classList.toggle("active", i === index));
  items.forEach((item, i) => item.classList.toggle("active", i === index));

  activeIndex = index;
  if (!isSmallScreen) animateFeatures(items[index]);
}

function animateFeatures(section) {
  if (isSmallScreen) return;

  const progressLine = section.querySelector(".features__progress-line");
  const innerBlocks = gsap.utils.toArray(
    section.querySelectorAll(".features__content")
  );

  let totalEl = section.querySelector(".features__progress-total");
  if (totalEl) {
    totalEl.innerText = String(innerBlocks.length).padStart(2, "0");
  }

  if (!innerBlocks.length || !progressLine) return;

  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.trigger === featuresBlock) trigger.kill();
  });

  let currentIndex = 0;

  gsap.to(innerBlocks, {
    y: -section.offsetHeight * (innerBlocks.length - 1),
    ease: "power1.inOut",
    scrollTrigger: {
      markers: false,
      trigger: featuresBlock,
      start: "top 100",
      end: () => `+=${section.offsetHeight * 3}`,
      pin: true,
      scrub: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
      anticipatePin: 0,
      onUpdate: (self) => {
        let newIndex = Math.round(self.progress * (innerBlocks.length - 1));
        if (newIndex !== currentIndex) {
          currentIndex = newIndex;
          let currentEl = section.querySelector(".features__progress-current");

          if (currentEl) {
            currentEl.innerText = String(currentIndex + 1).padStart(2, "0");
          }
        }
      },
    },
  });

  gsap.to(progressLine, {
    height: "100%",
    ease: "power1.out",
    scrollTrigger: {
      trigger: featuresBlock,
      start: "top 100",
      end: () => `+=${section.offsetHeight * 3}`,
      invalidateOnRefresh: true,
      scrub: true,
    },
  });
}

tabs.forEach((tab, index) =>
  tab.addEventListener("click", () => switchTab(index))
);

window.addEventListener("resize", () => {
  const newScreenSize = checkScreenSize();
  if (newScreenSize !== isSmallScreen) {
    isSmallScreen = newScreenSize;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === featuresBlock) trigger.kill();
    });

    if (!isSmallScreen) animateFeatures(items[activeIndex]);
  }
});

if (!isSmallScreen) animateFeatures(items[0]);

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
