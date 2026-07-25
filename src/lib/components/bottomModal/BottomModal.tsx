import { useRef } from "react"
import { _BottomModal, type BottomModalProp } from "./bottomModalClass"

const InitializeBottomModal = () => {
  const _bottomModal = useRef<_BottomModal>(null)

  if (!_bottomModal.current) {
    _bottomModal.current = new _BottomModal()
  }

  return { _bottomModal }
}

/**
 * BottomModal component that renders a full-screen overlay with a bottom-anchored panel.
 *
 * Slides up from the bottom of the viewport with a draggable handle indicator.
 * Closes when the backdrop or handle is clicked. Renders nothing when isOpen is false.
 *
 * @example
 * <BottomModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   title={() => <h3>Sheet Title</h3>}
 *   child={() => <p>Modal content here.</p>}
 *   height="60vh"
 * />
 *
 * @example
 * // Minimal usage without title
 * <BottomModal
 *   isOpen={visible}
 *   onClose={handleClose}
 *   child={() => <SettingsPanel />}
 *   showHandle={true}
 * />
 *
 * @see bottomModalClass.tsx for the underlying _BottomModal class.
 *
 * @param child - Component type rendered as the modal body content.
 * @param title - Component type rendered as the modal title.
 * @param isOpen - Controls visibility; nothing renders when false.
 * @param onClose - Callback invoked when the overlay or handle is clicked.
 * @param height - Maximum height of the modal panel (default: "80vh").
 * @param padding - CSS padding for the panel interior (default: "1rem").
 * @param showHandle - Whether to display the drag-handle indicator (default: true).
 * @param backgroundColor - Backdrop overlay color (default: "rgba(0,0,0,0.8)").
 * @param className - Additional CSS class for the overlay element.
 * @param style - Custom inline styles for the overlay element.
 * @param onFunc - Callback receiving the _BottomModal instance after mount.
 */
export default function BottomModal({ ...a }: BottomModalProp) {
  const { _bottomModal } = InitializeBottomModal()
  a?.onFunc?.(_bottomModal?.current as _BottomModal)
  return _bottomModal.current?.build?.({ ...a })
}
