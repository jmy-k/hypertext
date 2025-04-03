let body = document.querySelector("body");
let purpleCircle = document.querySelector("#purpleCircle");
let greenCircle = document.querySelector("#greenCircle");
let glitter = document.querySelector("#glitter");
let waves = document.querySelector("#waves");
let circleContainer = document.querySelector("#circleContainer");
let circles = document.querySelectorAll(".circle");
let circlesarray = Array.from(circles);

let response = document.querySelector(".response");

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

let responses = ["how dreadful the knowledge of the truth can be, when there’s no help in truth", "weep not, everything must have its day", "if you find I've lied, from this day on call the prophet blind", "in matters where I have no cognizance, i hold my tongue", "have no desire to suffer twice, in reality and then in retrospect", "time, which sees all things, has found you out", "without your knowledge you’ve become the enemy of your own kindred"]



circleContainer.addEventListener("mousedown", (e) => {
    glitter.style.opacity = "0.4";
    purpleCircle.style.opacity = "0.4";
    greenCircle.style.opacity = "0.4";
    waves.style.opacity = "0.4";

    clearTimeout(timer); // clear timer
    timeLeft = 3; // reset timer value

    timer = setTimeout(() => {
        console.log("Time is up!");
        response.textContent = getOracularResponse();
        response.style.opacity = "1"
    }, 3000); // 3s
});



circleContainer.addEventListener("mouseup", (e) => {
    glitter.style.opacity = "0";
    purpleCircle.style.opacity = "0";
    greenCircle.style.opacity = "0";
    waves.style.opacity = "0";


    clearTimeout(timer); // clear timer
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

function getOracularResponse() {
    // shuffle array using
    for (let i = responses.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [responses[i], responses[j]] = [responses[j], responses[i]];
    }

    // 
    return responses[Math.floor(Math.random() * responses.length)];
}

// animation loop
function animate() {
    // ease movement for purple circle
    currentX += (targetX - currentX) * easeFactor;
    currentY += (targetY - currentY) * easeFactor;

    // green circle in the exact opposite direction of purple circle
    let greenX = centerX - (currentX - centerX);
    let greenY = centerY - (currentY - centerY);

    purpleCircle.style.left = `${currentX}px`;
    purpleCircle.style.top = `${currentY}px`;

    greenCircle.style.left = `${greenX}px`;
    greenCircle.style.top = `${greenY}px`;

    requestAnimationFrame(animate);
}

animate();
