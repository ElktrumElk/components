import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Padding from "./Padding";
import { expect } from "vitest";

describe('Padding Component', () => {
    it ("It should fill it parent where width should be 100% and height 100%", () => {
        const {container} = render(<Padding child={()=> <></>}/>)

        const div = container.querySelector('div')
        expect(div).toHaveStyle({width: '100%', height: '100%'})
    })
     it ("It should have a padding around both side by default 1rem", () => {
        const {container} = render(<Padding child={()=> <></>}/>)
        const div = container.querySelector('div')
        expect(div).toHaveStyle({padding: '1rem'})
    })

    it('maps directional and logical props to CSS padding properties', () => {
        const {container} = render(
            <Padding
                child={() => <></>}
                left="1px"
                right="2px"
                top="3px"
                bottom="4px"
                inline="5px"
                block="6px"
                blockStart="7px"
                blockEnd="8px"
            />
        )
        expect(container.firstElementChild).toHaveStyle({
            paddingLeft: '1px',
            paddingRight: '2px',
            paddingTop: '3px',
            paddingBottom: '4px',
            paddingInline: '5px',
            paddingBlock: '6px',
            paddingBlockStart: '7px',
            paddingBlockEnd: '8px',
        })
    })
    
})
