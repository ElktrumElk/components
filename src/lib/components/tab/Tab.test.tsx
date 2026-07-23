import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Tab from './Tab'

describe('Tab', () => {
  it('renders a button element', () => {
    render(<Tab label={() => <span>Tab One</span>} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders the label content', () => {
    render(<Tab label={() => <span>Settings</span>} />)
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('applies active color when isActive is true', () => {
    render(<Tab label={() => <span>LABEL</span>} isActive activeColor="#ff0000" />)
    expect(screen.getByRole('button')).toHaveStyle({ color: '#ff0000' })
  })

  it('applies inactive color when isActive is false', () => {
    render(<Tab label={() => <span>LABEL</span>} isActive={false} inactiveColor="#888" />)
    expect(screen.getByRole('button')).toHaveStyle({ color: '#888' })
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Tab label={() => <span>TAB</span>} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
