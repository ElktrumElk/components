import { useRef } from "react";
import { _Example, type ExampleProp } from "./ExampleClass";

const InitializeExample = () => {
  const _example = useRef<_Example>(null);

  if (!_example.current) {
    _example.current = new _Example();
  }

  return { _example };
};

export default function Example({ ...a }: ExampleProp) {
  const { _example } = InitializeExample();
  a?.onFunc?.(_example?.current as _Example);
  return _example?.current?.build?.({ ...a });
}
