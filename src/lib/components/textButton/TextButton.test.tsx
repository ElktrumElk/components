import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TextButton from './TextButton'

describe('TextButton', () => {
  it('renders text prop', () => {
    render(<TextButton text="Click me" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders as a button element', () => {
    render(<TextButton text="OK" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders child component instead of text when provided', () => {
    render(<TextButton child={() => <span>Custom</span>} />)
    expect(screen.getByText('Custom')).toBeInTheDocument()
  })

  it('applies color and fontSize', () => {
    render(<TextButton text="Styled" color="rgb(255, 0, 0)" fontSize="1.5rem" />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveStyle({ color: 'rgb(255, 0, 0)', fontSize: '1.5rem' })
  })

  it('calls onClick handler via gest', () => {
    const onClick = vi.fn()
    render(<TextButton text="Press" gest={{ onClick }} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
