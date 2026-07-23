import { useRef } from "react";
import { _TextButton, type _TextButtonProp } from "./textButtonClass";

const InitializeTextButton = () => {
  const _textButton = useRef<_TextButton | null>(null);

  if (!_textButton.current) {
    _textButton.current = new _TextButton();
  }

  return { _textButton };
}

export default function TextButton({ ...a }: _TextButtonProp) {
  const { _textButton } = InitializeTextButton();
  a?.onFunc?.(_textButton?.current as _TextButton);
  return _textButton.current?.build?.({ ...a });
}
