import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Tiles from './Tiles'

const Leading = () => <div>leading</div>
const Title = () => <div>title text</div>
const Subtitle = () => <div>subtitle text</div>
const Trailing = () => <div>trailing</div>

describe('Tiles', () => {
  it('renders a flex container', () => {
    const { container } = render(<Tiles />)
    const root = container.firstElementChild as HTMLElement
    expect(root).toHaveStyle({ display: 'flex', alignItems: 'center' })
  })

  it('applies default padding and gap', () => {
    const { container } = render(<Tiles />)
    const root = container.firstElementChild as HTMLElement
    expect(root).toHaveStyle({ padding: '.75rem 1rem', gap: '.75rem' })
  })

  it('renders all sections when provided', () => {
    render(
      <Tiles leading={Leading} title={Title} subtitle={Subtitle} trailing={Trailing} />
    )
    expect(screen.getByText('leading')).toBeInTheDocument()
    expect(screen.getByText('title text')).toBeInTheDocument()
    expect(screen.getByText('subtitle text')).toBeInTheDocument()
    expect(screen.getByText('trailing')).toBeInTheDocument()
  })

  it('renders only title when only title is provided', () => {
    render(<Tiles title={Title} />)
    expect(screen.getByText('title text')).toBeInTheDocument()
    expect(screen.queryByText('leading')).not.toBeInTheDocument()
    expect(screen.queryByText('trailing')).not.toBeInTheDocument()
  })

  it('applies custom padding, gap, and borderBottom', () => {
    const { container } = render(
      <Tiles padding="12px" gap="8px" borderBottom="1px solid gray" />
    )
    const root = container.firstElementChild as HTMLElement
    expect(root).toHaveStyle({ padding: '12px', gap: '8px' })
    const style = root.getAttribute('style')!
    expect(style).toContain('border-bottom: 1px solid gray')
  })
})
