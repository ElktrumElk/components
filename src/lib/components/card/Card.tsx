import { useRef } from "react"
import { _Card, type CardProp } from "./cardClass"

const InitializeCard = () => {
  const _card = useRef<_Card>(null)

  if (!_card.current) {
    _card.current = new _Card()
  }

  return { _card }
}

export default function Card({ ...a }: CardProp) {
  const { _card } = InitializeCard()
  a?.onFunc?.(_card?.current as _Card)
  return _card.current?.build?.({ ...a })
}
