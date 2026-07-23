import type { ElementType } from "react";

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'

export interface InputProp {
  type?: InputType
  placeholder?: string
  value?: string
  disabled?: boolean
  readOnly?: boolean
  prefix?: React.JSX.ElementType
  suffix?: React.JSX.ElementType
  width?: string
  height?: string
  borderRadius?: string
  backgroundColor?: string
  color?: string
  borderColor?: string
  className?: string
  style?: React.CSSProperties
  gest?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
  onFunc?: (self: _Input) => void
}

export class _Input {
  prefix!: ElementType
  suffix!: ElementType

  build? = ({ ...a }: InputProp): React.JSX.Element => {
    this.prefix = a.prefix as ElementType
    this.suffix = a.suffix as ElementType

    const baseStyle: React.CSSProperties = {
      width: a.width || '100%',
      height: a.height || '2.5rem',
      padding: '0 .75rem',
      border: `1px solid ${a.borderColor || 'rgba(255,255,255,0.15)'}`,
      borderRadius: a.borderRadius || '.5rem',
      backgroundColor: a.backgroundColor || 'transparent',
      color: a.color || 'inherit',
      fontSize: '.9rem',
      outline: 'none',
      transition: 'border-color .2s ease',
    }

    return (
      <>
        <div
          className={a.className}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: a.width || '100%',
            ...a.style,
          }}
        >
          {this.prefix && (
            <span style={{ display: 'flex', alignItems: 'center', paddingRight: '.5rem' }}>
              <this.prefix />
            </span>
          )}
          <input
            type={a.type || 'text'}
            placeholder={a.placeholder}
            defaultValue={a.value}
            disabled={a.disabled}
            readOnly={a.readOnly}
            style={baseStyle}
            {...a.gest}
          />
          {this.suffix && (
            <span style={{ display: 'flex', alignItems: 'center', paddingLeft: '.5rem' }}>
              <this.suffix />
            </span>
          )}
        </div>
      </>
    )
  }
}
