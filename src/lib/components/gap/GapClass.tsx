export interface GapProp {
  width?: string;
  height?: string;
  flex?: string;
}


export class _Gap {
  build? = ({ ...a }: GapProp): React.JSX.Element => {
    return <div style={{ ...a }}></div>;
  };
}
