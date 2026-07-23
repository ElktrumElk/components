import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders title', () => {
    render(
      <Header title={() => <h1>My Title</h1>} />
    )
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })

  it('renders leading element', () => {
    render(
      <Header
        leading={() => <span data-testid="leading">L</span>}
        title={() => <h1>Title</h1>}
      />
    )
    expect(screen.getByTestId('leading')).toBeInTheDocument()
  })

  it('renders subTitle', () => {
    render(
      <Header
        title={() => <h1>Title</h1>}
        subTitle={() => <p>Subtitle</p>}
      />
    )
    expect(screen.getByText('Subtitle')).toBeInTheDocument()
  })

  it('renders action element', () => {
    render(
      <Header
        title={() => <h1>Title</h1>}
        action={() => <button>Action</button>}
      />
    )
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('renders all slots together', () => {
    render(
      <Header
        leading={() => <span>L</span>}
        title={() => <h1>Title</h1>}
        subTitle={() => <p>Sub</p>}
        action={() => <button>Act</button>}
      />
    )
    expect(screen.getByText('L')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Sub')).toBeInTheDocument()
    expect(screen.getByText('Act')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Header title={() => <h1>Title</h1>} className="my-header" />
    )
    expect(container.querySelector('.my-header')).toBeInTheDocument()
  })

  it('applies titleGap', () => {
    const { container } = render(
      <Header
        title={() => <h1>Title</h1>}
        subTitle={() => <p>Sub</p>}
        titleGap=".5rem"
      />
    )
    const titleWrapper = container.querySelector('div')
    expect(titleWrapper).toHaveStyle({ gap: '.5rem' })
  })

  it('applies custom style overriding defaults', () => {
    const { container } = render(
      <Header title={() => <h1>Title</h1>} style={{ background: 'blue' }} />
    )
    const header = container.querySelector('header')
    expect(header).toHaveStyle({ background: 'blue' })
  })
})
