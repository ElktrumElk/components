
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import GridView from "./GridView";

describe('GridView component', () => {
    it('it display should be grid', () => {
        const {container} = render(<GridView child={() => <></>}/>)
        const div = container.querySelector('div')
        expect(div).toHaveStyle({display: 'grid'})
    })
    // it('it display should have at least one child', () => {
    //     const {container} = render(<GridView child={() => <><div></div></>}/>)
    //     expect(container).toHaveProperty('child')
    // })
    it('it should fill it parent by default', () => {
        const {container} = render(<GridView child={() => <></>}/>)
        const div = container.querySelector('div')
        expect(div).toHaveStyle({width: '100%', height: '100%'})
    })
})