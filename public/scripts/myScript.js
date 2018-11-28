let showButton = document.getElementById("showHidden");
let submitDiv = document.getElementById("submitDiv");

showButton.addEventListener('click', ()=>{
    changeVisibility();
});

let noButton = document.getElementById("hideAgain");

noButton.addEventListener('click', () => {
    changeVisibility();
});


function changeVisibility(){
    if (submitDiv.style.display === "none") {
        submitDiv.style.display = "block";
    } else {
        submitDiv.style.display = "none";
    }
}