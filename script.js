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
let responses = ["how dreadful the knowledge of the truth can be, when there’s no help in truth",
    "weep not, everything must have its day",
    "if you find I've lied, from this day on call the prophet blind",
    "in matters where I have no cognizance, i hold my tongue",
    "have no desire to suffer twice, in reality and then in retrospect",
    "time, which sees all things, has found you out",
    "without your knowledge you’ve become the enemy of your own kindred"]


let scrollContainer = document.querySelector("#scrollContainer");
let activeScrolls = [];
let scrolls = ["the stars align to reveal great fortune in your endeavors",
    "beware the path of shadows, for it leads to darkness within",
    "seek wisdom in silence, find truth in stillness",
    "a journey awaits that will transform your very soul",
    "ancient spirits whisper of change on the horizon",
    "trust not the words of those who speak with forked tongues",
    "the moon reveals secrets to those patient enough to listen",
    "prosperity comes to those who honor the old ways",
    "a forgotten memory holds the key to your future",
    "what was lost shall be found when least expected",
    "the thread of fate weaves an unexpected pattern in your tapestry"];


circleContainer.addEventListener("mousedown", () => {
    glitter.style.opacity = "0.4";
    purpleCircle.style.opacity = "0.4";
    greenCircle.style.opacity = "0.4";
    waves.style.opacity = "0.4";

    clearTimeout(timer); // Clear any previous timer

    timer = setTimeout(() => {
        console.log("Time is up!");

        // Show response text
        let oracleResponse = getOracularResponse();
        response.textContent = oracleResponse;
        response.style.opacity = "1";

        // Create scrolls
        createScrolls();
    }, 3000); // 3s delay before triggering response
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

function createScrolls() {
    // Clear any existing scrolls
    clearScrolls();

    // Choose 3-5 random predictions
    const numScrolls = Math.floor(Math.random() * 3) + 3; // 3-5 scrolls
    let selectedResponses = [...scrolls];
    shuffleArray(selectedResponses);
    selectedResponses = selectedResponses.slice(0, numScrolls);

    // Create each scroll
    selectedResponses.forEach((text, index) => {
        setTimeout(() => {
            const scroll = document.createElement("div");
            scroll.className = "scroll";
            scroll.innerHTML = `<p>${text}</p>`;

            // Random position on screen
            const randomX = Math.random() * (window.innerWidth - 350) + 25;
            const randomY = Math.random() * (window.innerHeight - 300) + 25;

            scroll.style.left = `${randomX}px`;
            scroll.style.top = `${randomY}px`;

            // Random slight rotation
            const rotation = Math.random() * 20 - 10; // -10 to 10 degrees
            scroll.style.transform = `scale(0) rotate(${rotation}deg)`;

            scrollContainer.appendChild(scroll);

            // Trigger animation
            setTimeout(() => {
                scroll.style.transform = `scale(1) rotate(${rotation}deg)`;
                scroll.classList.add("active");
            }, 50);

            // Add to active scrolls
            activeScrolls.push(scroll);

            // Set timeout to remove scroll
            setTimeout(() => {
                scroll.classList.add("fade-out");
                setTimeout(() => {
                    if (scroll.parentNode === scrollContainer) {
                        scrollContainer.removeChild(scroll);
                    }
                    const index = activeScrolls.indexOf(scroll);
                    if (index > -1) {
                        activeScrolls.splice(index, 1);
                    }
                }, 1500);
            }, 6000 + Math.random() * 2000); // Random duration between 6-8 seconds
        }, index * 350); // Stagger the appearance
    });
}

// Clear existing scrolls
function clearScrolls() {
    activeScrolls.forEach(scroll => {
        scroll.classList.add('fade-out');
        setTimeout(() => {
            if (scroll.parentNode === scrollContainer) {
                scrollContainer.removeChild(scroll);
            }
        }, 1000);
    });
    activeScrolls = [];
}

// Shuffle array helper function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
