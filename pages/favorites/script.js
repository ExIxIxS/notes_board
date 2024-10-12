import { getLayout } from "../../js/utils/layoutFunctions.js";

const favoritesPageLayout = getLayout('favorites');

document.body.prepend(...favoritesPageLayout);
