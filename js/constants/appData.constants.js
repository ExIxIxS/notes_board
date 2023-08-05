const bgNoteColors = [
  { colorCode: '2a599d', alias: 'Endeavour'},
  { colorCode: 'de2626', alias: 'Persian Red'},
  { colorCode: 'eeb9d7', alias: 'Lavender Pink'},
  { colorCode: '9ac157', alias: 'Olivine'},
  { colorCode: '62b7e0', alias: 'Malibu'},
]

bgNoteColors.forEach((bgColor) => {
  bgColor.colorCode = bgColor.colorCode.toLowerCase();
  bgColor.colorClass = `bg-color-${bgColor.colorCode}`;
})

const BG_NOTE_COLORS = Object.freeze(bgNoteColors);

export {
  BG_NOTE_COLORS,
}