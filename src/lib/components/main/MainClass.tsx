export interface MainProp {
  child: React.JSX.ElementType;
  style?: React.CSSProperties;
  className?: string;
  key?: React.Key
  onFunc?: (self: _Main) => void;
}

/**
 * Symantic
 */
export class _Main {
  build? = ({ ...a }: MainProp): React.JSX.Element => {
    return (
      <main key={a.key} className={a.className} style={{width: '100%', height: '100%',...a.style}}>
        <a.child />
      </main>
    );
  };
}
