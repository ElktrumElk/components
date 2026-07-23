import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Divider from './Divider'

describe('Divider', () => {
  it('renders a div element', () => {
    const { container } = render(<Divider />)
    const div = container.querySelector('div')
    expect(div).toBeInTheDocument()
  })

  it('defaults to horizontal direction', () => {
    const { container } = render(<Divider />)
    const div = container.querySelector('div')
    expect(div).toHaveStyle({ width: '100%' })
  })

  it('applies vertical direction', () => {
    const { container } = render(<Divider direction="vertical" />)
    const div = container.querySelector('div')
    expect(div).toHaveStyle({ height: '100%' })
  })

  it('applies xs size (1px)', () => {
    const { container } = render(<Divider size="xs" />)
    const div = container.querySelector('div')
    expect(div).toHaveStyle({ height: '1px' })
  })

  it('applies sm size (2px)', () => {
    const { container } = render(<Divider size="sm" />)
    const div = container.querySelector('div')
    expect(div).toHaveStyle({ height: '2px' })
  })

  it('applies md size (4px)', () => {
    const { container } = render(<Divider size="md" />)
    const div = container.querySelector('div')
    expect(div).toHaveStyle({ height: '4px' })
  })

  it('applies lg size (8px)', () => {
    const { container } = render(<Divider size="lg" />)
    const div = container.querySelector('div')
    expect(div).toHaveStyle({ height: '8px' })
  })

  it('applies custom color', () => {
    const { container } = render(<Divider color="red" />)
    const div = container.querySelector('div')
    expect(div).toHaveStyle({ background: 'red' })
  })

  it('applies default color', () => {
    const { container } = render(<Divider />)
    const div = container.querySelector('div')
    expect(div).toHaveStyle({ background: 'rgba(255,255,255,0.1)' })
  })

  it('applies custom margin', () => {
    const { container } = render(<Divider margin="1rem 0" />)
    const div = container.querySelector('div')
    expect(div).toHaveStyle({ margin: '1rem 0' })
  })

  it('applies className', () => {
    const { container } = render(<Divider className="my-divider" />)
    expect(container.querySelector('.my-divider')).toBeInTheDocument()
  })

  it('applies custom style', () => {
    const { container } = render(<Divider style={{ opacity: 0.5 }} />)
    const div = container.querySelector('div')
    expect(div).toHaveStyle({ opacity: 0.5 })
  })
})
