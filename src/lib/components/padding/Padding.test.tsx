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
        expect(div).toHaveStyle({Padding: '1rem'})
    })
    
})