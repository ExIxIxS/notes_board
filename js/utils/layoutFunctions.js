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
      const navPanel = new NavPanel({currentPage: 'favorites'});
      const noteList = new NoteList(null, true);
      const searchPanel = new SearchPanel({noteList: noteList});
      const header = new Header({
        children: [navPanel, searchPanel],
        additionalClassNames: ['favorites-page-header']
      });

      layoutComponents.push(...[
        appDialog,
        header,
        noteList,
      ])

      break;
    }
    case ('main'):
    default: {
      const noteList = new NoteList();
      const navPanel = new NavPanel({currentPage: 'main'});
      const searchPanel = new SearchPanel({noteList: noteList});
      const noteCreator = new NoteCreatorForm({noteList: noteList});
      const header = new Header({
        children: [navPanel, searchPanel],
        additionalClassNames: ['main-page-header']
      });

      layoutComponents.push(...[
        appDialog,
        header,
        noteCreator,
        noteList,
      ])

      break;
    }
  }

  return layoutComponents
    .map((component) => component.element);
}

export { getLayout };
