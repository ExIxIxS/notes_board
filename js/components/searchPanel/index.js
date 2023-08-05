import BasicComponent from "../basicComponents/basicComponent/index.js";
import NoteList from "../noteList/index.js";
import { checkIsObject } from "../../utils/componentFunctions.js";
import SingleInput from "../basicComponents/singleInput/index.js";

const DEFAULT_CLASS_LIST = ['search-panel'];

class SearchPanel extends BasicComponent {
  #noteListComponent = null;
  searchInputComponent = null;
  currentSearchQuery = '';

  constructor(argsObj = {}) {
    checkIsObject(argsObj);
    if (!(argsObj.noteList instanceof NoteList)) {
      throw new Error('noteListComponent should be passed in Search Panel constructor()');
    }

    const searchInput = new SingleInput({
      id: 'searchInput',
      basicClassNames: ['search-panel__text-input'],
      placeholder: 'find a note',
    });

    super({
      elementType: 'div',
      basicClassNames: DEFAULT_CLASS_LIST,
      additionalClassNames: argsObj?.additionalClassNames,
      children: [searchInput],
    })

    this.#noteListComponent = argsObj.noteList;
    this.searchInputComponent = searchInput;

    this.#makeSearchPanelInteractive();
  }

  #makeSearchPanelInteractive() {
    this.searchInputComponent.element.addEventListener('input', this.handleSearchInput.bind(this));
  }

  handleSearchInput() {
    const SEARCH_DELAY = 1000;

    setTimeout(() => {
      const searchQuery = this.searchInputComponent.element.value;
      if (searchQuery !== this.currentSearchQuery) {
        this.currentSearchQuery = searchQuery;
        this.searchNotes();
      }

    }, SEARCH_DELAY)
  }

  searchNotes() {
    const searchQuery = this.currentSearchQuery;

    this.#noteListComponent.filterNotes(searchQuery);
  }

}

export default SearchPanel;
