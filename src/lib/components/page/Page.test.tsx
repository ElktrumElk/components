import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './Page'

describe('Page', () => {
  it('renders body content', () => {
    render(
      <Page body={() => <div>Body Content</div>} />
    )
    expect(screen.getByText('Body Content')).toBeInTheDocument()
  })

  it('renders header when provided', () => {
    render(
      <Page
        header={() => <div>Header Content</div>}
        body={() => <div>Body</div>}
      />
    )
    expect(screen.getByText('Header Content')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(
      <Page
        body={() => <div>Body</div>}
        footer={() => <div>Footer Content</div>}
      />
    )
    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })

  it('renders all slots together', () => {
    render(
      <Page
        header={() => <div>Header</div>}
        body={() => <div>Body</div>}
        footer={() => <div>Footer</div>}
      />
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('applies default page class', () => {
    const { container } = render(
      <Page body={() => <div />} />
    )
    expect(container.querySelector('.page')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Page body={() => <div />} className="custom-page" />
    )
    expect(container.querySelector('.custom-page')).toBeInTheDocument()
  })

  it('applies custom style', () => {
    const { container } = render(
      <Page body={() => <div />} style={{ background: 'red' }} />
    )
    const section = container.querySelector('section')
    expect(section).toHaveStyle({ background: 'red' })
  })

  it('passes atrib to section element', () => {
    const { container } = render(
      <Page body={() => <div />} atrib={{ id: 'my-page' }} />
    )
    expect(container.querySelector('#my-page')).toBeInTheDocument()
  })
})
