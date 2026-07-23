import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Text from './Text'

describe('Text', () => {
  it('renders text content with h1', () => {
    render(<Text text="Hello" type="h1" />)
    const el = screen.getByText('Hello')
    expect(el.tagName).toBe('H1')
  })

  it('renders text content with h2', () => {
    render(<Text text="Hello" type="h2" />)
    expect(screen.getByText('Hello').tagName).toBe('H2')
  })

  it('renders text content with h3', () => {
    render(<Text text="Hello" type="h3" />)
    expect(screen.getByText('Hello').tagName).toBe('H3')
  })

  it('renders text content with p', () => {
    render(<Text text="Hello" type="p" />)
    expect(screen.getByText('Hello').tagName).toBe('P')
  })

  it('renders text content with pre', () => {
    render(<Text text="Hello" type="pre" />)
    expect(screen.getByText('Hello').tagName).toBe('PRE')
  })

  it('applies size as fontSize', () => {
    render(<Text text="Hello" type="p" size="2rem" />)
    expect(screen.getByText('Hello')).toHaveStyle({ fontSize: '2rem' })
  })

  it('applies custom style', () => {
    render(<Text text="Hello" type="p" style={{ color: 'rgb(255, 0, 0)' }} />)
    expect(screen.getByText('Hello')).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  })

  it('applies className', () => {
    render(<Text text="Hello" type="p" className="my-text" />)
    expect(screen.getByText('Hello')).toHaveClass('my-text')
  })
})
