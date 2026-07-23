import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Article from './Article'

describe('Article', () => {
  it('renders an article element', () => {
    render(
      <Article
        title={() => <h1>My Article</h1>}
        body={() => <p>Body text</p>}
      />
    )
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(
      <Article
        title={() => <h1>Hello World</h1>}
        body={() => <p>Content</p>}
      />
    )
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders the body', () => {
    render(
      <Article
        title={() => <h1>Title</h1>}
        body={() => <p>Some body content here</p>}
      />
    )
    expect(screen.getByText('Some body content here')).toBeInTheDocument()
  })

  it('applies padding', () => {
    render(
      <Article
        title={() => <h1>T</h1>}
        body={() => <p>B</p>}
        padding="1.5rem"
      />
    )
    expect(screen.getByRole('article')).toHaveStyle({ padding: '1.5rem' })
  })

  it('applies className', () => {
    render(
      <Article
        title={() => <h1>T</h1>}
        body={() => <p>B</p>}
        className="custom-article"
      />
    )
    expect(screen.getByRole('article')).toHaveClass('custom-article')
  })
})
