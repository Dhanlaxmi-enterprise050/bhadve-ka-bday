document.addEventListener("DOMContentLoaded", () => {
    // script.js mein sabse upar ya DOMContentLoaded ke andar daal de:

const playAudio = () => {
    const audio = document.getElementById('bg-music');
    if (audio) {
        audio.play().then(() => {
            console.log("Music started! 🔥");
        }).catch(error => {
            console.log("Still blocked, waiting for more interaction.");
        });
    }
};

// Jab user screen par kahin bhi click karega, music start ho jayega
document.body.addEventListener('click', playAudio, { once: true });

// Agar user scroll bhi kare, toh bhi try karo
document.body.addEventListener('touchstart', playAudio, { once: true });
    
    // --- 1. LOADER REMOVAL ---
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
            // Auto play music (browsers might block this until user interacts, but we try)
            document.getElementById('bg-music').play().catch(e => console.log("Audio autoplay blocked by browser."));
        }, 1000);
    }, 2500);

    // --- 2. CUSTOM CURSOR ---
    const cursor = document.getElementById("cursor");
    const cursorBlur = document.getElementById("cursor-blur");

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        
        // Slight delay for the blur effect for that smooth cinematic feel
        setTimeout(() => {
            cursorBlur.style.left = e.clientX + "px";
            cursorBlur.style.top = e.clientY + "px";
        }, 50);
    });

    // Hover effect on elements
    const hoverElements = document.querySelectorAll('button, .glass-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = '#ff3366'; // Danger/Secret color
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.background = 'var(--primary-glow)';
        });
    });

    // --- 3. SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 }); // Triggers when 20% of the section is visible

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    // --- 4. SECRET BUTTON LOGIC ---
    const secretBtn = document.getElementById("secret-btn");
    const overlay = document.getElementById("secret-overlay");
    const closeOverlay = document.getElementById("close-overlay");

    secretBtn.addEventListener("click", () => {
        overlay.classList.remove("overlay-hidden");
        overlay.classList.add("overlay-active");
    });

    closeOverlay.addEventListener("click", () => {
        overlay.classList.remove("overlay-active");
        overlay.classList.add("overlay-hidden");
    });

    // --- 5. SIMPLE PARTICLE GENERATOR ---
    const particleContainer = document.getElementById("particles-bg");
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");
        
        // Randomize position, size, and animation duration
        let size = Math.random() * 3 + 1; // 1px to 4px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`; // 5s to 15s
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particleContainer.appendChild(particle);
    }
});
document.body.addEventListener('click', () => {
    const audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play();
    }
}, { once: true }); // Sirf pehle click par trigger hoga