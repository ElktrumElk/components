import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ListView from './ListView'

describe('ListView', () => {
  it('renders child content', () => {
    render(<ListView child={() => <li>Item</li>} />)
    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('renders as a ul element', () => {
    const { container } = render(<ListView child={() => <li />} />)
    const ul = container.querySelector('ul')
    expect(ul).toBeInTheDocument()
  })

  it('applies padding and margin', () => {
    const { container } = render(<ListView padding="1rem" margin="0 auto" child={() => <li />} />)
    const ul = container.querySelector('ul')
    expect(ul).toHaveStyle({ padding: '1rem', margin: '0 auto' })
  })

  it('applies gap', () => {
    const { container } = render(<ListView gap="0.5rem" child={() => <li />} />)
    const ul = container.querySelector('ul')
    expect(ul).toHaveStyle({ gap: '0.5rem' })
  })

  it('applies custom className and style', () => {
    const { container } = render(
      <ListView className="my-list" style={{ background: 'rgb(0, 0, 255)' }} child={() => <li />} />
    )
    const ul = container.querySelector('ul')
    expect(ul).toHaveClass('my-list')
    expect(ul).toHaveStyle({ background: 'rgb(0, 0, 255)' })
  })
})
