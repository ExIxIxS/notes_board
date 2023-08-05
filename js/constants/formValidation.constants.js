const noteTitleField = {
  MIN_LENGTH: 5,
  MAX_LENGTH: 15,
}

const noteDescriptionField = {
  MIN_LENGTH: 5,
  MAX_LENGTH: 100,
}

export const [
  NOTE_TITLE_REQUIREMENT,
  NOTE_DESCRIPTION_REQUIREMENT,
] = [noteTitleField, noteDescriptionField].map((obj) => Object.freeze(obj))
