import BasicComponent from "../basicComponents/basicComponent/index.js";
import Note from "../note/index.js";

import appStorage from "../../services/appStorage.service.js";
import { isNonEmptyString } from "../../utils/componentFunctions.js";

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
  #isFavoritesList;
  currentSearchQuery = '';

  constructor(noteComponents, isFavoritesList = false) {
    const allNotes = noteComponents ?? appStorage.getNoteComponents();
    const favoriteFilteredNotes = isFavoritesList
      ? allNotes.filter((noteComponent) => noteComponent.noteState.isFavorite)
      : allNotes;

    super({
      elementType: 'div',
      basicClassNames: isFavoritesList
        ? ['note-list', 'note-list--favorites']
        : ['note-list'],
      children: favoriteFilteredNotes,
    });

    this.#isFavoritesList = isFavoritesList;
    this.noteListChildren = favoriteFilteredNotes;

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
          if (this.#isFavoritesList) {
            this.filterNotes(this.currentSearchQuery);
          }
        }

        break;
      }
      case (targetClassList.contains('note__button--edit-button')):
      case (targetClassList.contains('note__button-icon--edit')): {
        const noteComponent = this.getNoteComponentByButtonOrChild(target);

        if (noteComponent) {
          this.closeAllNoteEditors();
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

  filterNotes(query) {
    const noteComponents = appStorage.getNoteComponents();

    if (isNonEmptyString(query)) {
      const filteredNoteComponents = noteComponents
        .filter((noteComponent) => {
          const noteTitle = noteComponent.noteState.noteTitle.toLowerCase();
          return noteTitle.includes(query.toLowerCase());
        });
      this.updateNoteList(filteredNoteComponents);
    } else {
      this.updateNoteList(noteComponents);
    }
  }

  closeAllNoteEditors() {
    this.noteListChildren.forEach((noteComponent) => {
      if (noteComponent.isEditorOpen) {
        noteComponent.endNoteEditing();
      }
    })
  }

  updateNoteList(noteComponents) {
    const notes = (this.#isFavoritesList)
      ? noteComponents.filter((noteComponent) => noteComponent.noteState.isFavorite)
      : noteComponents;

    const newNoteList = new NoteList(notes);
    const newNoteElements = newNoteList.element.querySelectorAll('.note');

    if (noteComponents) {
      this.noteListChildren = noteComponents;
    }

    this.element.innerHTML = '';
    this.element.append(...newNoteElements);
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
