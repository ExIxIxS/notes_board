import Header from "./js/components/header/index.js";
import NoteCreator from "./js/components/noteCreator/index.js";

const header = new Header({additionalClassNames: ['main-page-header']});
const noteCreator = new NoteCreator();

const mainPageLayout = [
  header,
  noteCreator
].map((component) => component.element);

document.body.prepend(...mainPageLayout);
