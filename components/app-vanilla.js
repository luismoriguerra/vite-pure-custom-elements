const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: block;
      padding: 16px;
      border: 1px solid var(--border-color, #ccc);
      border-radius: 4px;
    }
    ::slotted(*) {
      margin-bottom: 16px;
      background-color: #f0f0f0;
    }
    my-button {
      --text-color: green;
    }
  </style>
  <input type="text" />
  <button class="clicker" id="clicker">Click me</button>  
  <hr />
   <slot></slot>
  <hr />
  <my-button count="0">mybutton no loaded</my-button>
`;

import("./my-button.js");

class ExampleElement extends HTMLElement {
  static get observedAttributes() {
    return ["count", "name"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  render() {
    this.shadowRoot.querySelector("input").value = this.getAttribute("name");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".clicker").addEventListener("click", () => {
      this.onclickClicker();
    });
    this.shadowRoot.querySelector("input").addEventListener("input", () => {
      this.oninputInput();
    });
  }

  oninputInput() {
    this.setAttribute("name", this.shadowRoot.querySelector("input").value);
  }

  onclickClicker() {
    alert(`Hello ${this.getAttribute("name")}`);
  }
}

customElements.define("app-vanilla", ExampleElement);
