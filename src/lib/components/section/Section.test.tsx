import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Section from './Section'

describe('Section', () => {
  it('renders a section element', () => {
    const { container } = render(<Section title={() => <h2>Title</h2>} />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('renders the title content', () => {
    render(<Section title={() => <h2>About Us</h2>} />)
    expect(screen.getByText('About Us')).toBeInTheDocument()
  })

  it('renders child content when provided', () => {
    render(
      <Section
        title={() => <h2>Section</h2>}
        child={() => <p>Child paragraph</p>}
      />
    )
    expect(screen.getByText('Child paragraph')).toBeInTheDocument()
  })

  it('applies padding', () => {
    const { container } = render(<Section title={() => <h2>T</h2>} padding="2rem" />)
    expect(container.querySelector('section')).toHaveStyle({ padding: '2rem' })
  })

  it('applies className', () => {
    const { container } = render(<Section title={() => <h2>T</h2>} className="my-section" />)
    expect(container.querySelector('section')).toHaveClass('my-section')
  })
})
