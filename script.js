import Header from "./js/components/header/index.js";
import NoteCreatorForm from "./js/components/noteCreatorForm/index.js";

const header = new Header({additionalClassNames: ['main-page-header']});
const noteCreator = new NoteCreatorForm();

const mainPageLayout = [
  header,
  noteCreator
].map((component) => component.element);

document.body.prepend(...mainPageLayout);
