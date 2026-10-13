/* Smart Volkswagen Spares — interactive features */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Accessible mobile navigation menu.
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");

  if (menuToggle && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  // The six actual spare-parts photos included in the /photos folder.
  const parts = [
    { name: "Volkswagen Gearbox", description: "Ask us about pricing and availability.", image: "photos/407394.jpg" },
    { name: "Volkswagen Engine Component", description: "Ask us about pricing and availability.", image: "photos/407395.jpg" },
    { name: "Volkswagen Engine Assembly", description: "Ask us about pricing and availability.", image: "photos/407396.jpg" },
    { name: "Volkswagen Turbocharger", description: "Ask us about pricing and availability.", image: "photos/407397.jpg" },
    { name: "Volkswagen Engine Wiring and Parts", description: "Ask us about pricing and availability.", image: "photos/407398.jpg" },
    { name: "Volkswagen Wheel Hub and Brake Assembly", description: "Ask us about pricing and availability.", image: "photos/407399.jpg" }
  ];

  const grid = document.getElementById("parts-grid");
  const empty = document.getElementById("gallery-empty");

  if (grid && empty && parts.length > 0) {
    empty.hidden = true;
    parts.forEach((part) => {
      const card = document.createElement("article");
      card.className = "part-card";

      const image = document.createElement("img");
      image.src = part.image;
      image.alt = part.name;
      image.loading = "lazy";
      image.addEventListener("error", () => {
        image.alt = `${part.name} image could not be loaded`;
        image.hidden = true;
      });

      const body = document.createElement("div");
      body.className = "part-card-body";

      const heading = document.createElement("h3");
      heading.textContent = part.name;

      const description = document.createElement("p");
      description.textContent = part.description;

      const link = document.createElement("a");
      link.className = "text-link";
      link.href = "https://wa.me/254706462200?text=" +
        encodeURIComponent(`Hello Smart Volkswagen Spares, please tell me about ${part.name}.`);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Enquire on WhatsApp ↗";

      body.append(heading, description, link);
      card.append(image, body);
      grid.append(card);
    });
  }
});
