import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Avatar from './Avatar'

const MockIcon = () => (
  <svg data-testid="mock-icon">
    <circle cx="12" cy="12" r="10" />
  </svg>
)

describe('Avatar', () => {
  it('renders img when src is provided', () => {
    render(<Avatar src="/user.jpg" alt="User" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('applies alt text', () => {
    render(<Avatar src="/user.jpg" alt="John Doe" />)
    expect(screen.getByAltText('John Doe')).toBeInTheDocument()
  })

  it('applies default md size (2.5rem)', () => {
    const { container } = render(<Avatar />)
    const avatar = container.querySelector('div > div')
    expect(avatar).toHaveStyle({ width: '2.5rem', height: '2.5rem' })
  })

  it('applies xs size (1.5rem)', () => {
    const { container } = render(<Avatar size="xs" />)
    const avatar = container.querySelector('div > div')
    expect(avatar).toHaveStyle({ width: '1.5rem', height: '1.5rem' })
  })

  it('applies sm size (2rem)', () => {
    const { container } = render(<Avatar size="sm" />)
    const avatar = container.querySelector('div > div')
    expect(avatar).toHaveStyle({ width: '2rem', height: '2rem' })
  })

  it('applies lg size (3.5rem)', () => {
    const { container } = render(<Avatar size="lg" />)
    const avatar = container.querySelector('div > div')
    expect(avatar).toHaveStyle({ width: '3.5rem', height: '3.5rem' })
  })

  it('applies xl size (5rem)', () => {
    const { container } = render(<Avatar size="xl" />)
    const avatar = container.querySelector('div > div')
    expect(avatar).toHaveStyle({ width: '5rem', height: '5rem' })
  })

  it('applies default circular borderRadius', () => {
    const { container } = render(<Avatar />)
    const avatar = container.querySelector('div > div')
    expect(avatar).toHaveStyle({ borderRadius: '50%' })
  })

  it('applies custom borderRadius', () => {
    const { container } = render(<Avatar borderRadius=".5rem" />)
    const avatar = container.querySelector('div > div')
    expect(avatar).toHaveStyle({ borderRadius: '.5rem' })
  })

  it('applies custom backgroundColor', () => {
    const { container } = render(<Avatar backgroundColor="rgb(0, 0, 255)" />)
    const avatar = container.querySelector('div > div')
    expect(avatar).toHaveStyle({ background: 'rgb(0, 0, 255)' })
  })

  it('shows icon when no src', () => {
    render(<Avatar icon={() => <MockIcon />} />)
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
  })

  it('does not show icon when src is provided', () => {
    render(<Avatar src="/pic.jpg" icon={() => <MockIcon />} />)
    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument()
  })

  it('shows fallback when no src and no icon', () => {
    render(<Avatar fallback={() => <span>JD</span>} />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('does not show fallback when icon is provided', () => {
    render(<Avatar icon={() => <MockIcon />} fallback={() => <span>FB</span>} />)
    expect(screen.queryByText('FB')).not.toBeInTheDocument()
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
  })

  it('does not show fallback when src is provided', () => {
    render(<Avatar src="/pic.jpg" fallback={() => <span>FB</span>} />)
    expect(screen.queryByText('FB')).not.toBeInTheDocument()
  })

  it('does not show icon when src is provided', () => {
    render(<Avatar src="/pic.jpg" icon={() => <MockIcon />} />)
    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument()
  })

  it('prioritizes src over icon', () => {
    render(
      <Avatar
        src="/photo.jpg"
        alt="User"
        icon={() => <MockIcon />}
        fallback={() => <span>FB</span>}
      />
    )
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument()
    expect(screen.queryByText('FB')).not.toBeInTheDocument()
  })

  it('applies className', () => {
    const { container } = render(<Avatar className="my-avatar" />)
    expect(container.querySelector('.my-avatar')).toBeInTheDocument()
  })

  it('applies custom style', () => {
    const { container } = render(<Avatar style={{ opacity: 0.5 }} />)
    const avatar = container.querySelector('div > div')
    expect(avatar).toHaveStyle({ opacity: 0.5 })
  })

  it('handles click via gest', async () => {
    const onClick = vi.fn()
    const { container } = render(<Avatar gest={{ onClick }} />)
    const target = container.querySelector('div > div')!
    await userEvent.click(target)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('calls onFunc with class instance', () => {
    const onFunc = vi.fn()
    render(<Avatar onFunc={onFunc} />)
    expect(onFunc).toHaveBeenCalledWith(expect.objectContaining({ build: expect.any(Function) }))
  })
})
