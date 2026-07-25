export interface PaddingProp {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  inline?: string;
  block?: string;
  blockStart?: string;
  blockEnd?: string;
  padding?: string;
}
export interface _keypadding {
  key?: React.Key;
  child: React.JSX.ElementType
}

export class _Padding {
  build? = ({ ...a }: PaddingProp & _keypadding): React.JSX.Element => {
    return (
      <>
        <div key={a.key} style={{ padding: "1rem", width: '100%', height: '100%', ...a }}>
            {a.child && <a.child />}
        </div>
      </>
    );
  };
}
