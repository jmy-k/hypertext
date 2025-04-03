let purpleCircle = document.querySelector("#purpleCircle");
let greenCircle = document.querySelector("#greenCircle");
let glitter = document.querySelector("#glitter");
let waves = document.querySelector("#waves");
let circleContainer = document.querySelector("#circleContainer");
let circles = document.querySelectorAll(".circle");
let circlesarray = Array.from(circles);

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let easeFactor = 0.1;

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const maxRadius = 20; // max distance from center

let timer;
let timeLeft = 3; // 15 seconds


circleContainer.addEventListener("mousedown", (e) => {
    glitter.style.opacity = "0.4";
    purpleCircle.style.opacity = "0.4";
    greenCircle.style.opacity = "0.4";
    waves.style.opacity = "0.4";

    clearTimeout(timer); // Clear any existing timer
    timeLeft = 3; // Reset timer value

    timer = setTimeout(() => {
        console.log("Time is up!");

        circles.forEach((circle) => {
            circle.style.width = "100vw";
            circle.style.height = "100vw";
            circle.style.opacity = "0";
        });
    }, 3000); // Trigger after 3s exactly
});


circleContainer.addEventListener("mouseup", (e) => {
    glitter.style.opacity = "0";
    purpleCircle.style.opacity = "0";
    greenCircle.style.opacity = "0";
    waves.style.opacity = "0";


    clearTimeout(timer); // Clear any existing timer
})


document.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;

    // opposite direction for purpleCircle
    let oppositeX = centerX - (x - centerX);
    let oppositeY = centerY - (y - centerY);

    // distance from center
    let dx = oppositeX - centerX;
    let dy = oppositeY - centerY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // move within maxRadius for purpleCircle
    if (distance > maxRadius) {
        let angle = Math.atan2(dy, dx);
        targetX = centerX + Math.cos(angle) * maxRadius;
        targetY = centerY + Math.sin(angle) * maxRadius;
    } else {
        targetX = oppositeX;
        targetY = oppositeY;
    }

});

// Smooth animation loop
function animate() {
    // Ease movement for purple circle
    currentX += (targetX - currentX) * easeFactor;
    currentY += (targetY - currentY) * easeFactor;

    // Move green circle in the exact opposite direction of purple circle
    let greenX = centerX - (currentX - centerX);
    let greenY = centerY - (currentY - centerY);

    purpleCircle.style.left = `${currentX}px`;
    purpleCircle.style.top = `${currentY}px`;

    greenCircle.style.left = `${greenX}px`;
    greenCircle.style.top = `${greenY}px`;

    requestAnimationFrame(animate);
}

animate();
