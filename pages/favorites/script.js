import appDialog from "../../js/components/dialog/index.js";
import Header from "../../js/components/header/index.js";
import NavPanel from "../../js/components/navPanel/index.js";
import NoteList from "../../js/components/noteList/index.js";
import SearchPanel from "../../js/components/searchPanel/index.js";

const header = new Header({additionalClassNames: ['main-page-header']});
const navPanel = new NavPanel({currentPage: 'favorites'});
const noteList = new NoteList();
const searchPanel = new SearchPanel({noteList: noteList});


const mainPageLayout = [
  appDialog,
  header,
  navPanel,
  searchPanel,
  noteList,
].map((component) => component.element);

document.body.prepend(...mainPageLayout);
