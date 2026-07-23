import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Center from './Center'

describe('Center', () => {
  it('renders child content', () => {
    render(
      <Center child={() => <span>Centered</span>} />
    )
    expect(screen.getByText('Centered')).toBeInTheDocument()
  })

  it('applies flex centering styles', () => {
    const { container } = render(
      <Center child={() => <div />} />
    )
    const wrapper = container.querySelector('div')
    expect(wrapper).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      flex: 1,
    })
  })

  it('renders nested content', () => {
    render(
      <Center child={() => (
        <div>
          <span>Nested A</span>
          <span>Nested B</span>
        </div>
      )} />
    )
    expect(screen.getByText('Nested A')).toBeInTheDocument()
    expect(screen.getByText('Nested B')).toBeInTheDocument()
  })
})
