import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";
import "./style.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.body.classList.add("noscroll");

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});
gsap.ticker.lagSmoothing(0);

const bowls = document.querySelectorAll("#bowls img");
const radius = 150;
let angle = 90;
let activeIndex = 0; // Start with the center bowl (large one)
const wrappers = document.querySelectorAll(".bowl-wrapper");

// 🍜 Circular bowl rotation system - 5 bowls, 3 visible at a time
let rotationTimer = null;

// Fixed positions that bowls rotate through
const positions = [
  // Position 0: Center (main focal point)
  { x: 180, y: 10, scale: 1.8, name: 'center' },
  // Position 1: Left 
  { x: 10, y: 160, scale: 1.2, name: 'left' },
  // Position 2: Right
  { x: 10, y: -140, scale: 0.9, name: 'right' },
  // Position 3: Hidden left (off-screen)
  { x: -150, y: 200, scale: 0.8, name: 'hidden-left' },
  // Position 4: Hidden right (off-screen)  
  { x: -150, y: -200, scale: 0.7, name: 'hidden-right' }
];

// Track which bowl is at which position [center, left, right, hidden1, hidden2]
let bowlAtPosition = [0, 1, 2, 3, 4]; // Initially bowl 0 at center, bowl 1 at left, etc.

// 🍜 Position bowls in their current positions
function positionBowls() {
  bowls.forEach((bowl, i) => {
    if (i < 5) { // We have 5 bowls total
      const positionIndex = bowlAtPosition.indexOf(i);
      
      if (positionIndex !== -1 && positionIndex < 3) {
        // This bowl is in a visible position (center, left, or right)
        const pos = positions[positionIndex];
        bowl.style.left = `${pos.x}px`;
        bowl.style.top = `${pos.y}px`;
        bowl.style.display = 'block';
        bowl.style.opacity = '1';
        // Reset any GSAP transforms and set proper scale
        gsap.set(bowl, { 
          x: 0, 
          y: 0, 
          scale: pos.scale,
          rotation: 0
        });
        bowl.dataset.baseScale = pos.scale;
        bowl.dataset.position = pos.name;
      } else {
        // This bowl is hidden
        bowl.style.display = 'none';
        bowl.style.opacity = '0';
        gsap.set(bowl, { 
          x: 0, 
          y: 0, 
          scale: 0.5,
          rotation: 0
        });
      }
    }
  });
}

// 🔄 Rotate bowls: left→center, center→right, right→hidden, hidden→left
function rotateBowls() {
  // Current arrangement
  const centerBowl = bowlAtPosition[0];  // Bowl currently at center
  const leftBowl = bowlAtPosition[1];    // Bowl currently at left
  const rightBowl = bowlAtPosition[2];   // Bowl currently at right
  const hidden1 = bowlAtPosition[3];     // Hidden bowl 1
  const hidden2 = bowlAtPosition[4];     // Hidden bowl 2
  
  // New arrangement: left→center, center→right, right→hidden, hidden→left
  bowlAtPosition = [leftBowl, hidden1, centerBowl, rightBowl, hidden2];
  
  // Animate all bowls to their new positions with smooth travel
  bowls.forEach((bowl, i) => {
    const newPositionIndex = bowlAtPosition.indexOf(i);
    
    if (newPositionIndex !== -1 && newPositionIndex < 3) {
      // Bowl is moving to a visible position - animate the travel
      const pos = positions[newPositionIndex];
      
      // Show bowl if it was hidden
      if (bowl.style.display === 'none') {
        bowl.style.display = 'block';
      }
      
      // Animate smooth movement to new position
      gsap.to(bowl, {
        left: pos.x,
        top: pos.y,
        scale: pos.scale,
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          bowl.dataset.baseScale = pos.scale;
          bowl.dataset.position = pos.name;
        }
      });
    } else {
      // Bowl is moving off-screen - animate it going away
      const currentLeft = parseInt(bowl.style.left) || 0;
      const currentTop = parseInt(bowl.style.top) || 0;
      
      // Animate bowl moving off-screen in a natural direction
      let offScreenX, offScreenY;
      if (currentLeft > 100) {
        // Bowl is on the right, move it further right
        offScreenX = currentLeft + 200;
        offScreenY = currentTop;
      } else {
        // Bowl is on the left, move it further left  
        offScreenX = currentLeft - 200;
        offScreenY = currentTop;
      }
      
      gsap.to(bowl, {
        left: offScreenX,
        top: offScreenY,
        scale: 0.3,
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          bowl.style.display = 'none';
          // Reset position for next appearance
          bowl.style.left = '-150px';
          bowl.style.top = '100px';
        }
      });
    }
  });
  
  // Update active index (center bowl)
  activeIndex = bowlAtPosition[0];
  
  // Update zoom after rotation
  setTimeout(() => updateZoom(), 1200);
}

// 🕐 Start automatic rotation every 5 seconds
function startAutoRotation() {
  rotationTimer = setInterval(() => {
    rotateBowls();
  }, 5000);
}

// 🛑 Stop automatic rotation
function stopAutoRotation() {
  if (rotationTimer) {
    clearInterval(rotationTimer);
    rotationTimer = null;
  }
}

positionBowls();

// 🔍 Zoom in active bowl
function updateZoom() {
  bowls.forEach((bowl, i) => {
    // Only animate bowls that are currently visible
    const positionIndex = bowlAtPosition.indexOf(i);
    if (positionIndex !== -1 && positionIndex < 3) {
      const baseScale = parseFloat(bowl.dataset.baseScale) || 1;
      const position = bowl.dataset.position;
      
      // Center bowl gets the zoom effect
      if (position === 'center') {
        gsap.to(bowl, {
          rotate: "+=30",
          scale: baseScale * 1.2, // Subtle zoom based on base scale
          duration: 0.5,
          ease: "power1.inOut",
        });
      } else {
        gsap.to(bowl, {
          rotate: "-=30", 
          scale: baseScale, // Return to base scale
          duration: 0.5, 
          ease: "power2.out" 
        });
      }
    }
  });
}

gsap.set("#wood", { rotate: 90, scale: 3, y: -200 });

// 🎮 Keyboard Controls - Manual rotation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    // Stop auto rotation temporarily
    stopAutoRotation();
    rotateBowls();
    // Restart auto rotation after 3 seconds
    setTimeout(() => startAutoRotation(), 3000);
    
    angle += 60; // Rotation increments for tray
  } else if (e.key === "ArrowLeft") {
    // Stop auto rotation temporarily  
    stopAutoRotation();
    // Rotate backwards: center→left, right→center, hidden→right, left→hidden
    const centerBowl = bowlAtPosition[0];
    const leftBowl = bowlAtPosition[1];
    const rightBowl = bowlAtPosition[2];
    const hidden1 = bowlAtPosition[3];
    const hidden2 = bowlAtPosition[4];
    
    // Reverse rotation
    bowlAtPosition = [rightBowl, centerBowl, hidden2, leftBowl, hidden1];
    
    // Animate all bowls to their new positions with smooth travel
    bowls.forEach((bowl, i) => {
      const newPositionIndex = bowlAtPosition.indexOf(i);
      
      if (newPositionIndex !== -1 && newPositionIndex < 3) {
        const pos = positions[newPositionIndex];
        
        // Show bowl if it was hidden
        if (bowl.style.display === 'none') {
          bowl.style.display = 'block';
        }
        
        // Animate smooth movement to new position
        gsap.to(bowl, {
          left: pos.x,
          top: pos.y,
          scale: pos.scale,
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            bowl.dataset.baseScale = pos.scale;
            bowl.dataset.position = pos.name;
          }
        });
      } else {
        // Bowl is moving off-screen - animate it going away
        const currentLeft = parseInt(bowl.style.left) || 0;
        const currentTop = parseInt(bowl.style.top) || 0;
        
        // Animate bowl moving off-screen in a natural direction
        let offScreenX, offScreenY;
        if (currentLeft > 100) {
          offScreenX = currentLeft + 200;
          offScreenY = currentTop;
        } else {
          offScreenX = currentLeft - 200;
          offScreenY = currentTop;
        }
        
        gsap.to(bowl, {
          left: offScreenX,
          top: offScreenY,
          scale: 0.3,
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            bowl.style.display = 'none';
            // Reset position for next appearance
            bowl.style.left = '-150px';
            bowl.style.top = '100px';
          }
        });
      }
    });
    
    activeIndex = bowlAtPosition[0];
    setTimeout(() => updateZoom(), 1200);
    // Restart auto rotation after 3 seconds
    setTimeout(() => startAutoRotation(), 3000);
    
    angle -= 60;
  } else {
    return;
  }

  gsap.to("#wood", {
    rotate: angle,
    duration: 1,
    ease: "power2.inOut",
  });
});

// 🟢 Initial zoom and start auto-rotation
updateZoom();
startAutoRotation();

// 🎯 Scroll-based bowl transition using ScrollTrigger
function setupScrollTransition() {
  ScrollTrigger.create({
    trigger: "#home",
    start: "top top",
    end: "bottom top",
    onUpdate: (self) => {
      // Trigger transition when scrolling down and progress is significant
      if (self.direction === 1 && self.progress > 0.1) {
        triggerBowlTransition();
      }
    },
    once: true // Only trigger once
  });
}

function triggerBowlTransition() {
  // Stop the auto-rotation when transitioning to next section
  stopAutoRotation();
  
  document.body.classList.remove("noscroll");
  
  // Find the center bowl (the one at center position)
  const centerBowl = bowls[activeIndex];
  const bowlRect = centerBowl.getBoundingClientRect();

  // Clone the bowl
  const clone = centerBowl.cloneNode(true);
  clone.classList.add("clone");
  document.body.appendChild(clone);

  // Match computed styles (for transforms applied by GSAP)
  const scale = gsap.getProperty(centerBowl, "scale");

  gsap.set(clone, {
    position: "absolute",
    top: bowlRect.top + "px",
    left: bowlRect.left + "px",
    width: bowlRect.width + "px",
    height: bowlRect.height + "px",
    rotate: "+=90",
    scale: scale - 1,
    zIndex: 1000,
  });

  centerBowl.style.opacity = 0;

  // Get target position in about section - positioned on left side
  const target = document.getElementById("bowlTarget");
  
  // Adjust position: even more to the left, higher up, and larger size
  const deltaX = -350; // Even more to the left
  const deltaY = -0.25 * window.innerHeight; // Higher up (more negative value)

  gsap.to(clone, {
    x: target.getBoundingClientRect().left + deltaX,
    y: target.getBoundingClientRect().top + deltaY,
    scale: 0.8, // Larger size
    rotate: 0,
    duration: 3,
    ease: (t) => Math.min(1, 1.001 - Math.pow(2, -5 * t)), // same ease as GSAP
  });

  lenis.scrollTo("#about", {
    offset: 0,
    duration: 2,
    ease: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)), // same ease as GSAP
  });
}


// Initialize scroll transition
setupScrollTransition();


// 🌟 Parallax Effects for Feature Sections
function setupParallaxEffects() {
  // Parallax effect for feature text elements
  gsap.utils.toArray('.feature-text').forEach((text, index) => {
    gsap.fromTo(text, 
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Background parallax movement
  gsap.utils.toArray('.feature-section').forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress;
        const yPos = progress * 30; // Adjust speed of parallax
        gsap.set(section, {
          backgroundPosition: `center ${50 + yPos}%`
        });
      }
    });
  });

  // Stagger animation for feature headings
  gsap.utils.toArray('.feature-text h2').forEach((heading, index) => {
    gsap.fromTo(heading,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
}

// Initialize parallax effects
setupParallaxEffects();

// 🔗 Recipe Recommender Integration
// Add click handlers for all "Try Now" buttons to redirect to Recipe Recommender
document.addEventListener('DOMContentLoaded', function() {
  const tryNowButtons = document.querySelectorAll('.try-now-btn');
  
  tryNowButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add a smooth transition effect before redirect
      gsap.to(document.body, {
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.out",
        onComplete: function() {
          // Redirect to Recipe Recommender (assuming it runs on port 3000)
          window.open('http://localhost:3000', '_blank');
          
          // Restore opacity
          gsap.to(document.body, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });
  });
});
