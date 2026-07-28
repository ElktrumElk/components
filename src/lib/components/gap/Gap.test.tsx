
import { describe, it, expect} from 'vitest'
import { render} from '@testing-library/react'
import Gap from './Gap'

describe('Gap', () => {
    it('should give width', () => {
        const {container} = render(<Gap width='100%'/>)
        const div = container.querySelector('div')
        expect(div).toHaveStyle({width: '100%'})
    })

    it('Should give a height', () => {
        const {container} = render(<Gap height='10px'/>)
        const div = container.querySelector('div')
        
        expect(div).toHaveStyle({height: '10px'})
    })
})