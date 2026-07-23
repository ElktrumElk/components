import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IconButton from './IconButton'

describe('IconButton', () => {
  const MockIcon = () => <svg data-testid="icon" />

  it('renders icon element', () => {
    render(<IconButton icon={() => <MockIcon />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders as a button element', () => {
    render(<IconButton icon={() => <MockIcon />} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies default icon-btn class', () => {
    render(<IconButton icon={() => <MockIcon />} />)
    expect(screen.getByRole('button')).toHaveClass('icon-btn')
  })

  it('applies custom className', () => {
    render(<IconButton icon={() => <MockIcon />} className="custom-icon" />)
    expect(screen.getByRole('button')).toHaveClass('custom-icon')
  })

  it('applies borderRadius', () => {
    render(<IconButton borderRadius="4rem" icon={() => <MockIcon />} />)
    expect(screen.getByRole('button')).toHaveStyle({ borderRadius: '4rem' })
  })

  it('applies color as rgb', () => {
    render(<IconButton color="blue" icon={() => <MockIcon />} />)
    expect(screen.getByRole('button')).toHaveStyle({ color: 'rgb(0, 0, 255)' })
  })

  it('applies default background none', () => {
    render(<IconButton icon={() => <MockIcon />} />)
    expect(screen.getByRole('button')).toHaveStyle({ background: 'none' })
  })

  it('handles onClick via gest', async () => {
    const onClick = vi.fn()
    render(<IconButton gest={{ onClick }} icon={() => <MockIcon />} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies custom style', () => {
    render(<IconButton style={{ opacity: 0.5 }} icon={() => <MockIcon />} />)
    expect(screen.getByRole('button')).toHaveStyle({ opacity: 0.5 })
  })
})
