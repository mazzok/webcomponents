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

<section>
</section>
<slot></slot>

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

  connectedCallback() {
    // fetch("http://localhost:8080/hello")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     this.characters = data;
    //     // characterDetailsComponent.character = data[0];
    //   });
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
      const dragDiv = document.createElement("div");
      if (index == 1) {
        dragDiv.setAttribute("id", "yes-drop");
      } else {
        dragDiv.setAttribute("id", index.toString());
      }
      dragDiv.setAttribute("class", "drag-drop");
      // <div id="yes-drop" class="drag-drop"> #yes-drop </div>
      const button = document.createElement("button");
      button.innerText = character.name;
      // button.appendChild(document.createTextNode(character.name));
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
      dragDiv.innerText = character.name;
      this.characterListSection.appendChild(dragDiv);
    });
  }

  get characters() {
    return this._characters;
  }
}

customElements.define("x-character-list", CharacterList);

var drag_pos = { x: 0, y: 0 };
function dragging(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

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
      restriction: "parent",
      endOnly: true,
    }),
  ],
  autoScroll: true,
  // dragMoveListener from the dragging demo above
  listeners: { move: dragging, end: revertBack },
});
