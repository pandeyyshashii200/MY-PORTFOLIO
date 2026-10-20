
document.addEventListener("DOMContentLoaded", function () {
    // Mobile-friendly navigation
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");

    if (navbar && navLinks) {
        const menuButton = document.createElement("button");
        menuButton.type = "button";
        menuButton.className = "menu-toggle";
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Toggle navigation");
        menuButton.setAttribute("aria-expanded", "false");

        navbar.insertBefore(menuButton, navLinks);

        menuButton.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("active");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "☰";
            });
        });
    }

    // Highlight the current navigation section
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav-links a");

    function updateActiveLink() {
        let currentSection = "";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        links.forEach(function (link) {
            link.classList.toggle(
                "active-link",
                link.getAttribute("href") === "#" + currentSection
            );
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // Animate cards when they enter the screen
    const cards = document.querySelectorAll(".card");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries, observerInstance) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show-card");
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        cards.forEach(function (card) {
            card.classList.add("hidden-card");
            observer.observe(card);
        });
    }

    // Contact form validation
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                alert("Please fill in all fields.");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            alert(
                "Thank you, " + name +
                "! Your form has been validated successfully. " +
                "To send your message, the form needs a backend or form service."
            );

            contactForm.reset();
        });
    }

    // Update the footer year automatically
    const footer = document.querySelector("footer");

    if (footer) {
        const footerParagraph = footer.querySelector("p");

        if (footerParagraph) {
            footerParagraph.innerHTML =
                "&copy; " + new Date().getFullYear() +
                " Shashi Pandey. All rights reserved.";
        }
    }
});
