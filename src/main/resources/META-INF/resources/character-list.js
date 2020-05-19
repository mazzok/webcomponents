const template = document.createElement("template");

template.innerHTML = /*html*/ `
<style>
.drag-drop {
        display: inline-block;
        min-width: 40px;
        padding: 2em 0.5em;

        color: #fff;
        background-color: #29e;
        border: solid 2px #fff;

        touch-action: none;
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);

        transition: background-color 0.3s;
      }

      .drag-drop.can-drop {
        color: #000;
        background-color: #4e4;
      }

      button {
        display: block;
        padding: 12px;
        width: 100%;
      }
</style>
<section></section>
`;

class CharacterList extends HTMLElement {
  /**
   * @type {any []} _characters
   */
  _characters;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.characterListSection = this.shadowRoot.querySelector("section");
  }

  /**
   * @function
   * @param {any[]} e
   */
  set characters(e) {
    console.log("characters set!");
    this._characters = e;
    this._render();
  }

  _render() {
    this._characters.forEach((character, index) => {
      console.log("creating buttin for ", character.name);
      const draggableCharacter = document.createElement("draggable-character");
      draggableCharacter.setAttribute("id", "dropable");
      draggableCharacter.setAttribute("class", "drag-drop");
      draggableCharacter.character = character;
      const button = document.createElement("button");
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
      draggableCharacter.appendChild(button);
      this.characterListSection.appendChild(draggableCharacter);
    });
  }

  get characters() {
    return this._characters;
  }
}

customElements.define("x-character-list", CharacterList);

function dragging(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
  // console.log("dragged X:", x, " Y: ", y);

  // translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

function revertBack(event) {
  var target = event.target;
  target.style.webkitTransform = target.style.transform = "translate(0px, 0px)";

  target.setAttribute("data-x", 0);
  target.setAttribute("data-y", 0);
}

interact(".drag-drop").draggable({
  inertia: true,
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "self",
      endOnly: true,
    }),
  ],
  autoScroll: true,
  // dragMoveListener from the dragging demo above
  listeners: { move: dragging, end: revertBack },
});
