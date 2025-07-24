import { render, screen } from '@testing-library/react'
import NoResults from '@/app/ui/NoResults'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function Image({ alt, ...props }: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />
  }
})

describe('NoResults Component', () => {
  it('renders children content', () => {
    const testMessage = 'No appointments found'
    
    render(
      <NoResults>
        <p>{testMessage}</p>
      </NoResults>
    )
    
    expect(screen.getByText(testMessage)).toBeInTheDocument()
  })

  it('renders no results image with correct alt text', () => {
    render(
      <NoResults>
        <p>Test content</p>
      </NoResults>
    )
    
    const image = screen.getByAltText('No Results')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('width', '300')
    expect(image).toHaveAttribute('height', '300')
  })

  it('has correct CSS classes for styling', () => {
    const { container } = render(
      <NoResults>
        <p>Test content</p>
      </NoResults>
    )
    
    const heroDiv = container.querySelector('.hero')
    expect(heroDiv).toHaveClass('hero', 'h-full')
    
    const heroContent = container.querySelector('.hero-content')
    expect(heroContent).toHaveClass('hero-content', 'text-center')
  })

  it('renders multiple children elements', () => {
    render(
      <NoResults>
        <h2>No Results Found</h2>
        <p>Try adjusting your search criteria</p>
        <button>Reset Filters</button>
      </NoResults>
    )
    
    expect(screen.getByText('No Results Found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search criteria')).toBeInTheDocument()
    expect(screen.getByText('Reset Filters')).toBeInTheDocument()
  })
})
