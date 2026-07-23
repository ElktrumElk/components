import { useRef } from "react"
import { _ScrollView, type ScrollViewProp } from "./scrollViewClass"

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
