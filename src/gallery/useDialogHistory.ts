import { useEffect, useRef } from 'react';

const MARKER = 'rdmDialog';
type DialogState = { [MARKER]?: boolean };

/**
 * Makes the back gesture close an open dialog instead of leaving the gallery.
 *
 * On a phone, back is how people dismiss anything that covers the screen, and a
 * dialog that ignores it takes them off the site altogether. Opening pushes one
 * history entry; going back closes the dialog, and closing it any other way
 * (Escape, the Close button) removes the entry again, so the visitor never has
 * to press back twice to leave a page they only visited once.
 *
 * Extracted rather than written twice: two copies of history juggling would be
 * two chances to leave a stray entry behind.
 */
export const useDialogHistory = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  // Read through a ref: a new closure each render must not push a second entry.
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    history.pushState({ [MARKER]: true } satisfies DialogState, '');
    const handlePop = () => close.current();
    addEventListener('popstate', handlePop);

    return () => {
      removeEventListener('popstate', handlePop);
      // If the entry is still ours, the dialog was closed some other way and the
      // entry has to go. If it is not, a back navigation already removed it.
      if ((history.state as DialogState | null)?.[MARKER]) history.back();
    };
  }, [open]);
};
