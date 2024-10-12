import BasicComponent from "../basicComponents/basicComponent/index.js";
import { isNonEmptyString } from "../../utils/componentFunctions.js";

class Dialog extends BasicComponent {
  #currentConfirmCallback;

  constructor() {
    super({
      elementType: 'div',
      id: 'app-dialog',
      basicClassNames: ['dialog'],
      additionalClassNames: ['dialog--closed'],
    });

    this.element.addEventListener('click', this.handleDialogClick.bind(this));
  }

  handleDialogClick(e) {
    const target = e.target;
    const currentTarget = e.currentTarget;
    const targetClassList = target.classList;
    const currentTargetClassList = currentTarget.classList;

    switch(true) {
      case (targetClassList === currentTargetClassList):
      case (targetClassList.contains('dialog__close-button')):
         {
        this.closeDialog();
        break;
      }
      case (targetClassList.contains('dialog__submit-button')): {
        this.confirmDialog();
        break;
      }
    }
  }

  openDialog(message, confirmCallback) {
    this.#currentConfirmCallback = typeof(confirmCallback) === 'function'
      ? confirmCallback
      : null;

    this.element.innerHTML = this.#getDialogInnerHTML(message);
    this.element.classList.remove('dialog--closed');
  }

  closeDialog() {
    this.element.classList.add('dialog--closed');
    this.#currentConfirmCallback = null;
    this.element.innerHTML = '';
  }

  confirmDialog() {
    if (this.#currentConfirmCallback) {
      this.#currentConfirmCallback();
    }

    this.closeDialog();
  }

  #getDialogInnerHTML(message) {
    return `
      <div class="dialog__window">
        <div class="dialog__content">
          <p class="note_description">${isNonEmptyString(message) ? message : 'Are you sure?'}</p>
        </div>
        <div class="dialog__buttons">
          <button class="dialog__submit-button">Yes</button>
          <button class="dialog__close-button">No</button>
        </div>
      </div>
    `;
}

}

const appDialog = new Dialog();

export default appDialog;
