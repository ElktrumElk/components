import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ListMenu from './ListMenu'

describe('ListMenu', () => {
  it('renders child content', () => {
    render(<ListMenu child={() => <span>Menu Item</span>} />)
    expect(screen.getByText('Menu Item')).toBeInTheDocument()
  })

  it('renders via a div (Stack)', () => {
    const { container } = render(<ListMenu child={() => <span />} />)
    const div = container.querySelector('div > div')
    expect(div).toBeInTheDocument()
  })

  it('applies gap', () => {
    const { container } = render(<ListMenu gap="1rem" child={() => <span />} />)
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ gap: '1rem' })
  })

  it('applies className', () => {
    const { container } = render(<ListMenu className="my-menu" child={() => <span />} />)
    expect(container.querySelector('.my-menu')).toBeInTheDocument()
  })

  it('applies custom style', () => {
    const { container } = render(
      <ListMenu style={{ background: 'rgb(0, 0, 255)' }} child={() => <span />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ background: 'rgb(0, 0, 255)' })
  })
})
