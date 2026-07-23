import type React from "react"

export interface _CenterProp {
    child: React.JSX.ElementType
}

export class _Center {

    // fixed define style behaviour
    private _style: React.CSSProperties = {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flex: 1
    }

    child!: React.JSX.ElementType
    
    build? = ({...a}: _CenterProp) => {
        this.child = a.child

        return (
            <>
                <div style={this._style}>
                    {a.child && <this.child />}
                </div>
            </>
        )
    }
}