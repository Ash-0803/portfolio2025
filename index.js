const $ = (selector, parent = "body") =>
  document.querySelector(`${parent} ${selector}`);
const $$ = (selector) => document.querySelectorAll(selector);

const lenis = new Lenis({
  wheelMultiplier: 0.5,
});

smoothScroll();
workAnimation();
scrollBarAnimation();
aboutAnimation();
svgAnimation();
navigationMenu();
parallaxAnimation("#banner-1");
parallaxAnimation("#banner-2");

function aboutAnimation() {
  const briefText = $$(".brief-text");
  const briefSplit_1 = new SplitType(briefText[0], { types: "lines" });
  const briefSplit_2 = new SplitType(briefText[1], { types: "lines" });
  const scrollTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#brief-section",
      scroller: "body",
      start: "50% 10%",
      end: "50% 10%",
      toggleActions: "play none none reverse",
    },
    defaults: {
      stagger: 0.1,
      duration: 0.3,
    },
  });

  scrollTL
    .fromTo(
      briefSplit_1.lines,
      { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0 },
      {
        clipPath: "inset(100% 0% 0% 0%)",
        opacity: 0,
        yPercent: -50,
      }
    )
    .set(briefText[1], { opacity: 1 }, "-=0.3")
    .fromTo(
      briefSplit_2.lines,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        yPercent: 50,
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        yPercent: 0,
      },
      "<"
    );
  ScrollTrigger.create({
    trigger: "#brief-section",
    scroller: "body",
    pin: true,
  });
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

function parallaxAnimation(banner) {
  const bannerImg = $("img", banner);
  gsap.fromTo(
    bannerImg,
    {
      yPercent: -20,
    },
    {
      ease: "none",
      yPercent: 20,
      willChange: "transform",
      scrollTrigger: {
        scrub: true,
        trigger: banner,
        scroller: "body",
      },
    }
  );
}

function workAnimation() {
  const workLinks = $$(".work-overview-text");
  console.log(workLinks);
  workLinks.forEach((link) => {
    link.addEventListener("pointerenter", (e) => {
      gsap.to(link, {
        color: "#161310",
      });
    });
    link.addEventListener("pointerleave", (e) => {
      gsap.to(link, {
        color: "#656464",
      });
    });
  });
}

function navigationMenu() {
  const links = $$(".nav-links a");
  console.log(link);
}

function svgAnimation() {
  gsap.fromTo(
    "#main-svg",
    {
      rotation: -60,
      scale: 0.9,
    },
    {
      rotation: 60,
      scale: 1.2,
      ease: "none",
      willChange: "transform",
      scrollTrigger: {
        trigger: "#main-svg",
        scroller: "body",
        scrub: 1,
      },
    }
  );
}
