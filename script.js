import appDialog from "./js/components/dialog/index.js";
import Header from "./js/components/header/index.js";
import NoteCreatorForm from "./js/components/noteCreatorForm/index.js";
import NoteList from "./js/components/noteList/index.js";
import SearchPanel from "./js/components/searchPanel/index.js";

const header = new Header({additionalClassNames: ['main-page-header']});
const noteList = new NoteList();
const searchPanel = new SearchPanel({noteList: noteList});
const noteCreator = new NoteCreatorForm({noteList: noteList});


const mainPageLayout = [
  appDialog,
  header,
  searchPanel,
  noteCreator,
  noteList,
].map((component) => component.element);

document.body.prepend(...mainPageLayout);
