import { useRef } from "react";
import { _TextButton, type _TextButtonProp } from "./textButtonClass";

const InitializeTextButton = () => {
  const _textButton = useRef<_TextButton | null>(null);

  if (!_textButton.current) {
    _textButton.current = new _TextButton();
  }

  return { _textButton };
}

/**
 * TextButton component renders a button with text or custom child content.
 * @example
 * <TextButton text="Click me" color="blue" hoverColor="red" />
 * @see _TextButtonProp
 * @prop child - Optional React element type to render as button content.
 * @prop text - Optional text content if child is not provided.
 * @prop color - Text color (default: "inherit").
 * @prop hoverColor - Text color on hover.
 * @prop activeColor - Text color when active.
 * @prop fontSize - Font size.
 * @prop padding - Padding (default: "0").
 * @prop className - Optional CSS class name.
 * @prop style - Optional inline CSS styles.
 * @prop gest - Optional HTML button attributes.
 * @prop onFunc - Callback receiving the _TextButton instance.
 */
export default function TextButton({ ...a }: _TextButtonProp) {
  const { _textButton } = InitializeTextButton();
  a?.onFunc?.(_textButton?.current as _TextButton);
  return _textButton.current?.build?.({ ...a });
}
