import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TabView from './TabView'

const tabs = [
  { id: 'tab1', label: () => <span>Tab One</span>, content: () => <div>Content One</div> },
  { id: 'tab2', label: () => <span>Tab Two</span>, content: () => <div>Content Two</div> },
]

describe('TabView', () => {
  it('renders all tab buttons', () => {
    render(<TabView tabs={tabs} />)
    expect(screen.getByText('Tab One')).toBeInTheDocument()
    expect(screen.getByText('Tab Two')).toBeInTheDocument()
  })

  it('shows content for the default tab (first tab)', () => {
    render(<TabView tabs={tabs} />)
    expect(screen.getByText('Content One')).toBeInTheDocument()
    expect(screen.queryByText('Content Two')).not.toBeInTheDocument()
  })

  it('shows content for the specified activeTab', () => {
    render(<TabView tabs={tabs} activeTab="tab2" />)
    expect(screen.getByText('Content Two')).toBeInTheDocument()
    expect(screen.queryByText('Content One')).not.toBeInTheDocument()
  })

  it('shows content for defaultTab when activeTab is not set', () => {
    render(<TabView tabs={tabs} defaultTab="tab2" />)
    expect(screen.getByText('Content Two')).toBeInTheDocument()
    expect(screen.queryByText('Content One')).not.toBeInTheDocument()
  })

  it('calls onChange with the tab id when a tab is clicked', () => {
    const onChange = vi.fn()
    render(<TabView tabs={tabs} onChange={onChange} />)
    fireEvent.click(screen.getByText('Tab Two'))
    expect(onChange).toHaveBeenCalledWith('tab2')
  })
})
