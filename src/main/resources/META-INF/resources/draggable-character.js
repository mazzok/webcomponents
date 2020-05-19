const template = document.createElement("template");

template.innerHTML = /*html*/ `
<section></section>
`;

class DraggableCharacter extends HTMLElement {
  /**
   * @type {any} _character
   */
  _character;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.characterListSection = this.shadowRoot.querySelector("section");
  }

  /**
   * @function
   * @param {any} e
   */
  set characters(e) {
    console.log("character set!");
    this._character = e;
    this._render();
  }

  _render() {
    this._characters.forEach((character, index) => {
      console.log("creating buttin for ", character.name);
      const dragDiv = document.createElement("div");
      dragDiv.setAttribute("id", "dropable");
      dragDiv.setAttribute("class", "drag-drop");
      // <div id="yes-drop" class="drag-drop"> #yes-drop </div>
      const button = document.createElement("button");
      // button.innerText = character.name;
      button.appendChild(document.createTextNode(character.name));
      button.addEventListener("click", () => {
        console.log("click event for character dispatched");
        this.dispatchEvent(
          new CustomEvent("selectCharacter", {
            detail: character,
            bubbles: true,
            composed: true,
          })
        );
      });
      dragDiv.appendChild(button);
      this.characterListSection.appendChild(dragDiv);
    });
  }

  get character() {
    return this._character;
  }
}

customElements.define("x-draggable-character", DraggableCharacter);
