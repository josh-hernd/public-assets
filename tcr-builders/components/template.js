class MyComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Get attribute value
        const message = this.getAttribute("message") || "Default Message";

        this.shadowRoot.innerHTML = `
            <style>
                p {
                    color: green;
                    font-size: 18px;
                }
            </style>
            <p>${message}</p>
        `;
    }
}

customElements.define("my-component", MyComponent);
