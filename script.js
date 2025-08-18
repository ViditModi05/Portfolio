document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");
    const menu = document.querySelector(".menu-options");
    const menuItems = document.querySelectorAll(".menu-options .menu-btn");

    // Step 1: Character walks in
    character.classList.add("walk-in");

    // Track current frame of walk cycle
    let currentFrame = 0;
    const totalFrames = 8;

    // Update background-position manually to freeze last frame
    character.addEventListener("animationiteration", (e) => {
        if (e.animationName === "walkCycle") {
            currentFrame = (currentFrame + 1) % totalFrames;
        }
    });

    character.addEventListener("animationend", (e) => {
        if (e.animationName === "walkIn") {
            // Freeze last frame
            const frameWidth = 2048 / totalFrames; // width of one frame
            const lastFramePos = -frameWidth * (totalFrames - 1);
            character.style.backgroundPosition = `${lastFramePos}px 0`;
            character.style.animationPlayState = "paused"; // stop animation cleanly

            // Show welcome text above menu
            const welcomeText = document.querySelector(".welcome-text");
            if (welcomeText) {
                welcomeText.style.display = "absolute"; // make sure it's visible
                welcomeText.style.textAlign = "center"; // center it
                welcomeText.style.marginBottom = "20px"; // spacing above buttons
            }

            menu.style.display = "block";
            menu.style.opacity = "1";
        }

        if (e.animationName === "walkOut") {
            const activeBtn = document.querySelector(".menu-btn.active");
            const target = activeBtn ? activeBtn.getAttribute("href") : "#";
            window.location.href = target;
        }
    });

    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            menuItems.forEach(btn => btn.classList.remove("active"));
            item.classList.add("active");

            menu.style.opacity = "0";

            // Resume walk cycle + walkOut
            character.style.animation = "walkCycle 1s steps(8) infinite, walkOut 2s forwards";
            character.style.animationPlayState = "running";
        });
    });
});
