async function loadComponent(componentName) {
  let baseUrl;

  // Check if running on localhost or GitHub Pages
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    baseUrl = '/tcr-builders/components/';
    console.log('Loading components locally.');
  } else {
    baseUrl = "__GITHUB_PAGES_URL__/tcr-builders/components/";
    console.log('Loading components from GitHub Pages.');
  }

  try {
    switch (componentName) {
      case 'hero-section':
        await import(`${baseUrl}hero/hero-section.js`);
        break;

      case 'desktop-nav':
        await import(`${baseUrl}navigation/desktop-nav.js`);
        break;

      default:
        console.warn(`Component "${componentName}" not found.`);
    }
  } catch (error) {
    console.error(`Error loading component "${componentName}":`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("hero-section, desktop-nav").forEach(element => {
    loadComponent(element.tagName.toLowerCase());
  });
});
