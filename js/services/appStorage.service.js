import { getNoteDateString } from "../utils/dateHandling.js";

class AppStorage {
  #storeIds = {};

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

  addNote(noteFormData) {
    const storageNote = this.#createStorageNote(noteFormData);
    const storageNoteList = this.storageNotelist;

    storageNoteList.push(storageNote);
    this.#setStorageNoteList(storageNoteList);
  }

  #setStorageNoteList(storageNoteList) {
    const storageNoteListString = JSON.stringify(storageNoteList);
    localStorage.setItem(this.storageNoteListName, storageNoteListString);
  }

  #createStorageNote(noteFormData) {
    const creationDate = new Date();

    return {
      ...noteFormData,
      noteId: '',
      date: getNoteDateString(creationDate),
      isUpdated: false,
      isFavorite: false,
    }
  }
}

const appStorage = new AppStorage('noteManager');

export default appStorage;