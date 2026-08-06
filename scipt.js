const screens = document.querySelectorAll(".screen");

function showScreen(number) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document
        .getElementById(`screen${number}`)
        .classList.add("active");
}


// Screen 1 → Screen 2

const requestAccess = document.getElementById("requestAccess");

requestAccess.addEventListener("click", () => {

    showScreen(2);

});



// Screen 2 → Screen 3

const doors = document.querySelectorAll(".door");

doors.forEach(door => {

    door.addEventListener("click", () => {

        showScreen(3);

    });

});



// Screen 3 Continue → Screen 4

const continueButtons = document.querySelectorAll(".continue");


continueButtons.forEach(button => {

    button.addEventListener("click", () => {

        if(button.id !== "identityContinue"){
            showScreen(4);
        }

    });

});



// Screen 4 Name Input

const nameInput = document.getElementById("nameInput");
const nameContinue = document.getElementById("nameContinue");


let herName = "";


nameContinue.addEventListener("click", () => {

    herName = nameInput.value;


    if(herName.trim() !== ""){

        showScreen(5);

    }

});




// Screen 5 Fingerprint Hold

const fingerprint = document.querySelector(".fingerprint");
const scanStatus = document.getElementById("scanStatus");
const identityResult = document.getElementById("identityResult");


let holdTimer;
let progress = 0;



function startScan(){

    progress = 0;

    scanStatus.innerHTML = "Scanning...";

    holdTimer = setInterval(()=>{

        progress += 10;

        scanStatus.innerHTML =
        `Scanning... ${progress}%`;


        if(progress >= 100){

            clearInterval(holdTimer);


            scanStatus.innerHTML =
            "Fingerprint Accepted ✓";


            identityResult.innerHTML =
            `Identity Confirmed.<br><br>
            Welcome,<br>
            ${herName}, the girl who owns my heart. ❤️`;

        }


    },300);

}




function stopScan(){

    clearInterval(holdTimer);

}



fingerprint.addEventListener(
    "mousedown",
    startScan
);


fingerprint.addEventListener(
    "mouseup",
    stopScan
);


fingerprint.addEventListener(
    "mouseleave",
    stopScan
);


// Mobile support

fingerprint.addEventListener(
    "touchstart",
    startScan
);


fingerprint.addEventListener(
    "touchend",
    stopScan
);