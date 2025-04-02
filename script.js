let redCircle = document.getElementById("redCircle");
let glitter = document.getElementById("glitter");

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let easeFactor = 0.1; // Adjust smoothness

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const maxRadius = 25; // Maximum distance from center

document.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;

    // Calculate opposite direction
    let oppositeX = centerX - (x - centerX);
    let oppositeY = centerY - (y - centerY);

    // Calculate distance from center
    let dx = oppositeX - centerX;
    let dy = oppositeY - centerY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Constrain movement within maxRadius
    if (distance > maxRadius) {
        let angle = Math.atan2(dy, dx);
        targetX = centerX + Math.cos(angle) * maxRadius;
        targetY = centerY + Math.sin(angle) * maxRadius;
    } else {
        targetX = oppositeX;
        targetY = oppositeY;
    }

    // Show glitter
    glitter.style.display = "block";
});

// Smooth animation loop
function animate() {
    currentX += (targetX - currentX) * easeFactor;
    currentY += (targetY - currentY) * easeFactor;

    redCircle.style.left = `${currentX}px`;
    redCircle.style.top = `${currentY}px`;

    requestAnimationFrame(animate);
}

animate();
