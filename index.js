smoothScroll();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function smoothScroll() {
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));

  gsap.ticker.lagSmoothing(0);

  return lenis;
}

const scrollbar = $("#scrollbar-line");
scrollbar.style.strokeDasharray = window.innerWidth;
scrollbar.style.strokeDashoffset = window.innerWidth;
console.log(scrollbar.getTotalLength());

lenis.on("scroll", (e) => {
  // const vel = Math.round(e.velocity * 100);
  const progress = Math.round(e.progress * 100);
  const offset = Math.round(
    window.innerWidth - (window.innerWidth * progress) / 100
  );
  scrollbar.style.strokeDashoffset = offset;
  console.log(progress, offset);
});
