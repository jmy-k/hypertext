let hitoIntro = document.querySelector("#hitoIntro");
let doorwayLink = document.querySelector("#doorwayLink");

doorwayLink.addEventListener("hover", function () {
    hitoIntro.style.opacity = "1";
    console.log("hovering");
})