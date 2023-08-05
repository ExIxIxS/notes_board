const bgNoteColors = [
  { colorCode: 'FF99C8', alias: '1'},
  { colorCode: 'FCF6BD', alias: '2'},
  { colorCode: 'D0F4DE', alias: '3'},
  { colorCode: 'A9DEF9', alias: '4'},
  { colorCode: 'E4C1F9', alias: '5'},
]

bgNoteColors.forEach((bgColor) => {
  bgColor.colorCode = bgColor.colorCode.toLowerCase();
  bgColor.colorClass = `bg-color-${bgColor.colorCode}`;
})

const BG_NOTE_COLORS = Object.freeze(bgNoteColors);

export {
  BG_NOTE_COLORS,
}