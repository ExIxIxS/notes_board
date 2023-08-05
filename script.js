import { getLayout } from "./js/utils/layoutFunctions.js";

const mainPageLayout = getLayout('main');

document.body.prepend(...mainPageLayout);
