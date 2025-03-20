let hitoIntro = document.querySelector("#hitoIntro");
let bigImage = document.querySelector("#backgroundImage")
let doorwayLink = document.querySelector("#doorwayLink");

doorwayLink.addEventListener("mouseenter", function () {
    hitoIntro.style.opacity = "1";
    hitoIntro.style.fontSize = "3em";
    console.log("hovering");
    bigImage.style.transform = "scale(2)";
})

doorwayLink.addEventListener("mouseleave",() =>{
    hitoIntro.style.opacity = "0";
    hitoIntro.style.fontSize = "1em";
    bigImage.style.transform="scale(1)";
})

