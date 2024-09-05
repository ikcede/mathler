import DialogProps from '../DialogProps';

/**
 * Use a mock Dialog for testing dialog interactions.
 *
 * This helps us avoid delayed closes like with MUI dialog close
 * animations, and makes it easier to test for state changes on
 * the dialog's parent component.
 */
const DialogMock = (props: DialogProps) =>
  props.open ? (
    <>
      <div data-testid="mock-dialog" role="dialog">
        Dialog
      </div>
      <button
        data-testid="mock-dialog-close"
        onClick={() => props.onClose()}
      >
        Close
      </button>
    </>
  ) : null;

export default DialogMock;
