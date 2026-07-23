import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Panel from './Panel'

const Child = () => <div>panel content</div>

describe('Panel', () => {
  it('renders a div element', () => {
    const { container } = render(<Panel />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders child component', () => {
    render(<Panel child={Child} />)
    expect(screen.getByText('panel content')).toBeInTheDocument()
  })

  it('applies default width of 100%', () => {
    const { container } = render(<Panel />)
    const div = container.querySelector('div')!
    expect(div).toHaveStyle({ width: '100%' })
  })

  it('applies custom width, height, and padding', () => {
    const { container } = render(
      <Panel width="200px" height="100px" padding="16px" />
    )
    const div = container.querySelector('div')!
    expect(div).toHaveStyle({
      width: '200px',
      height: '100px',
      padding: '16px',
    })
  })

  it('applies color, border, borderRadius, overflow, and margin', () => {
    const { container } = render(
      <Panel
        color="red"
        border="1px solid black"
        borderRadius="8px"
        overflow="hidden"
        margin="10px"
      />
    )
    const div = container.querySelector('div')!
    const style = div.getAttribute('style')!
    expect(style).toContain('background: red')
    expect(style).toContain('border: 1px solid black')
    expect(style).toContain('border-radius: 8px')
    expect(style).toContain('overflow: hidden')
    expect(style).toContain('margin: 10px')
  })
})
