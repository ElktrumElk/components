import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Icon from './Icon'

const MockSvg = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg data-testid="mock-svg" width={size} height={size}>
    <circle cx="12" cy="12" r="10" fill={color} />
  </svg>
)

describe('Icon', () => {
  it('renders the icon component', () => {
    render(<Icon icon={MockSvg} />)
    expect(screen.getByTestId('mock-svg')).toBeInTheDocument()
  })

  it('wraps icon in a span', () => {
    const { container } = render(<Icon icon={MockSvg} />)
    const span = container.querySelector('span')
    expect(span).toBeInTheDocument()
    expect(span?.tagName).toBe('SPAN')
  })

  it('applies default md size (24)', () => {
    render(<Icon icon={MockSvg} />)
    const svg = screen.getByTestId('mock-svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('applies xs size (12)', () => {
    render(<Icon icon={MockSvg} size="xs" />)
    const svg = screen.getByTestId('mock-svg')
    expect(svg).toHaveAttribute('width', '12')
    expect(svg).toHaveAttribute('height', '12')
  })

  it('applies sm size (16)', () => {
    render(<Icon icon={MockSvg} size="sm" />)
    const svg = screen.getByTestId('mock-svg')
    expect(svg).toHaveAttribute('width', '16')
    expect(svg).toHaveAttribute('height', '16')
  })

  it('applies lg size (32)', () => {
    render(<Icon icon={MockSvg} size="lg" />)
    const svg = screen.getByTestId('mock-svg')
    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('applies xl size (48)', () => {
    render(<Icon icon={MockSvg} size="xl" />)
    const svg = screen.getByTestId('mock-svg')
    expect(svg).toHaveAttribute('width', '48')
    expect(svg).toHaveAttribute('height', '48')
  })

  it('applies numeric size directly', () => {
    render(<Icon icon={MockSvg} size={40} />)
    const svg = screen.getByTestId('mock-svg')
    expect(svg).toHaveAttribute('width', '40')
    expect(svg).toHaveAttribute('height', '40')
  })

  it('passes color to icon', () => {
    render(<Icon icon={MockSvg} color="red" />)
    const svg = screen.getByTestId('mock-svg')
    expect(svg.querySelector('circle')).toHaveAttribute('fill', 'red')
  })

  it('applies className to wrapper span', () => {
    const { container } = render(<Icon icon={MockSvg} className="my-icon" />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('my-icon')
  })

  it('applies custom style to wrapper span', () => {
    const { container } = render(<Icon icon={MockSvg} style={{ opacity: 0.5 }} />)
    const span = container.querySelector('span')
    expect(span).toHaveStyle({ opacity: 0.5 })
  })

  it('applies inline-flex centering styles', () => {
    const { container } = render(<Icon icon={MockSvg} />)
    const span = container.querySelector('span')
    expect(span).toHaveStyle({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    })
  })

  it('calls onFunc with class instance', () => {
    const onFunc = vi.fn()
    render(<Icon icon={MockSvg} onFunc={onFunc} />)
    expect(onFunc).toHaveBeenCalledWith(expect.objectContaining({ build: expect.any(Function) }))
  })
})
