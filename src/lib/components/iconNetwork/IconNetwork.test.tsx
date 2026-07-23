import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import IconNetwork from './IconNetwork'

describe('IconNetwork', () => {
  it('renders an img element', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
  })

  it('applies src', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" />)
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('src', 'https://example.com/icon.png')
  })

  it('applies alt text', () => {
    render(<IconNetwork src="https://example.com/icon.png" alt="Network icon" />)
    expect(screen.getByAltText('Network icon')).toBeInTheDocument()
  })

  it('defaults to lazy loading', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" />)
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('supports eager loading', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" loading="eager" />)
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  it('applies default md size (24px)', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" />)
    const wrapper = container.querySelector('span')
    expect(wrapper).toHaveStyle({ width: '24px', height: '24px' })
  })

  it('applies xs size (12px)', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" size="xs" />)
    const wrapper = container.querySelector('span')
    expect(wrapper).toHaveStyle({ width: '12px', height: '12px' })
  })

  it('applies sm size (16px)', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" size="sm" />)
    const wrapper = container.querySelector('span')
    expect(wrapper).toHaveStyle({ width: '16px', height: '16px' })
  })

  it('applies lg size (32px)', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" size="lg" />)
    const wrapper = container.querySelector('span')
    expect(wrapper).toHaveStyle({ width: '32px', height: '32px' })
  })

  it('applies xl size (48px)', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" size="xl" />)
    const wrapper = container.querySelector('span')
    expect(wrapper).toHaveStyle({ width: '48px', height: '48px' })
  })

  it('applies custom string size', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" size="64px" />)
    const wrapper = container.querySelector('span')
    expect(wrapper).toHaveStyle({ width: '64px', height: '64px' })
  })

  it('applies default circular borderRadius', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" />)
    const wrapper = container.querySelector('span')
    expect(wrapper).toHaveStyle({ borderRadius: '50%' })
  })

  it('applies custom borderRadius', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" borderRadius=".25rem" />)
    const wrapper = container.querySelector('span')
    expect(wrapper).toHaveStyle({ borderRadius: '.25rem' })
  })

  it('applies backgroundColor', () => {
    const { container } = render(<IconNetwork src="https://example.com/icon.png" backgroundColor="rgb(0, 0, 0)" />)
    const wrapper = container.querySelector('span')
    expect(wrapper).toHaveStyle({ background: 'rgb(0, 0, 0)' })
  })

  it('does not show fallback when image loads successfully', () => {
    render(
      <IconNetwork
        src="https://example.com/icon.png"
        fallback={() => <span>FB</span>}
      />
    )
    expect(screen.queryByText('FB')).not.toBeInTheDocument()
  })

  it('applies className', () => {
    const { container } = render(
      <IconNetwork src="https://example.com/icon.png" className="my-net-icon" />
    )
    expect(container.querySelector('.my-net-icon')).toBeInTheDocument()
  })

  it('applies custom style', () => {
    const { container } = render(
      <IconNetwork src="https://example.com/icon.png" style={{ opacity: 0.5 }} />
    )
    const wrapper = container.querySelector('span')
    expect(wrapper).toHaveStyle({ opacity: 0.5 })
  })

  it('calls onFunc with class instance', () => {
    const onFunc = vi.fn()
    render(<IconNetwork src="https://example.com/icon.png" onFunc={onFunc} />)
    expect(onFunc).toHaveBeenCalledWith(expect.objectContaining({ build: expect.any(Function) }))
  })
})
