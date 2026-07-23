import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Badge from './Badge'

describe('Badge', () => {
  it('renders text content', () => {
    render(<Badge text="Active" />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders as a div', () => {
    const { container } = render(<Badge text="Test" />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('applies default soft variant', () => {
    render(<Badge text="Soft" variant="soft" />)
    const badge = screen.getByText('Soft')
    expect(badge).toHaveStyle({ background: 'rgba(255, 255, 255, 0.1)' })
  })

  it('applies filled variant', () => {
    render(<Badge text="Filled" variant="filled" backgroundColor="rgb(0, 0, 255)" />)
    const badge = screen.getByText('Filled')
    expect(badge).toHaveStyle({ background: 'rgb(0, 0, 255)' })
  })

  it('applies outlined variant', () => {
    render(<Badge text="Outlined" variant="outlined" color="rgb(255, 0, 0)" borderColor="rgb(255, 0, 0)" />)
    const badge = screen.getByText('Outlined')
    expect(badge).toHaveStyle({ background: 'transparent' })
  })

  it('applies size xs', () => {
    render(<Badge text="XS" size="xs" />)
    const badge = screen.getByText('XS')
    expect(badge).toHaveStyle({ fontSize: '.65rem' })
  })

  it('applies size sm', () => {
    render(<Badge text="SM" size="sm" />)
    const badge = screen.getByText('SM')
    expect(badge).toHaveStyle({ fontSize: '.75rem' })
  })

  it('applies size md', () => {
    render(<Badge text="MD" size="md" />)
    const badge = screen.getByText('MD')
    expect(badge).toHaveStyle({ fontSize: '.85rem' })
  })

  it('applies size lg', () => {
    render(<Badge text="LG" size="lg" />)
    const badge = screen.getByText('LG')
    expect(badge).toHaveStyle({ fontSize: '1rem' })
  })

  it('applies custom color as rgb', () => {
    render(<Badge text="Color" color="rgb(255, 255, 0)" />)
    const badge = screen.getByText('Color')
    expect(badge).toHaveStyle({ color: 'rgb(255, 255, 0)' })
  })

  it('applies custom backgroundColor', () => {
    render(<Badge text="BG" backgroundColor="rgb(0, 128, 0)" variant="filled" />)
    const badge = screen.getByText('BG')
    expect(badge).toHaveStyle({ background: 'rgb(0, 128, 0)' })
  })

  it('applies default pill borderRadius', () => {
    render(<Badge text="Pill" />)
    const badge = screen.getByText('Pill')
    expect(badge).toHaveStyle({ borderRadius: '9999px' })
  })

  it('applies custom borderRadius', () => {
    render(<Badge text="Square" borderRadius=".25rem" />)
    const badge = screen.getByText('Square')
    expect(badge).toHaveStyle({ borderRadius: '.25rem' })
  })

  it('renders child instead of text when provided', () => {
    render(
      <Badge child={() => <span data-testid="custom">Custom</span>} />
    )
    expect(screen.getByTestId('custom')).toBeInTheDocument()
  })

  it('handles click via gest', async () => {
    const onClick = vi.fn()
    render(<Badge text="Click" gest={{ onClick }} />)
    await userEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies className', () => {
    render(<Badge text="Class" className="my-badge" />)
    expect(screen.getByText('Class')).toHaveClass('my-badge')
  })

  it('applies custom style', () => {
    render(<Badge text="Styled" style={{ opacity: 0.5 }} />)
    expect(screen.getByText('Styled')).toHaveStyle({ opacity: 0.5 })
  })
})
