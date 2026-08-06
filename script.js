/* ==========================================
   FOR YOU ❤️
   SCRIPT.JS - PART 1
========================================== */

const screens = document.querySelectorAll(".screen");

let currentScreen = 1;

let herName = "";


/* ==========================================
   SCREEN SWITCH
========================================== */

function showScreen(number){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    currentScreen = number;

    document
    .getElementById(`screen${number}`)
    .classList.add("active");

}



/* ==========================================
   SCREEN 1
========================================== */

document
.getElementById("requestAccess")
.addEventListener("click",()=>{

    showScreen(2);

});



/* ==========================================
   SCREEN 2
========================================== */

document
.querySelectorAll(".door")
.forEach(button=>{

    button.addEventListener("click",()=>{

        showScreen(3);

    });

});



/* ==========================================
   SCREEN 3
========================================== */

document
.getElementById("continue3")
.addEventListener("click",()=>{

    showScreen(4);

});



/* ==========================================
   SCREEN 4
========================================== */

document
.getElementById("continue4")
.addEventListener("click",()=>{

    herName =
    document
    .getElementById("nameInput")
    .value
    .trim();

    if(herName===""){

        alert("Please enter your name.");

        return;

    }

    showScreen(5);

});



/* ==========================================
   SCREEN 5
========================================== */

const fingerprint =
document.getElementById("fingerprint");

const scanPercent =
document.getElementById("scanPercent");

const identityMessage =
document.getElementById("identityMessage");

const continue5 =
document.getElementById("continue5");

continue5.style.display="none";

let holdInterval;

let percent=0;



function startScan(){

    clearInterval(holdInterval);

    percent=0;

    scanPercent.innerHTML="Scanning... 0%";

    holdInterval=setInterval(()=>{

        percent+=5;

        scanPercent.innerHTML=
        `Scanning... ${percent}%`;

        if(percent>=100){

            clearInterval(holdInterval);

            scanPercent.innerHTML=
            "Fingerprint Accepted ✓";

            identityMessage.innerHTML=
            `
            <p>
            Identity Confirmed.
            </p>

            <p>
            Welcome,
            <br>
            <strong>${herName}</strong>,
            the girl who owns my heart. ❤️
            </p>
            `;

            continue5.style.display="inline-block";

        }

    },150);

}



function stopScan(){

    if(percent<100){

        clearInterval(holdInterval);

        percent=0;

        scanPercent.innerHTML=
        "Press and hold again.";

    }

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



fingerprint.addEventListener(
"touchstart",
e=>{

    e.preventDefault();

    startScan();

}
);



fingerprint.addEventListener(
"touchend",
stopScan
);



continue5.addEventListener(
"click",
()=>{

    showScreen(6);

});
/* ==========================================
   SCRIPT.JS - PART 2
========================================== */

/* ==========================================
   SCREEN 6
========================================== */

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const niceTry = document.getElementById("niceTry");
const loveAnswer = document.getElementById("loveAnswer");

const continue6 = document.getElementById("continue6");

let noAttempts = 0;


/* Move No Button Naturally */

function moveNoButton(){

    const area =
    document.querySelector(".answer-buttons");

    const maxX =
    area.clientWidth -
    noButton.offsetWidth;

    const maxY =
    area.clientHeight -
    noButton.offsetHeight;

    const x =
    Math.random()*maxX;

    const y =
    Math.random()*maxY;

    noButton.style.left =
    `${x}px`;

    noButton.style.top =
    `${y}px`;

    noButton.style.right =
    "auto";

    noAttempts++;

    if(noAttempts>=3){

        niceTry.innerHTML =
        "Nice try 😏";

    }

}



/* Desktop */

noButton.addEventListener(
"mouseenter",
moveNoButton
);


/* Phone */

noButton.addEventListener(
"touchstart",
e=>{

    e.preventDefault();

    moveNoButton();

}
);



/* YES */

yesButton.addEventListener(
"click",
()=>{

    yesButton.style.display="none";

    noButton.style.display="none";

    loveAnswer.style.display="block";

}
);



continue6.addEventListener(
"click",
()=>{

    showScreen(7);

});



/* ==========================================
   SCREEN 7
========================================== */

const continue7 =
document.getElementById("continue7");

const continue7b =
document.getElementById("continue7b");

const emptyLife =
document.getElementById("emptyLifeMessage");


continue7.addEventListener(
"click",
()=>{

    continue7.style.display="none";

    emptyLife.style.display="none";

    setTimeout(()=>{

        emptyLife.style.display="block";

    },5000);

}
);



continue7b.addEventListener(
"click",
()=>{

    showScreen(8);

});



/* ==========================================
   SCREEN 8
========================================== */

const vault =
document.querySelector(".vault-door");

const vaultContent =
document.getElementById("vaultContent");

const continue8 =
document.getElementById("continue8");

continue8.style.display="none";


let opened = false;


vault.addEventListener(
"click",
()=>{

    if(opened) return;

    opened = true;

    vault.style.transform =
    "rotate(-120deg)";

    setTimeout(()=>{

        vaultContent.style.display =
        "block";

        continue8.style.display =
        "inline-block";

    },1000);

}
);



continue8.addEventListener(
"click",
()=>{

    showScreen(9);

});



/* ==========================================
   SCREEN 9
========================================== */

const continue9 =
document.getElementById("continue9");

continue9.addEventListener(
"click",
()=>{

    showScreen(10);

});



/* ==========================================
   SCREEN 10
========================================== */

const heart =
document.getElementById("breakingHeart");

const heartMessage =
document.getElementById("heartMessage");

const continue10 =
document.getElementById("continue10");

continue10.style.display =
"none";


setTimeout(()=>{

    if(currentScreen!==10) return;

    heart.innerHTML="💔";

    setTimeout(()=>{

        heart.innerHTML="❤️";

        heartMessage.style.display=
        "block";

        continue10.style.display=
        "inline-block";

    },3000);

},1000);



continue10.addEventListener(
"click",
()=>{

    showScreen(11);

});
/* ==========================================
   SCRIPT.JS - PART 3
========================================== */

/* ==========================================
   SCREEN 10 ANIMATION (FIXED)
========================================== */

function startHeartScene(){

    const heart =
    document.getElementById("breakingHeart");

    const heartMessage =
    document.getElementById("heartMessage");

    const continue10 =
    document.getElementById("continue10");

    heart.innerHTML="❤️";

    heartMessage.style.display="none";

    continue10.style.display="none";

    setTimeout(()=>{

        if(currentScreen!==10) return;

        heart.innerHTML="💔";

        setTimeout(()=>{

            if(currentScreen!==10) return;

            heart.innerHTML="❤️";

            heartMessage.style.display="block";

            continue10.style.display="inline-block";

        },3000);

    },1000);

}



/* ==========================================
   SCREEN 11
========================================== */

const deleteBtn =
document.getElementById("deleteMemory");

const keepBtn =
document.getElementById("keepMemory");

const deleteResult =
document.getElementById("deleteResult");

const continue11 =
document.getElementById("continue11");

deleteResult.style.display="none";

deleteBtn.onclick=()=>{

    deleteResult.style.display="block";

};

keepBtn.onclick=()=>{

    showScreen(12);

};

continue11.onclick=()=>{

    showScreen(12);

};



/* ==========================================
   SCREEN 12
========================================== */

const progressBar =
document.getElementById("loveProgress");

const progressText =
document.getElementById("progressText");

const infinityMessage =
document.getElementById("infinityMessage");

const continue12 =
document.getElementById("continue12");

let loveStarted=false;

function startLoveCalculation(){

    if(loveStarted) return;

    loveStarted=true;

    let values=[0,8,27,64,99];

    let i=0;

    const timer=setInterval(()=>{

        progressBar.style.width=
        values[i]+"%";

        progressText.innerHTML=
        values[i]+"%";

        i++;

        if(i>=values.length){

            clearInterval(timer);

            setTimeout(()=>{

                progressText.innerHTML=
                "∞";

                infinityMessage.style.display=
                "block";

            },5000);

        }

    },900);

}

continue12.onclick=()=>{

    showScreen(13);

};



/* ==========================================
   SCREEN 13
========================================== */

document
.getElementById("continue13")
.onclick=()=>{

    showScreen(14);

};



/* ==========================================
   FINAL SCREEN
========================================== */

const newChapter =
document.getElementById("newChapter");

newChapter.onclick=()=>{

    showScreen(15);

    startChapter();

};



/* ==========================================
   SCREEN 15
========================================== */

function startChapter(){

    const bar=
    document.getElementById("chapterProgress");

    let value=0;

    const timer=setInterval(()=>{

        value++;

        bar.style.width=value+"%";

        if(value>=100){

            clearInterval(timer);

        }

    },35);

}



/* ==========================================
   PARTICLES
========================================== */

function createHeart(){

    const heart=
    document.createElement("div");

    heart.className="heart-particle";

    heart.innerHTML=
    Math.random()>.5?"❤️":"💖";

    heart.style.left=
    Math.random()*100+"vw";

    heart.style.fontSize=
    (18+Math.random()*18)+"px";

    heart.style.animationDuration=
    (8+Math.random()*6)+"s";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },14000);

}

setInterval(createHeart,700);



function createPetal(){

    const petal=
    document.createElement("div");

    petal.className="petal";

    petal.style.left=
    Math.random()*100+"vw";

    petal.style.animationDuration=
    (8+Math.random()*6)+"s";

    document.body.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },15000);

}

setInterval(createPetal,500);



/* ==========================================
   SHOOTING STAR
========================================== */

function shootingStar(){

    const star=
    document.createElement("div");

    star.className="shooting-star";

    star.style.top=
    Math.random()*40+"vh";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },4000);

}

setInterval(shootingStar,9000);



/* ==========================================
   PATCH showScreen()
========================================== */

const originalShowScreen=showScreen;

showScreen=function(number){

    originalShowScreen(number);

    if(number===10){

        startHeartScene();

    }

    if(number===12){

        startLoveCalculation();

    }

};