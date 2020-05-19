const template = document.createElement("template");

template.innerHTML = /*html*/ `
<style>
      #outer-dropzone {
        height: 140px;
      }

      #inner-dropzone {
        height: 80px;
      }

      .dropzone {
        background-color: #ccc;
        border: dashed 4px transparent;
        border-radius: 4px;
        margin: 10px auto 30px;
        padding: 10px;
        width: 80%;
        transition: background-color 0.3s;
      }

      .container {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
</style>
    <div class="container">
      <x-character-list></x-character-list>
      <x-character-details></x-character-details>
    </div>
</div>
`;

class App extends HTMLElement {
  /**
   * @type {any []} _characters
   */
  _characters;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.characterListComponent = this.shadowRoot.querySelector(
      "x-character-list"
    );
    this.characterDetailsComponent = this.shadowRoot.querySelector(
      "x-character-details"
    );

    this.characterListComponent.addEventListener("selectCharacter", (event) =>
      this.buttonClicked(event)
    );
  }

  buttonClicked(event) {
    console.log("button clicked event received");
    this.characterDetailsComponent.character = event.detail;
  }

  connectedCallback() {
    fetch("http://localhost:8080/hello")
      .then((res) => res.json())
      .then((data) => {
        console.log("data fetched: ", data);
        this.characterListComponent.characters = data;
        this.characterDetailsComponent.character = data[0];
      });
  }
}

customElements.define("x-app", App);
