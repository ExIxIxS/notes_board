import appStorage from "../../services/appStorage.service.js";
import { checkIsObject } from "../../utils/componentFunctions.js";
import BasicComponent from "../basicComponent/index.js";
import appDialog from "../dialog/index.js";

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
  #noteArgs;

  constructor(noteArgsObj) {
    checkIsObject(noteArgsObj);

    super({
      elementType: 'div',
      id: noteArgsObj.noteId,
      basicClassNames: ['note'],
      additionlClassNames: [noteArgsObj.bgColor],
      innerHTML: getNoteInnerHTML(noteArgsObj),
    });

    this.#noteArgs = noteArgsObj;
  }

  toggleFavorite() {
    this.#noteArgs.isFavorite = !this.#noteArgs.isFavorite;

    appStorage.updateNote(this.#noteArgs);
    this.updateNoteElement();
  }

  startNoteEditing() {
    console.log('start edition');
  }

  updateNoteElement() {
    this.element.innerHTML = getNoteInnerHTML(this.#noteArgs);
  }

  deleteNote() {
    console.log('delete note!');
    const message = `Are you sure want to delete this note: "${this.#noteArgs.noteTitle}"?`;
    const deleteCallback = () => {
      appStorage.deleteNote(this.#noteArgs.noteId);
      this.element.remove();
    };

    appDialog.openDialog(message, deleteCallback);
  }

}

function getNoteInnerHTML(noteArgsObj) {
  return `
    <div class="note_text-content">
      <h2 class="note_title">${noteArgsObj.noteTitle}</h2>
      <p class="note_description">${noteArgsObj.noteDescription}</p>
      <p class="note_date">${noteArgsObj.date} ${noteArgsObj.isUpdated ? 'Updated' : ''}</p>
    </div>
    <div class="note_buttons">
      <button class="note_favorite-button">
        ${noteArgsObj.isFavorite
          ? '<span class="note_favorite-button-icon material-icons star" title="remove from favorite">star</span>'
          : '<span class="note_favorite-button-icon material-icons star_outline" title="add to favorite">star_outline</span>'
        }
      </button>
      <button class="note_edit-button">Edit</button>
      <button class="note_delete-button">Delete</button>
    </div>
  `;
}

export default Note;
