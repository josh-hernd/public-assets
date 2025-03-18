class Desktop_Nav extends HTMLElement {
    constructor() {
      super();
  
      this.container = document.createElement("div");
      this.container.classList.add("desktop_nav");
  
      this.loadStyles("../tcr-builders/components/navigation/desktop-nav.css"); // Load external CSS
  
      this.appendChild(this.container);
      this.render();
    }
  
    static get observedAttributes() {
      return ["logo-data", "nav-data"];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this.render(); // Re-render when attributes change
    }
  
    render() {
      let output = "";
  
      const logo_data = JSON.parse(this.getAttribute("logo-data")) || {"src": "../tcr-builders/static/svg/logo_placeholder.svg", "link": "#top"};
      const nav_data = JSON.parse(this.getAttribute("nav-data")) || [{"label": "Top", "link": "#top"}, {"label": "Free Consultation", "link": "#consult"}, {"label": "Reviews", "link": "#reviews"}, {"label": "FAQ", "link": "#faq"}];
  
      const links = nav_data
        .map((item) => `<li><a href="${item.link}">${item.label}</a></li>`)
        .join("");
  
      let logo_container = `<div class="logo_container"><a href="${logo_data.link}"><img src="${logo_data.src}" alt="page logo"/></a></div>`;
      let nav_container = `<nav><ul>${links}</ul></nav>`;
  
      output += logo_container;
      output += nav_container;
  
      this.container.innerHTML = output;
      document.querySelector("body").style.marginTop = `${this.container.clientHeight}px`;
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
  
  customElements.define("desktop-nav", Desktop_Nav);
  