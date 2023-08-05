import { checkFormForValidData, isFormValid } from "./formValidation.js";

function makeNoteCreatorInteractive(elementsGetter, form) {
  const noteTitleInput = elementsGetter('#note-title');
  noteTitleInput.addEventListener('input', () => makeElementValid(noteTitleInput));

  const noteDescriptionInput = elementsGetter('#note-description');
  noteDescriptionInput.addEventListener('input', () => makeElementValid(noteDescriptionInput));

  const bgColorRadioInput_1 = elementsGetter('#bg-color-option-1');
  bgColorRadioInput_1.addEventListener('input', () => makeElementValid(bgColorRadioInput_1.parentElement.parentElement));

  const bgColorRadioInput_2 = elementsGetter('#bg-color-option-2');
  bgColorRadioInput_2.addEventListener('input', () => makeElementValid(bgColorRadioInput_2.parentElement.parentElement));

  const submitButton = elementsGetter('#create-note-submit-button');
  submitButton.addEventListener('click', () => handleSubmitClick(elementsGetter,form));


  form.addEventListener('submit', (event) => {
    event.preventDefault;
    handleSubmitClick(elementsGetter, form);
  });
  form.addEventListener('reset', resetForm);
}

function submitForm(elementsGetter) {
  const noteFormData = getNoteFormData(elementsGetter);
  console.log(noteFormData);
  clearNoteFormInputs(elementsGetter);

  //localStorage.setItem('notesList', JSON.stringify([])); //cart is empty now
  console.log('Submited!!!');
}

function resetForm(event) {
  event.preventDefault();
}

function handleSubmitClick(elementsGetter, form) {
  checkFormForValidData(elementsGetter);
  if (isFormValid(form)) {
    submitForm(elementsGetter);
  }
}

function makeElementInvalid(element) {
  if (!element.classList.contains('invalid')) {
    element.classList.remove('valid');
    element.classList.add('invalid');
  }
}

function makeElementValid(element) {
  element.classList.add('valid');
  if (element.classList.contains('invalid')) {
    element.classList.remove('invalid');
  }
}

function getNoteFormData(elementsGetter) {
  const noteFormData = {};
  noteFormData.noteTitle = elementsGetter('#note-title').value;
  noteFormData.noteDescription = elementsGetter('#note-description').value;
  const radioInputs = elementsGetter('#color-fieldset').querySelectorAll('input');

  for (let input of radioInputs) {
      if (input.checked === true) {
        noteFormData.bgColor = input.value;
      }
  }

  return noteFormData;
}

function clearNoteFormInputs(elementsGetter) {
  elementsGetter('#note-title').value = '';
  elementsGetter('#note-description').value = '';
  const radioInputs = elementsGetter('#color-fieldset').querySelectorAll('input');

  for (let input of radioInputs) {
    input.checked === false;
  }

  elementsGetter('#bg-color-option-1').checked = true;
}

export {
  makeNoteCreatorInteractive,
  makeElementValid,
  makeElementInvalid,
};
