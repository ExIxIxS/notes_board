import BasicComponent from "../basicComponents/basicComponent/index.js";
import appDialog from "../dialog/index.js";

import appStorage from "../../services/appStorage.service.js";

import { checkIsObject, createElementsGetter } from "../../utils/componentFunctions.js";
import { getNoteEditorFormComponent } from "../../utils/formChildren.js";
import { getNoteDateString } from "../../utils/dateHandling.js";
import { handleNoteEditorSubmitClick, makeElementValid } from "../../utils/formInteractive.js";

import { getBgColorClass } from "../../utils/styleHandling.js";

class Note extends BasicComponent {
  #noteState;
  #isEditorOpen = false;

  constructor(noteArgsObj) {
    checkIsObject(noteArgsObj);

    super({
      elementType: 'div',
      id: noteArgsObj.noteId,
      basicClassNames: ['note'],
      additionalClassNames: [getBgColorClass(noteArgsObj.bgColor) ?? ''],
    });

    this.#noteState = noteArgsObj;
    this._element.innerHTML = this.#getNoteInnerHTML();
  }

  get noteState() {
    return this.#noteState;
  }

  get isEditorOpen() {
    return this.#isEditorOpen;
  }

  toggleFavorite() {
    this.#noteState.isFavorite = !this.#noteState.isFavorite;

    appStorage.updateNote(this.#noteState);
    this.updateNoteElement();
  }

  startNoteEditing() {
    this.#isEditorOpen = true;
    this._element.innerHTML = this.#getNoteEditorInnerHTML();
    this.#makeNoteEditorInteractive(this.element);
  }

  endNoteEditing() {
    this.updateNoteElement();
    this.#isEditorOpen = false;
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

  updateNoteState(newState, isDateUpdateNeeded = false) {
    const newNoteState = {...this.#noteState, ...newState};

    this.#noteState = isDateUpdateNeeded
      ? {...newNoteState, isUpdated: true, date: getNoteDateString()}
      : newNoteState;

    appStorage.updateNote(this.#noteState);
  }

  #getNoteInnerHTML() {
    return `
      <div class="note__text-content">
        <h3 class="note__title">${this.#noteState.noteTitle}</h3>
        <p class="note__description">${this.#noteState.noteDescription}</p>
        <p class="note__date">${this.#noteState.isUpdated ? 'Updated: ' : ''} ${this.#noteState.date} </p>
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
          <span class="note__button-icon note__button-icon--delete material-icons" title="delete note">delete_forever</span>
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
    const form = getElementBySelector('.note__editor-form');
    const titleInput = getElementBySelector('.note-title-input');
    const descriptionInput = getElementBySelector('.note-description-input');
    const submitButton = getElementBySelector('.form-submit-button');
    const closeButton = getElementBySelector('.note__button--close-button');

    titleInput.addEventListener('input', () => makeElementValid(titleInput));
    descriptionInput.addEventListener('input', () => makeElementValid(titleInput));
    closeButton.addEventListener('click', () => this.endNoteEditing());
    submitButton.addEventListener('click', () => handleNoteEditorSubmitClick(this, form, titleInput, descriptionInput));

    form.addEventListener('submit', (e) => e.preventDefault());
    form.addEventListener('reset', (e) => e.preventDefault());
  }

}

export default Note;
