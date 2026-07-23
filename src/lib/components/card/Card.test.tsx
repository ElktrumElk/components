import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from './Card'

describe('Card', () => {
  it('renders body content', () => {
    render(
      <Card body={() => <div>Card Body</div>} />
    )
    expect(screen.getByText('Card Body')).toBeInTheDocument()
  })

  it('renders header content', () => {
    render(
      <Card
        header={() => <div>Card Header</div>}
        body={() => <div>Body</div>}
      />
    )
    expect(screen.getByText('Card Header')).toBeInTheDocument()
  })

  it('renders footer content', () => {
    render(
      <Card
        body={() => <div>Body</div>}
        footer={() => <div>Card Footer</div>}
      />
    )
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })

  it('renders all slots together', () => {
    render(
      <Card
        header={() => <div>H</div>}
        body={() => <div>B</div>}
        footer={() => <div>F</div>}
      />
    )
    expect(screen.getByText('H')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('F')).toBeInTheDocument()
  })

  it('applies default padding md', () => {
    const { container } = render(<Card body={() => <div />} />)
    const card = container.querySelector('div > div')
    expect(card).toHaveStyle({ padding: '1rem' })
  })

  it('applies padding none', () => {
    const { container } = render(<Card body={() => <div />} padding="none" />)
    const card = container.querySelector('div > div')
    expect(card).toHaveStyle({ padding: '0' })
  })

  it('applies padding sm', () => {
    const { container } = render(<Card body={() => <div />} padding="sm" />)
    const card = container.querySelector('div > div')
    expect(card).toHaveStyle({ padding: '.5rem' })
  })

  it('applies padding lg', () => {
    const { container } = render(<Card body={() => <div />} padding="lg" />)
    const card = container.querySelector('div > div')
    expect(card).toHaveStyle({ padding: '1.5rem' })
  })

  it('applies default radius md', () => {
    const { container } = render(<Card body={() => <div />} />)
    const card = container.querySelector('div > div')
    expect(card).toHaveStyle({ borderRadius: '.5rem' })
  })

  it('applies radius xl', () => {
    const { container } = render(<Card body={() => <div />} radius="xl" />)
    const card = container.querySelector('div > div')
    expect(card).toHaveStyle({ borderRadius: '1rem' })
  })

  it('applies shadow', () => {
    const { container } = render(<Card body={() => <div />} shadow />)
    const card = container.querySelector('div > div')
    expect(card).toHaveStyle({ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' })
  })

  it('does not apply shadow by default', () => {
    const { container } = render(<Card body={() => <div />} />)
    const card = container.querySelector('div > div')
    expect(card?.getAttribute('style')).not.toContain('boxShadow')
  })

  it('applies custom backgroundColor', () => {
    const { container } = render(<Card body={() => <div />} backgroundColor="rgb(0, 0, 0)" />)
    const card = container.querySelector('div > div')
    expect(card).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)' })
  })

  it('applies width and height', () => {
    const { container } = render(<Card body={() => <div />} width="300px" height="200px" />)
    const card = container.querySelector('div > div')
    expect(card).toHaveStyle({ width: '300px', height: '200px' })
  })

  it('applies className', () => {
    const { container } = render(<Card body={() => <div />} className="my-card" />)
    expect(container.querySelector('.my-card')).toBeInTheDocument()
  })

  it('applies custom style', () => {
    const { container } = render(<Card body={() => <div />} style={{ opacity: 0.5 }} />)
    const card = container.querySelector('div > div')
    expect(card).toHaveStyle({ opacity: 0.5 })
  })

  it('handles click via gest', async () => {
    const onClick = vi.fn()
    const { container } = render(<Card body={() => <div />} gest={{ onClick }} />)
    const card = container.querySelector('div > div')!
    await userEvent.click(card)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('calls onFunc with class instance', () => {
    const onFunc = vi.fn()
    render(<Card body={() => <div />} onFunc={onFunc} />)
    expect(onFunc).toHaveBeenCalledWith(expect.objectContaining({ build: expect.any(Function) }))
  })
})
