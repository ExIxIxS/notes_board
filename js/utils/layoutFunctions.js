import appDialog from "../components/dialog/index.js";
import Header from "../components/header/index.js";
import NavPanel from "../components/navPanel/index.js";
import NoteCreatorForm from "../components/noteCreatorForm/index.js";
import NoteList from "../components/noteList/index.js";
import SearchPanel from "../components/searchPanel/index.js";

function getLayout(pageName) {
  const layoutComponents = [];

  switch(pageName) {
    case ('favorites'): {
      const header = new Header({additionalClassNames: ['main-page-header']});
      const navPanel = new NavPanel({currentPage: 'favorites'});
      const noteList = new NoteList(null, true);
      const searchPanel = new SearchPanel({noteList: noteList});

      layoutComponents.push(...[
        appDialog,
        header,
        navPanel,
        searchPanel,
        noteList,
      ])

      break;
    }
    case ('main'):
    default: {
      const header = new Header({additionalClassNames: ['main-page-header']});
      const navPanel = new NavPanel({currentPage: 'main'});
      const noteList = new NoteList();
      const searchPanel = new SearchPanel({noteList: noteList});
      const noteCreator = new NoteCreatorForm({noteList: noteList});

      layoutComponents.push(...[
        appDialog,
        header,
        navPanel,
        searchPanel,
        noteCreator,
        noteList,
      ])

      break;
    }
  }

  return layoutComponents
    .map((component) => component.element);
}

export {
  getLayout,
}
