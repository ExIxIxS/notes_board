import BasicComponent from "../basicComponents/basicComponent/index.js";
import appDialog from "../dialog/index.js";

import appStorage from "../../services/appStorage.service.js";
import { checkIsObject, createElementsGetter } from "../../utils/componentFunctions.js";
import { getNoteEditorFormComponent } from "../../utils/formChildren.js";

import { loadCSS } from "../../utils/cssFunctions.js";

loadCSS('./js/components/note/note.css');

/*
bgColor:"green"
date: "12:25 17.05.2023"
isFavorite: false
isUpdated: false
noteDescription: "Dfdffdfdf"
noteId: 35697347
noteTitle: "Johcn"
*/

class Note extends BasicComponent {
  #noteState;

  constructor(noteArgsObj) {
    checkIsObject(noteArgsObj);

    super({
      elementType: 'div',
      id: noteArgsObj.noteId,
      basicClassNames: ['note'],
      additionlClassNames: [noteArgsObj.bgColor],
    });

    this.#noteState = noteArgsObj;
    this._element.innerHTML = this.#getNoteInnerHTML();
  }

  toggleFavorite() {
    this.#noteState.isFavorite = !this.#noteState.isFavorite;

    appStorage.updateNote(this.#noteState);
    this.updateNoteElement();
  }

  startNoteEditing() {
    console.log('start editing');
    const editorInnerHTML = this.#getNoteEditorInnerHTML();
    this._element.innerHTML = editorInnerHTML;
    this.#makeNoteEditorInteractive(this.element);
  }

  endNoteEditing() {
    console.log('end editing');
    this._element.innerHTML = this.#getNoteInnerHTML();
  }

  updateNoteElement() {
    this.element.innerHTML = this.#getNoteInnerHTML();
  }

  deleteNote(outerCallback) {
    const message = `Are you sure, want to delete this note: "${this.#noteState.noteTitle}"?`;
    const deleteCallback = () => {
      appStorage.deleteNote(this.#noteState.noteId);
      this.element.remove();
      outerCallback();
    };

    appDialog.openDialog(message, deleteCallback);
  }

  #getNoteInnerHTML() {
    return `
      <div class="note__text-content">
        <h3 class="note__title">${this.#noteState.noteTitle}</h3>
        <p class="note__description">${this.#noteState.noteDescription}</p>
        <p class="note__date">${this.#noteState.date} ${this.#noteState.isUpdated ? 'Updated' : ''}</p>
      </div>
      <div class="note__buttons">
        <button class="note__button note__button--favorite-button">
          ${this.#noteState.isFavorite
            ? '<span class="note__button-icon note__button-icon--favorite material-icons" title="remove from favorites">star</span>'
            : '<span class="note__button-icon note__button-icon--favorite material-icons" title="add to favorites">star_outline</span>'
          }
        </button>
        <button class="note__button note__button--edit-button">
          <span class="note__button-icon note__button-icon--edit material-icons" title="edit note">edit</span>
        </button>
        <button class="note__button note__button--delete-button">
          <span class="note__button-icon note__button-icon--delete material-icons" title="edit note">delete_forever</span>
        </button>
      </div>
    `;
  }

  #getNoteEditorInnerHTML(formComponent) {
    const formEditorComponent = formComponent ?? this.#getNoteFormEditorComponent();

    return `
      ${formEditorComponent.element.outerHTML}
      <button class="note__button note__button--close-button">
        <span class="note__button-icon note__button-icon--close material-icons" title="close note editor">close</span>
      </button>
    `;
  }

  #getNoteFormEditorComponent() {
    return getNoteEditorFormComponent(this.#noteState.noteTitle, this.#noteState.noteDescription);
  }

  #makeNoteEditorInteractive(noteElement) {
    const getElementBySelector = createElementsGetter(noteElement, {});
    const closeButton = getElementBySelector('.note__button--close-button');
    closeButton.addEventListener('click', () => this.endNoteEditing());
  }

}

export default Note;
