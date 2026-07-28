import { useRef } from "react"
import { _Card, type CardProp } from "./cardClass"

const InitializeCard = () => {
  const _card = useRef<_Card>(null)

  if (!_card.current) {
    _card.current = new _Card()
  }

  return { _card }
}


/**
 * A styled card container with optional header, body, and footer sections.
 *
 * @example
 * <Card
 *   header={HeaderComp}
 *   body={BodyComp}
 *   footer={FooterComp}
 *   padding="lg"
 *   radius="lg"
 *   shadow
 *   width="20rem"
 *   height="auto"
 * />
 *
 * @see {@link CardProp} for all available props.
 *
 * @param header  - Component rendered in the card header.
 * @param body    - Component rendered in the card body.
 * @param footer  - Component rendered in the card footer.
 * @param padding - Inner padding size (`'none' | 'sm' | 'md' | 'lg'`).
 * @param radius  - Border radius size (`'none' | 'sm' | 'md' | 'lg' | 'xl'`).
 * @param backgroundColor - Background color of the card.
 * @param borderColor     - Border and divider color.
 * @param width           - CSS width.
 * @param height          - CSS height.
 * @param shadow          - Enable box shadow.
 * @param shadowColor     - Box shadow color.
 * @param className       - Additional CSS class name(s).
 * @param style           - Inline CSS styles.
 * @param gest            - Native HTML div attributes forwarded to the root element.
 * @param onFunc          - Callback with the internal `_Card` instance.
 */
export default function Card({ ...a }: CardProp) {
  const { _card } = InitializeCard()
  a?.onFunc?.(_card?.current as _Card)
  return _card.current?.build?.({ ...a })
}
