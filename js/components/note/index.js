import appStorage from "../../services/appStorage.service.js";
import { checkIsObject } from "../../utils/componentFunctions.js";
import BasicComponent from "../basicComponent/index.js";

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

    const noteInnerHTML = `
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
    `

    super({
      elementType: 'div',
      id: noteArgsObj.noteId,
      basicClassNames: ['note'],
      additionlClassNames: [noteArgsObj.bgColor],
      innerHTML: noteInnerHTML,
    });

    this.#noteArgs = noteArgsObj;

    console.log(noteArgsObj.noteId);
  }

  toggleFavorite() {
    this.#noteArgs.isFavorite = !this.#noteArgs.isFavorite;

    appStorage.updateNote(this.#noteArgs);
  }

  startNoteEditing() {
    console.log('start edition');
    this.element.innerHTML = `
    <div class="note_text-content">
    <p class="note_description">Edited!!!!</p>
  </div>
    `
  }

}

export default Note;
