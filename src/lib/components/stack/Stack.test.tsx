import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Stack from './Stack'

describe('Stack', () => {
  it('renders child content', () => {
    render(
      <Stack child={() => <div>Stack Content</div>} />
    )
    expect(screen.getByText('Stack Content')).toBeInTheDocument()
  })

  it('applies display flex', () => {
    const { container } = render(
      <Stack child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ display: 'flex' })
  })

  it('defaults to column direction', () => {
    const { container } = render(
      <Stack child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ flexDirection: 'column' })
  })

  it('applies row direction', () => {
    const { container } = render(
      <Stack direction="row" child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ flexDirection: 'row' })
  })

  it('applies gap', () => {
    const { container } = render(
      <Stack gap="1rem" child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ gap: '1rem' })
  })

  it('applies align', () => {
    const { container } = render(
      <Stack align="center" child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ alignItems: 'center' })
  })

  it('applies justify', () => {
    const { container } = render(
      <Stack justify="space-between" child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ justifyContent: 'space-between' })
  })

  it('applies wrap', () => {
    const { container } = render(
      <Stack wrap child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ flexWrap: 'wrap' })
  })

  it('applies width and height', () => {
    const { container } = render(
      <Stack width="100%" height="100vh" child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ width: '100%', height: '100vh' })
  })

  it('applies padding and margin', () => {
    const { container } = render(
      <Stack padding="1rem" margin="0 auto" child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ padding: '1rem', margin: '0 auto' })
  })

  it('handles click via gest', async () => {
    const onClick = vi.fn()
    const { container } = render(
      <Stack gest={{ onClick }} child={() => <div />} />
    )
    const target = container.querySelector('div > div')!
    await userEvent.click(target)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies className', () => {
    const { container } = render(
      <Stack className="my-stack" child={() => <div />} />
    )
    expect(container.querySelector('.my-stack')).toBeInTheDocument()
  })

  it('applies custom style', () => {
    const { container } = render(
      <Stack style={{ background: 'rgb(0, 0, 255)' }} child={() => <div />} />
    )
    const div = container.querySelector('div > div')
    expect(div).toHaveStyle({ background: 'rgb(0, 0, 255)' })
  })
})
