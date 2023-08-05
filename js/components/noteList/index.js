import appStorage from "../../services/appStorage.service.js";
import BasicComponent from "../basicComponent/index.js";
import Note from "../note/index.js";

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
    const notes = appStorage.storageNotelist.map((storageNote) => {
      return new Note(storageNote);
    })

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
    switch(true) {
      case (targetClassList.contains('note_favorite-button')
        || targetClassList.contains('note_favorite-button-icon')): {

        const buttonElement = (targetClassList.contains('note_favorite-button'))
          ? target
          : target.parentElement;

        const noteComponent = this.getNoteComponentByButton(buttonElement);

        if (noteComponent) {
          noteComponent.toggleFavorite();
        }

        break;
      }
      case (targetClassList.contains('note_edit-button')): {
        const noteComponent = this.getNoteComponentByButton(target);

        if (noteComponent) {
          noteComponent.startNoteEditing();
        }

        break;
      }
      case (targetClassList.contains('note_delete-button')): {
        const noteComponent = this.getNoteComponentByButton(target);

        if (noteComponent) {
          noteComponent.deleteNote();
        }

        break;
      }

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

}

function getNoteByButton(buttonElement) {
  return buttonElement.parentElement.parentElement;
}

export default NoteList;
