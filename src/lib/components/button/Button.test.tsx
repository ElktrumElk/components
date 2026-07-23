import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders child content', () => {
    render(
      <Button child={() => <span>Click</span>} />
    )
    expect(screen.getByText('Click')).toBeInTheDocument()
  })

  it('renders as a button element', () => {
    render(<Button child={() => <span>OK</span>} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies padding', () => {
    render(<Button padding=".5rem 1rem" child={() => <span />} />)
    expect(screen.getByRole('button')).toHaveStyle({ padding: '.5rem 1rem' })
  })

  it('applies borderRadius', () => {
    render(<Button borderRadius="1rem" child={() => <span />} />)
    expect(screen.getByRole('button')).toHaveStyle({ borderRadius: '1rem' })
  })

  it('applies color as rgb', () => {
    render(<Button color="white" child={() => <span />} />)
    expect(screen.getByRole('button')).toHaveStyle({ color: 'rgb(255, 255, 255)' })
  })

  it('applies width and height', () => {
    render(<Button width="100px" height="40px" child={() => <span />} />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveStyle({ width: '100px', height: '40px' })
  })

  it('applies border', () => {
    render(<Button border="1px solid rgb(255, 0, 0)" child={() => <span />} />)
    expect(screen.getByRole('button')).toHaveStyle({ border: '1px solid rgb(255, 0, 0)' })
  })

  it('handles onClick via gest', async () => {
    const onClick = vi.fn()
    render(<Button gest={{ onClick }} child={() => <span />} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies className', () => {
    render(<Button className="my-btn" child={() => <span />} />)
    expect(screen.getByRole('button')).toHaveClass('my-btn')
  })

  it('applies custom style via individual props', () => {
    render(<Button width="200px" height="50px" padding="1rem" borderRadius="2rem" child={() => <span />} />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveStyle({
      width: '200px',
      height: '50px',
      padding: '1rem',
      borderRadius: '2rem',
    })
  })

  it('calls onFunc with class instance', () => {
    const onFunc = vi.fn()
    render(<Button child={() => <span />} onFunc={onFunc} />)
    expect(onFunc).toHaveBeenCalledWith(expect.objectContaining({ build: expect.any(Function) }))
  })
})
