import BasicComponent from "../basicComponents/basicComponent/index.js";
import Note from "../note/index.js";
import appStorage from "../../services/appStorage.service.js";

import { loadCSS } from "../../utils/cssFunctions.js";

loadCSS('./js/components/noteList/noteList.css');

/*
bgColor:"green"
date: "12:25 17.05.2023"
isFavorite: false
isUpdated: false
noteDescription: "Dfdffdfdf"
noteId: 35697347
noteTitle: "Johcn"
*/

class NoteList extends BasicComponent {
  constructor() {
    const notes = appStorage.getNoteComponents();

    super({
      elementType: 'div',
      basicClassNames: ['note-list'],
      children: notes,
    });

    this.noteListChildren = notes;
    this.element.addEventListener('click', this.handleNoteListClick.bind(this));
  }

  handleNoteListClick(e) {
    const target = e.target;
    const targetClassList = e.target.classList;

    if (!targetClassList.contains('note__button')
      && !targetClassList.contains('note__button-icon')) {
        return;
      }

    switch(true) {
      case (targetClassList.contains('note__button--favorite-button')):
      case (targetClassList.contains('note__button-icon--favorite')): {
        const noteComponent = this.getNoteComponentByButtonOrChild(target);

        if (noteComponent) {
          noteComponent.toggleFavorite();
        }

        break;
      }
      case (targetClassList.contains('note__button--edit-button')):
      case (targetClassList.contains('note__button-icon--edit')): {
        const noteComponent = this.getNoteComponentByButtonOrChild(target);

        if (noteComponent) {
          noteComponent.startNoteEditing();
        }

        break;
      }
      case (targetClassList.contains('note__button--delete-button')):
      case (targetClassList.contains('note__button-icon--delete')): {
        const noteComponent = this.getNoteComponentByButtonOrChild(target);

        if (noteComponent) {
          noteComponent.deleteNote(() => this.deleteNoteFromList(noteComponent));
        }

        break;
      }

    }
  }

  updateNoteList() {
    console.log('Update list');
    const newElementChildren = new NoteList()
      .element
      .querySelectorAll('.note');

    this.element.innerHTML = '';
    this.element.append(...newElementChildren)
  }

  addNoteToList(storageNoteData) {
    const newNote = new Note(storageNoteData);
    this.noteListChildren.push(newNote);
    this.element.append(newNote.element);
  }

  deleteNoteFromList(noteComponent) {
    const noteIndex = this.noteListChildren.findIndex((component) => {
      return component.element.id === noteComponent.element.id;
    });

    if (noteIndex >= 0) {
      this.noteListChildren.splice(noteIndex, 1);
    } else {
      throw new Error('Note not found!');
    }
  }

  getNoteComponentById(id) {
    const noteComponent = this.noteListChildren.find((noteComponent) => {
      return noteComponent.element.id === id;
    })

    if (noteComponent) {
      return noteComponent;
    }
  }

  getNoteComponentByButton(buttonElement) {
    const noteId = getNoteByButton(buttonElement).id;
    return this.getNoteComponentById(noteId);
  }

  getNoteComponentByButtonOrChild(element) {
    const classList = element.classList;
    const buttonElement = (classList.contains('note__button'))
    ? element
    : element.parentElement;

    return this.getNoteComponentByButton(buttonElement);
  }

}

function getNoteByButton(buttonElement) {
  return buttonElement.parentElement.parentElement;
}

export default NoteList;
