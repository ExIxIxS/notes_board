import Note from "../components/note/index.js";
import { getNoteDateString } from "../utils/dateHandling.js";

class AppStorage {
  constructor(storageName) {
    this.storageName = storageName;
  }

  get storageNoteListName() {
    return this.storageName + '_noteList';
  }

  get storageNotelist() {
    const storageNoteList = localStorage.getItem(this.storageNoteListName);

    return storageNoteList ? JSON.parse(storageNoteList) : [];
  }

  get #storageNoteIds() {
    return this.storageNotelist.map((note) => note.noteId);
  }

  getNoteComponents() {
    return this.storageNotelist.map((storageNote) => {
      return new Note(storageNote);
    })
  };

  addNote(storageNote) {
    const storageNoteList = this.storageNotelist;

    storageNoteList.push(storageNote);
    this.#setStorageNoteList(storageNoteList);
  }

  updateNote(updatedStorageNote) {
    const noteIndex = this.#findNoteIndexById(updatedStorageNote.noteId);

    if (noteIndex >=0) {
      const currentNoteList = this.storageNotelist;
      currentNoteList[noteIndex] = updatedStorageNote;
      this.#setStorageNoteList(currentNoteList);
    }
  }

  deleteNote(noteId) {
    const noteIndex = this.#findNoteIndexById(noteId);

    if (noteIndex >=0) {
      const currentNoteList = this.storageNotelist;

      currentNoteList.splice([noteIndex], 1);
      this.#setStorageNoteList(currentNoteList);
    }
  }

  #findNoteIndexById(noteId) {
    return this.storageNotelist
      .findIndex((storageNote) => storageNote.noteId === noteId);
  }

  #setStorageNoteList(storageNoteList) {
    const storageNoteListString = JSON.stringify(storageNoteList);
    localStorage.setItem(this.storageNoteListName, storageNoteListString);
  }

  createStorageNote(noteFormData) {
    const creationDate = new Date();

    return {
      ...noteFormData,
      noteId: this.#getNewNoteId(),
      date: getNoteDateString(creationDate),
      isUpdated: false,
      isFavorite: false,
    }
  }

  #getNewNoteId() {
    const newId = this.#generateRandomStorageId();

    return (!this.#storageNoteIds.includes(newId)) ? `note#${newId}` : this.#getNewNoteId;
  }

  #generateRandomStorageId() {
    const ID_LENGTH = 8;
    const newId = Math.random() * (10 ** ID_LENGTH);
    const idString = newId.toFixed();

    return idString;
  }
}

const appStorage = new AppStorage('noteManager');

export default appStorage;