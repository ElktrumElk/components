import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import List from './List'

const Item = () => <span>list item</span>

describe('List', () => {
  it('renders an li element', () => {
    const { container } = render(<List />)
    expect(container.querySelector('li')).toBeInTheDocument()
  })

  it('renders child component', () => {
    render(<List child={Item} />)
    expect(screen.getByText('list item')).toBeInTheDocument()
  })

  it('applies custom padding and margin', () => {
    const { container } = render(<List padding="10px" margin="5px" />)
    const li = container.querySelector('li')!
    expect(li).toHaveStyle({ padding: '10px', margin: '5px' })
  })

  it('applies className', () => {
    const { container } = render(<List className="custom" />)
    const li = container.querySelector('li')!
    expect(li).toHaveClass('custom')
  })

  it('does not render content when no child is provided', () => {
    const { container } = render(<List />)
    const li = container.querySelector('li')!
    expect(li).toBeEmptyDOMElement()
  })
})
