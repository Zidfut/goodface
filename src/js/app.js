import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const headerMenu = document.querySelector('.header__menu');
const headerNav = document.querySelector('.header__nav');
const body = document.querySelector('body');
headerMenu.addEventListener('click', function(){
    if (headerMenu.classList.contains("active")) {
        this.classList.add('closed');
    } else {
        this.classList.remove('closed');
    }
    this.classList.toggle('active');
    body.classList.toggle('no-scroll');
    headerNav.classList.toggle('active');
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

  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    loop: true,
    slidesPerView: 'auto',
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
      nextEl: '.advantages__slider-next',
      prevEl: '.advantages__slider-prev',
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
      }
    }
  });

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".animation--fade-up").forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    y: 100,
    duration: 1,
    scrollTrigger: {
      trigger: item,
      start: "top 90%"
    }
  });
});

gsap.utils.toArray(".animation--fade-in").forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    delay: 0.5,
    duration: .8,
    scrollTrigger: {
      trigger: item,
      start: "top 90%"
    }
  });
});

const section = document.querySelector(".features__block");
const progressLine = document.querySelector(".features__progress-line");
const innerBlocks = gsap.utils.toArray(".features__content");

gsap.to(innerBlocks, {
  yPercent: -100 * (innerBlocks.length - 1),
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: section,
    start: "top 100px",
    end: () => `+=${section.offsetHeight * 5}`,
    pin: true,
    scrub: 2,
    pinSpacing: true,
    invalidateOnRefresh: true,
  },
});

gsap.to(progressLine, {
  height: "100%",
  ease: "power1.out",
  scrollTrigger: {
    trigger: section,
    start: "top 100px",
    end: () => `+=${section.offsetHeight * 5}`,
    scrub: 1,
  },
});
