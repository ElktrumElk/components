import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Container from './Container'

describe('Container', () => {
  it('renders child content', () => {
    render(
      <Container child={() => <div>Content</div>} />
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies width', () => {
    const { container } = render(
      <Container width="200px" child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ width: '200px' })
  })

  it('applies height', () => {
    const { container } = render(
      <Container height="100px" child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ height: '100px' })
  })

  it('applies default padding of 1rem', () => {
    const { container } = render(
      <Container child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ padding: '1rem' })
  })

  it('applies custom padding', () => {
    const { container } = render(
      <Container padding="2rem" child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ padding: '2rem' })
  })

  it('applies color as background', () => {
    const { container } = render(
      <Container color="rgb(255, 0, 0)" child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ background: 'rgb(255, 0, 0)' })
  })

  it('applies className', () => {
    const { container } = render(
      <Container className="my-box" child={() => <div />} />
    )
    expect(container.querySelector('.my-box')).toBeInTheDocument()
  })

  it('applies custom style', () => {
    const { container } = render(
      <Container style={{ opacity: 0.5 }} child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ opacity: 0.5 })
  })

  it('passes gest props to div', async () => {
    const onClick = vi.fn()
    const { container } = render(
      <Container gest={{ onClick }} child={() => <div />} />
    )
    const target = container.querySelector('div > div')!
    await userEvent.click(target)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('calls onFunc with class instance', () => {
    const onFunc = vi.fn()
    render(
      <Container child={() => <div />} onFunc={onFunc} />
    )
    expect(onFunc).toHaveBeenCalledWith(expect.objectContaining({ build: expect.any(Function) }))
  })
})
