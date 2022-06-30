const template = document.createElement("template");
template.innerHTML = `
 
  <button class="counter"> counter 0 </button>
`;
import styles from "./my-button.css";
const stylesinstance = new CSSStyleSheet();
stylesinstance.replace(styles);

export default class MyButtonElement extends HTMLElement {
  static get observedAttributes() {
    return ["count"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [stylesinstance];
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  render() {
    this.shadowRoot.querySelector(
      ".counter"
    ).innerText = `counter ${this.getAttribute("count")}`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".counter").addEventListener("click", () => {
      this.onclickClicker();
    });
  }

  onclickClicker() {
    this.setAttribute("count", parseInt(this.getAttribute("count")) + 1);
  }
}

customElements.define("my-button", MyButtonElement);
