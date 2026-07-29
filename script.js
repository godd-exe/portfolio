gsap.registerPlugin(ScrollTrigger);

// 1. Enhanced Parallax Abstract Background Shapes & Moving Glowing Orbs
// Select all background visual elements
const bgElements = gsap.utils.toArray(".shape, .glowing-orb");

// Loop through each element to assign dynamic random movements mapped ONLY to scroll
bgElements.forEach((el) => {
  // Create a timeline that spans the ENTIRE scrollable document
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "max",
      scrub: 1.5 // Smoothly catches up when scrolling stops
    }
  });

  // Create 5 consecutive randomly generated waypoints for each element
  for (let i = 0; i < 5; i++) {
    tl.to(el, {
      x: "random(-250, 250)",      // Random horizontal movement
      y: "random(-300, 300)",      // Random vertical movement
      rotation: "random(-720, 720)", // Random rotation amount
      scale: "random(0.5, 1.5)",     // Random size changes (shrink/grow)
      ease: "sine.inOut"             // Smooth curving transition
    });
  }
});

// 2. Hero Section Parallax Fade
gsap.to(".content-wrapper", {
  opacity: 0,
  y: -80,
  scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
});

// 3. Apple-Style Twist for About Section
let aboutTL = gsap.timeline({
  scrollTrigger: { trigger: "#about", start: "top top", end: "+=1000", scrub: 1, pin: true }
});

aboutTL.to(".cyber-hexagon", { rotation: 180, scale: 1.4, duration: 1 })
       .fromTo(".text-container", { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 1 }, "<");

// 4. Cumulative 3D Flip Card Scroll Logic in 2x2 Grid
const skillCards = document.querySelectorAll(".skill-card");

ScrollTrigger.create({
  trigger: "#skills",
  start: "top top",
  end: "+=2200",
  pin: true,
  scrub: 0.5,
  onUpdate: (self) => {
    const progress = self.progress;
    if (progress > 0.15) skillCards[0].classList.add("flipped"); else skillCards[0].classList.remove("flipped");
    if (progress > 0.40) skillCards[1].classList.add("flipped"); else skillCards[1].classList.remove("flipped");
    if (progress > 0.65) skillCards[2].classList.add("flipped"); else skillCards[2].classList.remove("flipped");
    if (progress > 0.88) skillCards[3].classList.add("flipped"); else skillCards[3].classList.remove("flipped");
  }
});

skillCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// 5. BULLETPROOF HORIZONTAL SCROLL FOR CERTIFICATES
const certWrapper = document.querySelector(".cert-wrapper");

if (certWrapper) {
  gsap.to(certWrapper, {
    x: () => -(certWrapper.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: "#certs-section",
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => "+=" + (certWrapper.scrollWidth - window.innerWidth + 400),
      invalidateOnRefresh: true
    }
  });
}

// 6. Interactive Certificate Preview Modal Handler
const certModal = document.getElementById("certModal");
const closeModal = document.getElementById("closeModal");
const modalBadgeTag = document.getElementById("modalBadgeTag");
const modalCertTitle = document.getElementById("modalCertTitle");
const modalCertIssuer = document.getElementById("modalCertIssuer");
const modalCertDoc = document.getElementById("modalCertDoc");
const modalPdfLink = document.getElementById("modalPdfLink");

const openCertModal = (triggerElement) => {
  modalBadgeTag.textContent = triggerElement.getAttribute("data-tag");
  modalCertTitle.textContent = triggerElement.getAttribute("data-title");
  modalCertIssuer.textContent = triggerElement.getAttribute("data-issuer");
  
  // Set the source of the iframe to the PDF, hiding the toolbars for a clean look
  modalCertDoc.src = triggerElement.getAttribute("data-doc") + "#toolbar=0&navpanes=0";
  
  modalPdfLink.setAttribute("href", triggerElement.getAttribute("data-pdf"));
  
  certModal.classList.add("active");
};

document.querySelectorAll(".cert-preview-trigger, .cert-interactive-thumb").forEach((el) => {
  el.addEventListener("click", () => {
    openCertModal(el);
  });
});

closeModal.addEventListener("click", () => {
  certModal.classList.remove("active");
});

certModal.addEventListener("click", (e) => {
  if (e.target === certModal) {
    certModal.classList.remove("active");
  }
});

// 7. Email Copy & Notification
const emailBtn = document.getElementById("email-btn");
const toast = document.getElementById("toast");

emailBtn.addEventListener("click", () => {
  const email = emailBtn.getAttribute("data-email");
  window.location.href = `mailto:${email}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(() => {
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); }, 3500);
    });
  }
});