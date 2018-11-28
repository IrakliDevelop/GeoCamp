console.log("script working");


let showButton = document.getElementById("showHidden");
let submitDiv = document.getElementById("submitDiv");

showButton.addEventListener('click', ()=>{
    console.log("clicked button");

    if (submitDiv.style.display === "none") {
        submitDiv.style.display = "block";
    } else {
        submitDiv.style.display = "none";
    }
});

let noButton = document.getElementById("hideAgain");

noButton.addEventListener('click', () => {
    if (submitDiv.style.display === "none") {
        submitDiv.style.display = "block";
    } else {
        submitDiv.style.display = "none";
    }
});