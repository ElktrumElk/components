import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Span from './Span'

const Label = () => <span>hello</span>

describe('Span', () => {
  it('renders a span element', () => {
    const { container } = render(<Span />)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('renders child component', () => {
    render(<Span child={Label} />)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('applies color and fontSize', () => {
    const { container } = render(
      <Span color="blue" fontSize="18px" />
    )
    const span = container.querySelector('span')!
    const style = span.getAttribute('style')!
    expect(style).toContain('color: blue')
    expect(style).toContain('font-size: 18px')
  })

  it('applies fontWeight, padding, and margin', () => {
    const { container } = render(
      <Span fontWeight="bold" padding="8px" margin="4px" />
    )
    const span = container.querySelector('span')!
    expect(span).toHaveStyle({ fontWeight: 'bold', padding: '8px', margin: '4px' })
  })

  it('does not render child text when no child prop is provided', () => {
    const { container } = render(<Span />)
    const span = container.querySelector('span')!
    expect(span).toBeEmptyDOMElement()
  })
})
