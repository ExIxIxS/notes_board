import { BG_NOTE_COLORS } from "../constants/appData.constants.js";

function getBgColorClass(colorCode) {
  const bgColor = BG_NOTE_COLORS.find((bgColor) => bgColor.colorCode === colorCode);
  if (bgColor) {
    return bgColor.colorClass;
  }
}

export { getBgColorClass };
