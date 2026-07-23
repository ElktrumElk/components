import { useRef } from "react"
import { _BottomModal, type BottomModalProp } from "./bottomModalClass"

const InitializeBottomModal = () => {
  const _bottomModal = useRef<_BottomModal>(null)

  if (!_bottomModal.current) {
    _bottomModal.current = new _BottomModal()
  }

  return { _bottomModal }
}

export default function BottomModal({ ...a }: BottomModalProp) {
  const { _bottomModal } = InitializeBottomModal()
  a?.onFunc?.(_bottomModal?.current as _BottomModal)
  return _bottomModal.current?.build?.({ ...a })
}
