import appDialog from "./js/components/dialog/index.js";
import Header from "./js/components/header/index.js";
import NoteCreatorForm from "./js/components/noteCreatorForm/index.js";
import NoteList from "./js/components/noteList/index.js";

const header = new Header({additionalClassNames: ['main-page-header']});
const noteList = new NoteList();
const noteCreator = new NoteCreatorForm({noteList: noteList});


const mainPageLayout = [
  appDialog,
  header,
  noteCreator,
  noteList,
].map((component) => component.element);

document.body.prepend(...mainPageLayout);
