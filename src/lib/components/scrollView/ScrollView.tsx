import { useRef } from "react"
import { _ScrollView, type ScrollViewProp } from "./scrollViewClass"

/**
 * ScrollView component that provides a scrollable container with configurable direction and optional hidden scrollbar.
 *
 * @example
 * <ScrollView
 *   child={() => <LongContent />}
 *   direction="vertical"
 *   height="400px"
 *   hideScrollbar={true}
 *   padding="1rem"
 * />
 *
 * @see {@link ScrollViewProp} for available props
 *
 * @param {ScrollViewProp} props - The scroll view configuration props
 * @param {React.JSX.ElementType} [props.child] - Child component to render
 * @param {'vertical' | 'horizontal' | 'both'} [props.direction] - Scroll direction
 * @param {string} [props.width] - Container width
 * @param {string} [props.height] - Container height
 * @param {string} [props.padding] - Inner padding
 * @param {boolean} [props.hideScrollbar] - Hide the scrollbar
 * @param {string} [props.className] - CSS class name
 * @param {React.CSSProperties} [props.style] - Inline styles
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} [props.gest] - HTML attributes
 * @param {(self: _ScrollView) => void} [props.onFunc] - Instance access callback
 */
const InitializeScrollView = () => {
  const _scrollView = useRef<_ScrollView>(null)

  if (!_scrollView.current) {
    _scrollView.current = new _ScrollView()
  }

  return { _scrollView }
}

export default function ScrollView({ ...a }: ScrollViewProp) {
  const { _scrollView } = InitializeScrollView()
  a?.onFunc?.(_scrollView?.current as _ScrollView)
  return _scrollView.current?.build?.({ ...a })
}
