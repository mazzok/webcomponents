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
.drop-active {
        border-color: #aaa;
        background-color: aqua;
      }

      .drop-target {
        background-color: #29e;
        border-color: #fff;
        border-style: solid;
      }


</style>

<div id="outer-dropzone" class="dropzone">
      #outer-dropzone
      <div id="inner-dropzone" class="dropzone">#inner-dropzone</div>
    </div>
<h2><name></name></h2>
<ul>
<li>Age : <age></age></li>
<li>Height : <height></height></li>
</ul>
`;

class CharacterDetails extends HTMLElement {
  /**
   * @type {any} _character
   */
  _character;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.innerDropZone = this.shadowRoot.getElementById("inner-dropzone");
  }

  connectedCallback() {
    interact(this.innerDropZone).dropzone({
      // only accept elements matching this CSS selector
      accept: "#yes-drop",
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.75,

      // listen for drop related events:

      ondropactivate: function (event) {
        console.log("ondropactivate");
        // add active dropzone feedback
        event.target.classList.add("drop-active");
      },
      ondragenter: function (event) {
        console.log("ondragenter");
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add("drop-target");
        draggableElement.classList.add("can-drop");
        draggableElement.textContent = "Dragged in";
      },
      ondragleave: function (event) {
        console.log("ondragleave");
        // remove the drop feedback style
        event.target.classList.remove("drop-target");
        event.relatedTarget.classList.remove("can-drop");
        event.relatedTarget.textContent = "Dragged out";
      },
      ondrop: function (event) {
        console.log("ondrop");
        event.relatedTarget.textContent = "Dropped";
      },
      ondropdeactivate: function (event) {
        console.log("ondropdeactivate");
        // remove active dropzone feedback
        event.target.classList.remove("drop-active");
        event.target.classList.remove("drop-target");
      },
    });
  }

  get character() {
    return this._character;
  }

  /**
   * @function
   * @param {any} e
   */
  set character(e) {
    console.log("set character:", JSON.stringify(e));
    this._character = e;
    this._render();
  }

  _render() {
    this.shadowRoot.querySelector(
      "name"
    ).innerHTML = ` ${this._character.name}`;
    this.shadowRoot.querySelector("age").innerHTML = ` ${this._character.age}`;
    this.shadowRoot.querySelector(
      "height"
    ).innerHTML = ` ${this._character.height}`;
  }
}

customElements.define("x-character-details", CharacterDetails);

// interact(".dropzone").dropzone({
//   // only accept elements matching this CSS selector
//   accept: "#yes-drop",
//   // Require a 75% element overlap for a drop to be possible
//   overlap: 0.75,

//   // listen for drop related events:

//   ondropactivate: function (event) {
//     console.log("ondropactivate");
//     // add active dropzone feedback
//     event.target.classList.add("drop-active");
//   },

//   ondragenter: function (event) {
//     console.log("ondragenter");
//     var draggableElement = event.relatedTarget;
//     var dropzoneElement = event.target;

//     // feedback the possibility of a drop
//     dropzoneElement.classList.add("drop-target");
//     draggableElement.classList.add("can-drop");
//     draggableElement.textContent = "Dragged in";
//   },
//   ondragleave: function (event) {
//     console.log("ondragleave");
//     // remove the drop feedback style
//     event.target.classList.remove("drop-target");
//     event.relatedTarget.classList.remove("can-drop");
//     event.relatedTarget.textContent = "Dragged out";
//   },
//   ondrop: function (event) {
//     console.log("ondrop");
//     event.relatedTarget.textContent = "Dropped";
//   },
//   ondropdeactivate: function (event) {
//     console.log("ondropdeactivate");
//     // remove active dropzone feedback
//     event.target.classList.remove("drop-active");
//     event.target.classList.remove("drop-target");
//   },
// });
