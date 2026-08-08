/* ==========================================
   FOR YOU ❤️
   CLEAN SCRIPT.JS
========================================== */

const screens = document.querySelectorAll(".screen");

let currentScreen = 1;
let herName = "";


/* ==========================================
   SCREEN SWITCH
========================================== */

function showScreen(number) {
    const target = document.getElementById(`screen${number}`);

    if (!target) {
        console.error(`Screen ${number} does not exist.`);
        return;
    }

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    currentScreen = number;
    target.classList.add("active");

    if (number === 10) {
        startHeartScene();
    }

    if (number === 12) {
        startLoveCalculation();
    }

    if (number === 14) {
        playEnding();
    }

    if (number === 15) {
        startChapter();
    }
}


/* ==========================================
   SCREEN 1
========================================== */

const requestAccess = document.getElementById("requestAccess");

if (requestAccess) {
    requestAccess.addEventListener("click", () => {
        showScreen(2);
    });
}


/* ==========================================
   SCREEN 2
========================================== */

document.querySelectorAll(".door").forEach(door => {
    door.addEventListener("click", () => {
        showScreen(3);
    });
});


/* ==========================================
   SCREEN 3
========================================== */

const continue3 = document.getElementById("continue3");

if (continue3) {
    continue3.addEventListener("click", () => {
        showScreen(4);
    });
}


/* ==========================================
   SCREEN 4
========================================== */

const continue4 = document.getElementById("continue4");
const nameInput = document.getElementById("nameInput");

if (continue4 && nameInput) {
    continue4.addEventListener("click", () => {
        herName = nameInput.value.trim();

        if (!herName) {
            alert("Please enter your name.");
            return;
        }

        showScreen(5);
    });
}


/* ==========================================
   SCREEN 5 - FINGERPRINT
========================================== */

const fingerprint = document.getElementById("fingerprint");
const scanPercent = document.getElementById("scanPercent");
const identityMessage = document.getElementById("identityMessage");
const continue5 = document.getElementById("continue5");

let holdInterval = null;
let percent = 0;
let scanComplete = false;

if (continue5) {
    continue5.style.display = "none";
}

function startScan() {
    if (!fingerprint || !scanPercent) return;

    clearInterval(holdInterval);

    if (scanComplete) return;

    percent = 0;
    scanPercent.textContent = "Scanning... 0%";

    holdInterval = setInterval(() => {
        percent += 5;
        scanPercent.textContent = `Scanning... ${percent}%`;

        if (percent >= 100) {
            clearInterval(holdInterval);
            scanComplete = true;

            scanPercent.textContent = "Fingerprint Accepted ✓";

            if (identityMessage) {
                identityMessage.innerHTML = `
                    <p>Identity Confirmed.</p>
                    <p>
                        Welcome,<br>
                        <strong>${escapeHtml(herName)}</strong>,
                        the girl who owns my heart. ❤️
                    </p>
                `;
            }

            if (continue5) {
                continue5.style.display = "inline-block";
            }
        }
    }, 150);
}

function stopScan() {
    clearInterval(holdInterval);

    if (!scanComplete && scanPercent) {
        percent = 0;
        scanPercent.textContent = "Press and hold again.";
    }
}

if (fingerprint) {
    fingerprint.addEventListener("mousedown", startScan);
    fingerprint.addEventListener("mouseup", stopScan);
    fingerprint.addEventListener("mouseleave", stopScan);

    fingerprint.addEventListener("touchstart", event => {
        event.preventDefault();
        startScan();
    }, { passive: false });

    fingerprint.addEventListener("touchend", stopScan);
}

if (continue5) {
    continue5.addEventListener("click", () => {
        showScreen(6);
    });
}


/* ==========================================
   SCREEN 6 - YES / NO
========================================== */

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const niceTry = document.getElementById("niceTry");
const loveAnswer = document.getElementById("loveAnswer");
const continue6 = document.getElementById("continue6");

// Get ONLY the answer buttons from Screen 6
const answerButtons = document.querySelector("#screen6 .answer-buttons");

let noAttempts = 0;


/* ==========================================
   NO BUTTON
========================================== */

function moveNoButton() {

    if (!noButton || !answerButtons) return;

    const maxX =
        Math.max(
            0,
            answerButtons.clientWidth - noButton.offsetWidth
        );

    const maxY =
        Math.max(
            0,
            answerButtons.clientHeight - noButton.offsetHeight
        );

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
    noButton.style.right = "auto";

    noAttempts++;

    if (noAttempts >= 3 && niceTry) {
        niceTry.textContent = "Nice try 😏❤️";
    }
}


/* ==========================================
   NO BUTTON — DESKTOP
========================================== */

if (noButton) {

    noButton.addEventListener("mouseenter", moveNoButton);


    /* ======================================
       NO BUTTON — PHONE
    ====================================== */

    noButton.addEventListener(
        "touchstart",
        event => {

            event.preventDefault();

            moveNoButton();

        },
        { passive: false }
    );

}


/* ==========================================
   YES BUTTON
========================================== */

if (yesButton) {

    yesButton.addEventListener("click", () => {

        // Hide Yes / No buttons
        if (answerButtons) {
            answerButtons.style.display = "none";
        }

        // Hide Nice Try message
        if (niceTry) {
            niceTry.style.display = "none";
            niceTry.textContent = "";
        }

        // Show the love message
        if (loveAnswer) {

            loveAnswer.style.display = "block";

            // Small romantic fade-in
            loveAnswer.style.opacity = "0";
            loveAnswer.style.transform = "translateY(15px)";

            requestAnimationFrame(() => {

                loveAnswer.style.transition =
                    "opacity 1s ease, transform 1s ease";

                loveAnswer.style.opacity = "1";
                loveAnswer.style.transform = "translateY(0)";

            });

        }

    });

}


/* ==========================================
   CONTINUE
========================================== */

if (continue6) {

    continue6.addEventListener("click", () => {

        showScreen(7);

    });

}


/* ==========================================
   SCREEN 7 - BLACKOUT
========================================== */

const screen7 = document.getElementById("screen7");
const questionPart = document.getElementById("questionPart");
const answerPart = document.getElementById("answerPart");
const continue7 = document.getElementById("continue7");
const continue7b = document.getElementById("continue7b");

let screen7Timer = null;

if (continue7) {
    continue7.addEventListener("click", () => {
        clearTimeout(screen7Timer);

        document.body.classList.add("blackout");

        if (screen7) {
            screen7.classList.add("black-scene");
        }

        if (questionPart) {
            questionPart.style.display = "none";
        }

        if (answerPart) {
            answerPart.style.display = "flex";
            answerPart.style.opacity = "0";
        }

        /* Stay completely black for 5 seconds. */
        screen7Timer = setTimeout(() => {
            if (currentScreen !== 7 || !answerPart) return;

            requestAnimationFrame(() => {
                answerPart.style.opacity = "1";
            });
        }, 5000);
    });
}

if (continue7b) {
    continue7b.addEventListener("click", () => {
        clearTimeout(screen7Timer);

        document.body.classList.remove("blackout");

        if (screen7) {
            screen7.classList.remove("black-scene");
        }

        showScreen(8);
    });
}


/* ==========================================
   SCREEN 8 - VAULT
========================================== */

const vault = document.querySelector(".vault-door");
const vaultContent = document.getElementById("vaultContent");
const continue8 = document.getElementById("continue8");

let vaultOpened = false;

if (continue8) {
    continue8.style.display = "none";
}

if (vault) {
    vault.addEventListener("click", () => {
        if (vaultOpened) return;

        vaultOpened = true;
        vault.style.transform = "rotate(-120deg)";

        setTimeout(() => {
            if (vaultContent) {
                vaultContent.style.display = "block";
            }

            if (continue8) {
                continue8.style.display = "inline-block";
            }
        }, 1000);
    });
}

if (continue8) {
    continue8.addEventListener("click", () => {
        showScreen(9);
    });
}


/* ==========================================
   SCREEN 9
========================================== */

const continue9 = document.getElementById("continue9");

if (continue9) {
    continue9.addEventListener("click", () => {
        showScreen(10);
    });
}


/* ==========================================
   SCREEN 10 - HEART
========================================== */

const heart = document.getElementById("breakingHeart");
const heartMessage = document.getElementById("heartMessage");
const continue10 = document.getElementById("continue10");

let heartSceneTimer1 = null;
let heartSceneTimer2 = null;

function startHeartScene() {
    if (!heart || !heartMessage || !continue10) return;

    clearTimeout(heartSceneTimer1);
    clearTimeout(heartSceneTimer2);

    heart.textContent = "❤️";
    heartMessage.style.display = "none";
    continue10.style.display = "none";

    heartSceneTimer1 = setTimeout(() => {
        if (currentScreen !== 10) return;

        heart.textContent = "💔";

        heartSceneTimer2 = setTimeout(() => {
            if (currentScreen !== 10) return;

            heart.textContent = "❤️";
            heartMessage.style.display = "block";
            continue10.style.display = "inline-block";
        }, 3000);
    }, 1000);
}

if (continue10) {
    continue10.addEventListener("click", () => {
        clearTimeout(heartSceneTimer1);
        clearTimeout(heartSceneTimer2);
        showScreen(11);
    });
}


/* ==========================================
   SCREEN 11
========================================== */

const deleteBtn = document.getElementById("deleteMemory");
const keepBtn = document.getElementById("keepMemory");
const deleteResult = document.getElementById("deleteResult");

if (deleteResult) {
    deleteResult.style.display = "none";
}

if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
        if (deleteResult) {
            deleteResult.style.display = "block";
        }
    });
}

if (keepBtn) {
    keepBtn.addEventListener("click", () => {
        showScreen(12);
    });
}


/* ==========================================
   SCREEN 12
========================================== */

const progressBar = document.getElementById("loveProgress");
const progressText = document.getElementById("progressText");
const infinityMessage = document.getElementById("infinityMessage");
const continue12 = document.getElementById("continue12");

let loveStarted = false;
let loveTimer = null;
let infinityTimer = null;

function startLoveCalculation() {
    if (!progressBar || !progressText || !infinityMessage) return;
    if (loveStarted) return;

    loveStarted = true;

    clearInterval(loveTimer);
    clearTimeout(infinityTimer);

    const values = [0, 8, 27, 64, 99];
    let i = 0;

    progressBar.style.width = "0%";
    progressText.textContent = "0%";
    infinityMessage.style.display = "none";

    loveTimer = setInterval(() => {
        progressBar.style.width = `${values[i]}%`;
        progressText.textContent = `${values[i]}%`;

        i++;

        if (i >= values.length) {
            clearInterval(loveTimer);

            infinityTimer = setTimeout(() => {
                progressText.textContent = "∞";
                infinityMessage.style.display = "block";
            }, 5000);
        }
    }, 900);
}

if (continue12) {
    continue12.addEventListener("click", () => {
        showScreen(13);
    });
}


/* ==========================================
   SCREEN 13
========================================== */

const continue13 = document.getElementById("continue13");

if (continue13) {
    continue13.addEventListener("click", () => {
        showScreen(14);
    });
}


/* ==========================================
   SCREEN 14 — THREE STACK TYPEWRITER
========================================== */

const endingText = document.getElementById("endingText");
const continue14 = document.getElementById("continue14");

let endingRunId = 0;


/* =========================
   WAIT FUNCTION
========================= */

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


/* =========================
   TYPE ONE LINE
========================= */

async function typeLine(text, speed = 65, runId) {

    const line = document.createElement("div");

    line.className = "typing-line";

    endingText.appendChild(line);


    /* Cursor */

    const cursor = document.createElement("span");

    cursor.className = "cursor";

    line.appendChild(cursor);


    /* Type character by character */

    for (const character of text) {

        if (runId !== endingRunId) {
            return false;
        }


        cursor.insertAdjacentText(
            "beforebegin",
            character
        );


        await wait(speed);

    }


    /* Remove cursor after line finishes */

    cursor.remove();


    return true;
}


/* =========================
   TYPE ENTIRE STACK
========================= */

async function typeStack(lines, runId) {

    for (const line of lines) {

        const completed = await typeLine(
            line,
            65,
            runId
        );


        if (!completed) {
            return false;
        }


        /* 
           Pause after every line
        */

        await wait(3000);


        if (runId !== endingRunId) {
            return false;
        }

    }


    return true;
}


/* =========================
   FADE OUT CURRENT STACK
========================= */

async function clearStack(runId) {

    await wait(5000);


    if (runId !== endingRunId) {
        return false;
    }


    /* Fade stack away */

    endingText.style.opacity = "0";


    await wait(1200);


    if (runId !== endingRunId) {
        return false;
    }


    /* Completely clear it */

    endingText.innerHTML = "";

    endingText.style.opacity = "1";


    return true;
}


/* =========================
   START ENDING
========================= */

async function playEnding() {

    if (!endingText) return;


    const runId = ++endingRunId;


    endingText.innerHTML = "";

    endingText.style.opacity = "1";


    /* =================================
       STACK 1
    ================================= */

    const stack1 = [

        "Every click brought you closer to the truth.",

        "I never built this website to impress you.",

        "I built it because every line of code\ncarried a memory of us."

    ];


    const stack1Finished =
        await typeStack(stack1, runId);


    if (!stack1Finished) return;


    /* 
       5 SECOND BIG PAUSE
       THEN STACK 1 DISAPPEARS
    */

    const cleared1 =
        await clearStack(runId);


    if (!cleared1) return;


    /* =================================
       STACK 2
    ================================= */

    const stack2 = [

        "Every animation...",

        "Every transition...",

        "Every little detail...",

        "...was made with you in in my mind.",

        "If I could write\none more line of code...",

        "it would simply say—",

        "Thank you...",

        "...for becoming my favorite part of my life."

    ];


    const stack2Finished =
        await typeStack(stack2, runId);


    if (!stack2Finished) return;


    /*
       5 SECOND BIG PAUSE
       THEN STACK 2 DISAPPEARS
    */

    const cleared2 =
        await clearStack(runId);


    if (!cleared2) return;


    /* =================================
       STACK 3
    ================================= */

    const stack3 = [

        "The universe is unimaginably huge.",

        "Out of billions of people...",

        "Out of countless possibilities...",

        "Somehow...",

        "It led me to you.",

        "And somehow...",

        "It gave me you. 💖"

    ];


    const stack3Finished =
        await typeStack(stack3, runId);


    if (!stack3Finished) return;


   

    /*
        BIG 5 SECOND PAUSE
    */

    await wait(5000);


    if (runId !== endingRunId) {
        return;
    }


    /*
        SHOW CONTINUE BUTTON
    */

    if (continue14) {

        continue14.style.display = "inline-block";

        continue14.style.opacity = "0";

        continue14.style.transform = "translateY(15px)";


        requestAnimationFrame(() => {

            continue14.style.transition =
                "opacity 1s ease, transform 1s ease";

            continue14.style.opacity = "1";

            continue14.style.transform =
                "translateY(0)";

        });

    }

}
if (continue14) {

    continue14.addEventListener("click", () => {

        showScreen(15);

    });

}
/* ==========================================
SCREEN 15 — CHAPTER FOREVER
========================================== */

const chapterProgress = document.getElementById("chapterProgress");

let chapterStarted = false;
let chapterTimer = null;

function startChapter() {

    if (!chapterProgress) return;

    if (chapterStarted) return;

    chapterStarted = true;

    clearInterval(chapterTimer);

    let progress = 0;

    chapterProgress.style.width = "0%";

    chapterTimer = setInterval(() => {

        progress += 2;

        chapterProgress.style.width = `${progress}%`;

        if (progress >= 100) {

            progress = 100;

            chapterProgress.style.width = "100%";

            clearInterval(chapterTimer);
        }

    }, 60);
}
/* ==========================================
   PARTICLES
========================================== */

// function createHeart() {
//     const heartParticle = document.createElement("div");

//     heartParticle.className = "heart-particle";
//     heartParticle.textContent = Math.random() > 0.5 ? "❤️" : "💖";
//     heartParticle.style.left = `${Math.random() * 100}vw`;
//     heartParticle.style.fontSize = `${18 + Math.random() * 18}px`;
//     heartParticle.style.animationDuration = `${8 + Math.random() * 6}s`;

//     document.body.appendChild(heartParticle);

//     setTimeout(() => {
//         heartParticle.remove();
//     }, 14000);
// }

// function createPetal() {
//     const petal = document.createElement("div");

//     petal.className = "petal";
//     petal.style.left = `${Math.random() * 100}vw`;
//     petal.style.animationDuration = `${8 + Math.random() * 6}s`;

//     document.body.appendChild(petal);

//     setTimeout(() => {
//         petal.remove();
//     }, 15000);
// }

function shootingStar() {
    const star = document.createElement("div");

    star.className = "shooting-star";
    star.style.top = `${Math.random() * 40}vh`;

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 4000);
}

// setInterval(createHeart, 700);
// setInterval(createPetal, 500);
setInterval(shootingStar, 9000);


/* ==========================================
   UTILITY
========================================== */

function escapeHtml(value) {
    return value.replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[character]));
}
/* ==========================================
   ROMANTIC BACKGROUND EFFECTS
========================================== */


/* Create background container */

const backgroundEffects =
    document.createElement("div");

backgroundEffects.className =
    "background-effects";

document.body.prepend(backgroundEffects);



/* ==========================================
   🌸 FALLING FLOWERS
========================================== */

function createFallingFlower() {

    const flower =
        document.createElement("div");

    flower.className =
        "falling-flower";

    flower.textContent = "🌸";


    /* Random horizontal position */

    flower.style.left =
        Math.random() * 100 + "vw";


    /* Random size */

    const size =
        Math.random() * 18 + 12;

    flower.style.fontSize =
        size + "px";


    /* Random falling speed */

    const duration =
        Math.random() * 7 + 7;

    flower.style.animationDuration =
        duration + "s";


    /* Slight random starting delay */

    flower.style.animationDelay =
        Math.random() * 1.5 + "s";


    backgroundEffects.appendChild(flower);


    setTimeout(() => {

        flower.remove();

    }, (duration + 2) * 1000);

}


/* Create flowers randomly */

setInterval(() => {

    createFallingFlower();

}, 900);



/* ==========================================
   ❤️ RISING HEARTS
========================================== */

function createRisingHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "rising-heart";

    heart.textContent = "❤️";


    /* Random horizontal position */

    heart.style.left =
        Math.random() * 100 + "vw";


    /* Random size */

    const size =
        Math.random() * 18 + 12;

    heart.style.fontSize =
        size + "px";


    /* Random rising speed */

    const duration =
        Math.random() * 7 + 8;

    heart.style.animationDuration =
        duration + "s";


    /* Random transparency */

    heart.style.opacity =
        Math.random() * 0.45 + 0.35;


    backgroundEffects.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, (duration + 2) * 1000);

}


/* Hearts appear less frequently */

setInterval(() => {

    createRisingHeart();

}, 1800);



/* ==========================================
   🌠 SHOOTING STARS
========================================== */




/* ==========================================
   🌠 SHOOTING STARS
========================================== */

function createShootingStar() {

    const star = document.createElement("div");

    star.classList.add("shooting-star");


    /* Random star type */

    const type =
        Math.floor(Math.random() * 3);


    /* Random tail */

    const tail =
        Math.floor(Math.random() * 90) + 100;

    star.style.setProperty(
        "--tail-length",
        tail + "px"
    );


    /* ==================================
       TOP LEFT → BOTTOM RIGHT
    ================================== */

    if (type === 0) {

        star.classList.add("shoot-tl-br");

        star.style.left =
            (Math.random() * 65 - 10) + "vw";

        star.style.top =
            (Math.random() * 35 - 10) + "vh";
    }


    /* ==================================
       TOP RIGHT → BOTTOM LEFT
    ================================== */

    else if (type === 1) {

        star.classList.add("shoot-tr-bl");

        star.style.left =
            (Math.random() * 65 + 45) + "vw";

        star.style.top =
            (Math.random() * 35 - 10) + "vh";
    }


    /* ==================================
       LEFT → RIGHT
    ================================== */

    else {

        star.classList.add("shoot-left-right");

        star.style.left =
            (Math.random() * 15 - 10) + "vw";

        star.style.top =
            (Math.random() * 70 + 10) + "vh";
    }


    backgroundEffects.appendChild(star);


    /* Remove after animation */

    setTimeout(() => {

        star.remove();

    }, 1500);
}


/* ==========================================
   RANDOM SHOOTING STAR LOOP
========================================== */

function randomShootingStar() {

    createShootingStar();


    /* Random delay between stars */

    const next =
        Math.random() * 2500 + 1200;


    setTimeout(
        randomShootingStar,
        next
    );
}


/* Start */

setTimeout(() => {

    randomShootingStar();

}, 1500);