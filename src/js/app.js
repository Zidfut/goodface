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

gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".features__block");
const progressLine = document.querySelector(".features__progress-line");
const innerBlocks = gsap.utils.toArray(".features__content");

// gsap.to(innerBlocks, {
//   yPercent: -100 * (innerBlocks.length - 1), // прокручуємо блоки всередині
// //   ease: "power1.inOut",
//   scrollTrigger: {
//     trigger: section,
//     markers: true,
//     start: "top 100px",
//     end: () => `+=${section.offsetHeight * 1.5}`, // довжина анімації
//     pin: true, // закріплюємо секцію
//     scrub: 2, // згладжування анімації
//     // anticipatePin: 1, // Згладжує момент відкріплення
//     // pinSpacing: true, // Контролює простір після секції
//     snap: {
//         snapTo: "labels", // Прив’язка до ключових точок анімації
//         duration: 0.3, // Час, за який відбувається "прилипання"
//         delay: 0, 
//         ease: "power1.inOut"
//       }
//   },
// });

// gsap.to(progressLine, {
//     height: "100%",
//     ease: "power1.out",
//     scrollTrigger: {
//       trigger: section,
//       start: "top 100px",
//       end: () => `+=${section.offsetHeight * 1.5}`,
//       scrub: 1, // Робить анімацію плавною
//     }
// });