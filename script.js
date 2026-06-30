document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       1. Active Navigation Indicator (Scroll Tracking)
    ======================================================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-item");
    const navbar  = document.querySelector(".navbar");

    function updateActiveLink() {
        const scrollY   = window.scrollY;
        const navHeight = navbar ? navbar.offsetHeight : 80;
        let   currentId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - navHeight - 30;
            if (scrollY >= sectionTop) {
                currentId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentId}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();

    /* ========================================================
       2. Navbar Scroll Shadow Effect
    ======================================================== */
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 40);
        }, { passive: true });
    }

    /* ========================================================
       3. Mobile Menu Toggle Logic
    ======================================================== */
    const hamburger = document.getElementById("hamburger");
    const navMenu   = document.querySelector(".nav-links");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active-menu");
            hamburger.classList.toggle("open", isOpen);
            hamburger.setAttribute("aria-expanded", String(isOpen));
        });

        // Close menu when a link is clicked
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active-menu");
                hamburger.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu on outside click
        document.addEventListener("click", (e) => {
            if (!navbar.contains(e.target) && navMenu.classList.contains("active-menu")) {
                navMenu.classList.remove("active-menu");
                hamburger.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* ========================================================
       4. WhatsApp Form Integration
    ======================================================== */
    const waForm = document.getElementById("wa-form");

    if (waForm) {
        waForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name    = document.getElementById("wa-name").value.trim();
            const mobile  = document.getElementById("wa-mobile").value.trim();
            const email   = document.getElementById("wa-email").value.trim() || "उपलब्ध नहीं";
            const message = document.getElementById("wa-message").value.trim();

            if (!name || !mobile || !message) return;

            const whatsappNumber = "919507356159";
            const waMessage = `नमस्कार, मैं वेबसाइट के माध्यम से संपर्क कर रहा हूँ।\n\n*नाम:* ${name}\n*मोबाइल:* ${mobile}\n*ईमेल:* ${email}\n*संदेश:* ${message}`;

            const encodedMessage = encodeURIComponent(waMessage);
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            window.open(waUrl, "_blank");
            waForm.reset();
        });
    }

    /* ========================================================
       5. Gallery Lightbox Logic
    ======================================================== */
    const lightbox      = document.getElementById("lightbox");
    const lightboxImg   = document.getElementById("lightbox-img");
    const closeBtn      = document.querySelector(".lightbox-close");
    const prevBtn       = document.querySelector(".lightbox-prev");
    const nextBtn       = document.querySelector(".lightbox-next");
    const galleryTriggers = document.querySelectorAll(".lightbox-trigger");

    if (!lightbox || !lightboxImg) return;

    const imagesArray = Array.from(galleryTriggers);
    let currentImageIndex = 0;

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src   = imagesArray[currentImageIndex].src;
        lightboxImg.alt   = imagesArray[currentImageIndex].alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    function changeImage(direction) {
        currentImageIndex = (currentImageIndex + direction + imagesArray.length) % imagesArray.length;

        lightboxImg.style.opacity = "0";
        lightboxImg.style.transform = "scale(0.97)";

        setTimeout(() => {
            lightboxImg.src = imagesArray[currentImageIndex].src;
            lightboxImg.alt = imagesArray[currentImageIndex].alt;
            lightboxImg.style.opacity = "1";
            lightboxImg.style.transform = "scale(1)";
        }, 160);
    }

    // Smooth transition style on lightbox image
    lightboxImg.style.transition = "opacity 0.2s ease, transform 0.2s ease";

    // Attach click events
    imagesArray.forEach((img, index) => {
        img.addEventListener("click", () => openLightbox(index));
        // Keyboard accessibility on gallery items
        img.parentElement.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeLightbox);
        closeBtn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") closeLightbox();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", () => changeImage(1));
        nextBtn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") changeImage(1);
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", () => changeImage(-1));
        prevBtn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") changeImage(-1);
        });
    }

    // Close on background click
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape")     closeLightbox();
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "ArrowLeft")  changeImage(-1);
    });
});