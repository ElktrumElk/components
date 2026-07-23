import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Image from './Image'

describe('Image', () => {
  it('renders img when src is provided', () => {
    render(<Image src="/photo.jpg" alt="Photo" />)
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/photo.jpg')
    expect(img).toHaveAttribute('alt', 'Photo')
  })

  it('applies alt text', () => {
    render(<Image src="/pic.png" alt="My Picture" />)
    expect(screen.getByAltText('My Picture')).toBeInTheDocument()
  })

  it('applies width and height', () => {
    render(<Image src="/pic.png" alt="Pic" width="200px" height="150px" />)
    const img = screen.getByRole('img')
    expect(img).toHaveStyle({ width: '200px', height: '150px' })
  })

  it('applies objectFit', () => {
    render(<Image src="/pic.png" alt="Pic" objectFit="contain" />)
    const img = screen.getByRole('img')
    expect(img).toHaveStyle({ objectFit: 'contain' })
  })

  it('applies borderRadius', () => {
    render(<Image src="/pic.png" alt="Pic" borderRadius=".5rem" />)
    const img = screen.getByRole('img')
    expect(img).toHaveStyle({ borderRadius: '.5rem' })
  })

  it('defaults to lazy loading', () => {
    render(<Image src="/pic.png" alt="Pic" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('supports eager loading', () => {
    render(<Image src="/pic.png" alt="Pic" loading="eager" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  it('shows fallback when no src', () => {
    render(<Image fallback={() => <span>No Image</span>} />)
    expect(screen.getByText('No Image')).toBeInTheDocument()
  })

  it('shows placeholder div when no src and no fallback', () => {
    const { container } = render(<Image />)
    const placeholder = container.querySelector('div > div')
    expect(placeholder).toBeInTheDocument()
  })

  it('applies className to wrapper', () => {
    const { container } = render(<Image className="my-img" />)
    expect(container.querySelector('.my-img')).toBeInTheDocument()
  })

  it('applies custom style to wrapper', () => {
    const { container } = render(<Image style={{ opacity: 0.5 }} />)
    const wrapper = container.querySelector('div > div')
    expect(wrapper).toHaveStyle({ opacity: 0.5 })
  })
})
