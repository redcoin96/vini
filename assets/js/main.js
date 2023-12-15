const tabletQuery = window.matchMedia("(min-width: 768px)");

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

lenis.stop();
window.addEventListener("load", function () {
  lenis.start();
});

gsap.to(".preloader", {
  opacity: 0,
  duration: 1,
  onComplete: () => {
    document.querySelector(".preloader").style.display = "none";
  },
});

// mouse event
let mouseBlur = document.querySelector(".mouse-blur");
let mouseFollower = document.querySelector(".mouse-circle");

const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.1;
let scale = 1.0;

const setMousePosition = (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
};

window.addEventListener("mousemove", setMousePosition);

const updatePosition = () => {
  const dt = gsap.ticker.deltaRatio(60 * speed);
  const dx = mouse.x - pos.x;
  const dy = mouse.y - pos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  scale = 1.0 - distance * 0.002;

  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
};

const updateRotation = () => {
  const dx = mouse.x - pos.x;
  const dy = mouse.y - pos.y;
  const rotation = Math.atan2(dy, dx);
  gsap.set(mouseFollower, { rotation: `${rotation}_rad`, scaleY: scale });
};

const xSet = gsap.quickSetter(mouseFollower, "x", "px");
const ySet = gsap.quickSetter(mouseFollower, "y", "px");

gsap.ticker.add(() => {
  updatePosition();
  xSet(pos.x);
  ySet(pos.y);
  updateRotation();
});

let mouseX = 0;
let mouseY = 0;

document.onmousemove = function (e) {
  mouseX = e.pageX;
  mouseY = e.pageY;

  mouseBlur.style.top = mouseY - mouseBlur.offsetWidth / 2 + "px";
  mouseBlur.style.left = mouseX - mouseBlur.offsetWidth / 2 + "px";
};

$("a").hover(
  function () {
    $(mouseFollower).addClass("active");
  },
  function () {
    $(mouseFollower).removeClass("active");
  }
);

const moveAndRotateElement = (selector) => {
  const element = $(selector);

  $(document).on("mousemove", function (event) {
    const mouseY = event.clientY;
    const mouseX = event.clientX;

    element.css(
      "transform",
      `rotate(${mouseY / 100}deg) translate3d(-${mouseX / 100}px, -${
        mouseX / 100
      }px, 0)`
    );
  });
};

const followMouse = (element) => {
  $(document).mousemove(function (e) {
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    $(element).css({ top: mouseY, left: mouseX });
  });
};

const highlightSameClass = (hoverElement) => {
  $(hoverElement).hover(
    function () {
      const elementClass = $(this).attr("class").split(" ")[0];

      $(hoverElement).css("opacity", 0.3);
      $("." + elementClass).css("opacity", 1);
      $("." + elementClass).css("zIndex", 1);

      if (elementClass === "vini") {
        $(".tag").html("vini");
      }
      if (elementClass === "territorio") {
        $(".tag").html("territorio");
      }
      if (elementClass === "chi-siamo") {
        $(".tag").html("chi-siamo");
      }

      $(".tag-wrapper").css("opacity", "1");
      $(".tag-wrapper").css("transform", "scale(1)");
    },
    function () {
      const elementClass = $(this).attr("class").split(" ")[0];

      $(hoverElement).css("opacity", 1);
      $("." + elementClass).css("zIndex", "inherit");

      $(".tag-wrapper").css("opacity", "0");
      $(".tag-wrapper").css("transform", "scale(0)");
    }
  );
};

const rotateElement = (hoverElement, rotateElement) => {
  $(hoverElement).hover(
    function (e) {
      const initialMouseX = e.clientX;
      $(document).mousemove(function (e) {
        const currentMouseX = e.clientX;
        const angle =
          ((currentMouseX - initialMouseX) / window.innerHeight) * 50;
        $(rotateElement).css({ transform: `rotate(${angle}deg)` });
      });
    },
    function () {
      $(document).off("mousemove.rotate");
    }
  );
};

const textOpacityMotion = (element) => {
  gsap.from(element, {
    autoAlpha: 0,
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "center center",
      scrub: 1,
    },
  });
};

const headTxt = new SplitType('[data-motion="text"]', {
  types: "words, chars",
});

gsap.utils.toArray('.main [data-motion="text"]').forEach((element) => {
  gsap.from(element.querySelectorAll(".char"), {
    duration: 1,
    stagger: 0.1,
    rotationX: 90,
    autoAlpha: 0.8,
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "+=500",
      scrub: 1,
    },
  });
});

const fullImageMotion = (wrapper, img) => {
  gsap.from(wrapper, {
    clipPath: "inset(0px 30%)",
    duration: 2,
    scrollTrigger: {
      trigger: wrapper,
      start: "top bottom",
      end: "center center",
      scrub: 1,
    },
  });
  gsap.from(img, {
    clipPath: "inset(0px 30%)",
    duration: 2,
    scale: 1.1,
    scrollTrigger: {
      trigger: wrapper,
      start: "top bottom",
      end: "+=1000",
      scrub: 1,
    },
  });
};

const drawSvg = (trigger, path) => {
  document.querySelectorAll(path).forEach((path) => {
    const dashArray = parseInt(
      $(path).css("stroke-dasharray").split(",")[0],
      10
    );
    gsap.set(path, { strokeDashoffset: dashArray });

    gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: trigger,
        start: "top center",
      },
      duration: 3,
    });
  });
};

gsap.from(".sc-hero .hand-left", {
  x: -400,
  duration: 2,
});

gsap.from(".sc-hero .hand-right", {
  x: 400,
  duration: 2,
});

gsap.from(".sc-hero .stone", {
  x: -200,
  duration: 2,
});

gsap.from(".sc-hero .cone", {
  x: 200,
  duration: 2,
});

gsap.set(".sc-hero .wine", {
  rotation: 341,
});

gsap.to(".sc-hero .wine", {
  opacity: 1,
  delay: 0.5,
});

gsap.from(".sc-hero .wine", {
  scale: 0.8,
  rotation: 345,
  duration: 1,
  delay: 0.5,
});

gsap.from(".footer .logo svg", {
  transform: "translateY(100%)",
  duration: 1,
  delay: 0.5,
});

followMouse(".tag-wrapper");
rotateElement(".sc-hero a", ".tag");
highlightSameClass(".sc-hero a");

moveAndRotateElement(".sc-hero .hand-left img");
moveAndRotateElement(".sc-hero .stone img");
moveAndRotateElement(".sc-hero .cone img");
moveAndRotateElement(".sc-hero .hand-right img");
moveAndRotateElement(".header .cone img");
moveAndRotateElement(".header .stone img");

textOpacityMotion(".sc-intro h3");

const wrappers = document.querySelectorAll(".sc-image .image-wrapper");
const images = document.querySelectorAll(".sc-image img");

wrappers.forEach((wrapper, index) => {
  fullImageMotion(wrapper, images[index]);
});

textOpacityMotion(".sc-chisiamo .desc");
textOpacityMotion(".sc-chisiamo .link");

drawSvg(".sc-rosette", ".sc-rosette path");

textOpacityMotion(".sc-inspire h3");
textOpacityMotion(".sc-controguerra .desc");
textOpacityMotion(".sc-controguerra .link");

//sc-wines
$(".sc-wines .content-group li").mousemove(function (e) {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;
  gsap.to($(this).find(".img-wrap"), {
    x: mouseX / 10,
    y: mouseY / 10,
  });
});

ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 1024px)": function () {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-wines",
        pin: ".sc-wines h2",
        start: "top center",
        end: "bottom 83%",
        scrub: 1,
      },
    });
  },
});

//background color
let bg = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-inspire",
    start: "top bottom",
    end: "+=2200",
    scrub: true,
  },
});

let bg2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-contact",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

bg.to("body", { "--bg-color": "#f5f5f0" }).to("body", {
  "--bg-color": "#b2b5a8",
});

bg2.to("body", { "--bg-color": "#f5f5f0" });

//header
const menuAni = gsap.from(".header .char", {
  rotationX: 90,
  stagger: 0.03,
  autoAlpha: 0,
  paused: true,
  onReverseComplete: () => {
    $(".header").removeClass("open");
  },
});

const elementReveal = gsap.from(
  ".header .elements-group, .header .company-group",
  {
    autoAlpha: 0,
    duration: 2,
    paused: true,
  }
);

$(".header .hamburger").click(function (e) {
  e.preventDefault();

  if (!$(".header").hasClass("open")) {
    $(".header").addClass("open");
    $("body").addClass("hidden");
    menuAni.play();

    setTimeout(() => {
      elementReveal.play();
    }, 500);
  } else {
    $("body").removeClass("hidden");
    menuAni.reverse();
    elementReveal.reverse();
  }
});

//footer select input
$(".check-input-wrapper").click(function () {
  $(this).toggleClass("selected");
});

//footer logo
const FixfooterLogo = (query) => {
  if (query.matches) {
    $(".footer .logo").addClass("fixed");
  } else {
    $(".footer .logo").removeClass("fixed");
  }
};

FixfooterLogo(tabletQuery);
window.addEventListener("resize", () => FixfooterLogo(tabletQuery));

//scroll event
ScrollTrigger.create({
  trigger: ".main-content",
  start: "2% 0%",
  end: "100% 100%",
  onEnter: function () {
    $(".footer .logo").addClass("middle");
  },
  onLeaveBack: function () {
    $(".footer .logo").removeClass("middle");
  },
});

ScrollTrigger.create({
  trigger: ".footer",
  start: "0% 80%",
  end: "100% 100%",
  onEnter: function () {
    $(".footer .logo").removeClass("middle fixed");
  },
  onLeaveBack: function () {
    $(".footer .logo").addClass("middle fixed");
  },
});

//header logo

const switchHeaderLogo = (query) => {
  gsap.registerPlugin(ScrollTrigger);

  if (query.matches) {
    gsap.to(".header .logo", {
      onComplete: function () {
        $(".header .logo").removeClass("switched");
      },
    });

    ScrollTrigger.create({
      trigger: ".sc-hero",
      start: "top top",
      end: "bottom top",
      onEnter: function () {
        $(".header .logo").removeClass("switched");
      },
      onLeave: function () {
        $(".header .logo").addClass("switched");
      },
      onLeaveBack: function () {
        $(".header .logo").removeClass("switched");
      },
    });
  } else {
    $(".header .logo").addClass("switched");
  }
};

switchHeaderLogo(tabletQuery);

window.addEventListener("resize", switchHeaderLogo(tabletQuery));

//go top
$('.footer-top').click(()=>{
  $('html, body').animate({scrollTop : 0}, 800);
})
