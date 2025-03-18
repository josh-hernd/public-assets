class Hero extends HTMLElement {
  constructor() {
    super();

    this.container = document.createElement("div");
    this.container.classList.add("hero");

    this.loadStyles("../tcr-builders/components/hero/hero.css");
    this.appendChild(this.container);
    this.render();
  }

  static get observedAttributes() {
    return ["hero-data"];
  }

  attributeChangedCallback() {
    this.render();
  }
  // content { title, desc, btn {label, link}, video: {src, overlay} }
  render() {
    let output = "";

    const hero_content = JSON.parse(this.getAttribute("hero-data")) || {
      title: "My Title",
      desc: "My description",
      cta: { label: "CTA", link: "#this" },
      video: {
        src: "http://media.w3.org/2010/05/sintel/trailer.mp4",
        overlay: "https://assets.codepen.io/32795/poster.png",
      },
    };
    output += `<div class="container">
        <div class="content">
          <h1 class="heading white">${hero_content.title}</h1>
          <p class="archivo-p white">${hero_content.desc}</p>
        </div>
        <div class="video_container">
          <div class="video_overlay" id="videoOverlay">
            <img src="${hero_content.video.overlay}" alt="Video thumbnail">
            <button id="playButton" aria-label="Play video">
             <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18L7 18L7 6L9 6L9 18M15 6L17 6L17 18L15 18L15 6"><animate fill="freeze" attributeName="d" dur="0.6s" keyTimes="0;0.66;1" values="M9 18L7 18L7 6L9 6L9 18M15 6L17 6L17 18L15 18L15 6;M13 15L8 18L8 6L13 9L13 15M13 9L18 12L18 12L13 15L13 9;M13 15L8 18L8 6L13 9L13 9M13 9L18 12L18 12L13 15L13 15"/></path></svg>
            </button>
          </div>
          <video id="video" preload='none' poster="${hero_content.video.overlay}">
            <source src="${hero_content.video.src}" type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>`;

    this.container.innerHTML = output;
    this.addEventListeners();
  }

  addEventListeners() {
    const video = this.container.querySelector("#video");
    const overlay = this.container.querySelector("#videoOverlay");
    const playButton = this.container.querySelector("#playButton");

    playButton.addEventListener("click", () => {
      overlay.style.display = "none"; // Hide overlay
      video.play();
    });

    video.addEventListener("pause", () => {
      overlay.style.display = "flex"; // Show overlay on pause
    });

    video.addEventListener("play", () => {
      overlay.style.display = "none"; // Hide overlay on play
    });
  }

  loadStyles(cssPath) {
    if (!document.querySelector(`link[href="${cssPath}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssPath;
      document.head.appendChild(link);
    }
  }
}
customElements.define("hero-section", Hero);
