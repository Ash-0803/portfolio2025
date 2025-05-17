const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const lenis = new Lenis();

smoothScroll();
scrollBarAnimation();
aboutAnimation();

function aboutAnimation() {
  const briefText = $$(".brief-text");
  const briefSplit_1 = new SplitType(briefText[0], { types: "lines" });
  const briefSplit_2 = new SplitType(briefText[1], { types: "lines" });
  const scrollTL = gsap.timeline({
    defaults: {
      ease: "power1.inOut",
      stagger: 0.1,
      duration: 0.6,
    },
  });

  console.log(briefSplit_1, briefSplit_2);

  scrollTL
    .fromTo(
      briefSplit_1.lines,
      { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0 },
      {
        clipPath: "inset(100% 0% 0% 0%)",
        opacity: 0,
        delay: 1,
        yPercent: -50,
      }
    )
    .set(briefText[1], { opacity: 1 }, "-=.8")
    .fromTo(
      briefSplit_2.lines,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        yPercent: 50,
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        yPercent: 0,
        stagger: 0.1,
      },
      "<"
    );
}
function smoothScroll() {
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

function scrollBarAnimation() {
  const scrollbar = $("#scrollbar-line");
  scrollbar.style.strokeDasharray = window.innerWidth;
  scrollbar.style.strokeDashoffset = window.innerWidth;
  console.log(scrollbar.getTotalLength());

  lenis.on("scroll", (e) => {
    const progress = Math.round(e.progress * 100);
    const offset = Math.round(
      window.innerWidth - (window.innerWidth * progress) / 100
    );
    scrollbar.style.strokeDashoffset = offset;
  });
  return lenis;
}
