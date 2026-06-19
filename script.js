document.addEventListener("DOMContentLoaded", () => {
    
    /* ========================================================
       1. Active Navigation Indicator (Scroll Tracking)
    ======================================================== */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-item");
    const navbar = document.querySelector(".navbar");

    function updateActiveLink() {
        let currentId = "";
        const scrollY = window.scrollY;
        const navHeight = navbar.offsetHeight;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - navHeight - 20) {
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

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink(); // Run on load

    /* ========================================================
       2. Mobile Menu Toggle Logic
    ======================================================== */
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active-menu");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active-menu");
        });
    });

    /* ========================================================
       3. WhatsApp Form Integration
    ======================================================== */
    const waForm = document.getElementById("wa-form");
    
    if (waForm) {
        waForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Prevent page reload
            
            // Get values from form
            const name = document.getElementById("wa-name").value;
            const mobile = document.getElementById("wa-mobile").value;
            const email = document.getElementById("wa-email").value || "उपलब्ध नहीं";
            const message = document.getElementById("wa-message").value;
            
            // Format WhatsApp Message
            const whatsappNumber = "919507356159";
            const waMessage = `नमस्कार, मैं वेबसाइट के माध्यम से संपर्क कर रहा हूँ।\n\n*नाम:* ${name}\n*मोबाइल:* ${mobile}\n*ईमेल:* ${email}\n*संदेश:* ${message}`;
            
            // Encode URI to handle spaces and line breaks
            const encodedMessage = encodeURIComponent(waMessage);
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(waUrl, "_blank");
            
            // Optional: Reset form after sending
            waForm.reset();
        });
    }

    /* ========================================================
       4. Gallery Lightbox Logic
    ======================================================== */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");
    
    const galleryTriggers = document.querySelectorAll(".lightbox-trigger");
    let currentImageIndex = 0;
    const imagesArray = Array.from(galleryTriggers);

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = imagesArray[currentImageIndex].src;
        lightbox.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    function closeLightbox() {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    }

    function changeImage(direction) {
        currentImageIndex += direction;
        
        // Loop back to start or end
        if (currentImageIndex >= imagesArray.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = imagesArray.length - 1;
        }
        
        // Add brief animation effect when changing
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = imagesArray[currentImageIndex].src;
            lightboxImg.style.opacity = 1;
        }, 150);
    }

    // Attach click events to images
    imagesArray.forEach((img, index) => {
        img.addEventListener("click", () => openLightbox(index));
    });

    // Attach click events to controls
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (nextBtn) nextBtn.addEventListener("click", () => changeImage(1));
    if (prevBtn) prevBtn.addEventListener("click", () => changeImage(-1));

    // Close lightbox if clicking outside the image
    window.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation (Escape to close, Arrows to navigate)
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "block") {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") changeImage(1);
            if (e.key === "ArrowLeft") changeImage(-1);
        }
    });
});