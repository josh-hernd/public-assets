async function loadComponent(componentName) {
  switch (componentName) {
    case "hero-section":
      await import("../components/hero/hero-section.js");
      
      break;

    case "desktop-nav":
      await import("../components/navigation/desktop-nav.js");

      break;

    default:
      console.warn(`Component "${componentName}" not found.`);
  }
}

// Detect components and load them dynamically
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("hero-section, desktop-nav").forEach((element) => {
    loadComponent(element.tagName.toLowerCase());
  });
});
