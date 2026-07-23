import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('applies placeholder', () => {
    render(<Input placeholder="Enter text..." />)
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument()
  })

  it('applies default type text', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
  })

  it('applies password type', () => {
    const { container } = render(<Input type="password" />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('applies email type', () => {
    render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
  })

  it('applies disabled state', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('applies readOnly state', () => {
    render(<Input readOnly />)
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
  })

  it('handles onChange via gest', async () => {
    const onChange = vi.fn()
    render(<Input gest={{ onChange }} />)
    await userEvent.type(screen.getByRole('textbox'), 'a')
    expect(onChange).toHaveBeenCalled()
  })

  it('applies custom width', () => {
    const { container } = render(<Input width="300px" />)
    const wrapper = container.querySelector('div')
    expect(wrapper).toHaveStyle({ width: '300px' })
  })

  it('applies custom height', () => {
    render(<Input height="3rem" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveStyle({ height: '3rem' })
  })

  it('applies borderRadius', () => {
    const result = render(<Input borderRadius="1rem" />)
    const input = result.container.querySelector('input')
    expect(input).toHaveStyle({ borderRadius: '1rem' })
  })

  it('applies borderColor', () => {
    const { container } = render(<Input borderColor="rgb(0, 0, 255)" />)
    const input = container.querySelector('input')
    expect(input).toHaveStyle({ border: '1px solid rgb(0, 0, 255)' })
  })

  it('renders prefix element', () => {
    render(
      <Input prefix={() => <span data-testid="prefix">@</span>} />
    )
    expect(screen.getByTestId('prefix')).toBeInTheDocument()
  })

  it('renders suffix element', () => {
    render(
      <Input suffix={() => <span data-testid="suffix">OK</span>} />
    )
    expect(screen.getByTestId('suffix')).toBeInTheDocument()
  })

  it('renders both prefix and suffix', () => {
    render(
      <Input
        prefix={() => <span data-testid="pre">$</span>}
        suffix={() => <span data-testid="suf">.00</span>}
      />
    )
    expect(screen.getByTestId('pre')).toBeInTheDocument()
    expect(screen.getByTestId('suf')).toBeInTheDocument()
  })

  it('applies className to wrapper', () => {
    const { container } = render(<Input className="my-input" />)
    expect(container.querySelector('.my-input')).toBeInTheDocument()
  })

  it('calls onFunc with class instance', () => {
    const onFunc = vi.fn()
    render(<Input onFunc={onFunc} />)
    expect(onFunc).toHaveBeenCalledWith(expect.objectContaining({ build: expect.any(Function) }))
  })
})
