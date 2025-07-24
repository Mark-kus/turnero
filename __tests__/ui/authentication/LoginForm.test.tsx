import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from '@/app/ui/authentication/LoginForm'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function Image({ alt, ...props }: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />
  }
})

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function Link({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock the useFormState and useFormStatus hooks
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn(() => [undefined, jest.fn()]),
  useFormStatus: jest.fn(() => ({ pending: false })),
}))

// Mock the login action
jest.mock('@/app/lib/actions/accounts', () => ({
  login: jest.fn(),
}))

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
})

describe('LoginForm Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    document.cookie = ''
  })

  it('renders all form elements', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('has email input with correct attributes', () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('name', 'email')
    expect(emailInput).toHaveAttribute('placeholder', 'mail@site.com')
    expect(emailInput).toHaveAttribute('required')
  })

  it('toggles password visibility when eye icon is clicked', () => {
    render(<LoginForm />)
    
    const passwordInput = screen.getByLabelText(/password/i)
    const toggleButton = screen.getByRole('button', { name: /toggle visibility/i })
    
    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    // Click to show password
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')
    
    // Click to hide password again
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('loads saved email from cookie', async () => {
    // Set up a cookie with an email
    document.cookie = 'userEmail=test%40example.com'
    
    render(<LoginForm />)
    
    await waitFor(() => {
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toHaveValue('test@example.com')
    })
  })

  it('displays validation errors when provided', () => {
    const mockUseFormState = require('react-dom').useFormState
    mockUseFormState.mockReturnValue([
      {
        errors: {
          email: ['Please enter a valid email.'],
          password: ['Password field must not be empty.'],
        },
      },
      jest.fn(),
    ])

    render(<LoginForm />)
    
    expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument()
    expect(screen.getByText('Password field must not be empty.')).toBeInTheDocument()
  })

  it('displays general error message when provided', () => {
    const mockUseFormState = require('react-dom').useFormState
    mockUseFormState.mockReturnValue([
      {
        errors: {
          submit: ['Invalid credentials. Please try again.'],
        },
      },
      jest.fn(),
    ])

    render(<LoginForm />)
    
    expect(screen.getByText('Invalid credentials. Please try again.')).toBeInTheDocument()
  })

  it('shows loading state when form is submitting', () => {
    const mockUseFormStatus = require('react-dom').useFormStatus
    mockUseFormStatus.mockReturnValue({ pending: true })

    render(<LoginForm />)
    
    const submitButton = screen.getByRole('button', { name: /logging in/i })
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent(/logging in/i)
  })

  it('has remember me checkbox', () => {
    render(<LoginForm />)
    
    const rememberCheckbox = screen.getByLabelText(/remember me/i)
    expect(rememberCheckbox).toBeInTheDocument()
    expect(rememberCheckbox).toHaveAttribute('type', 'checkbox')
    expect(rememberCheckbox).toHaveAttribute('name', 'remember_me')
  })

  it('has forgot password link', () => {
    render(<LoginForm />)
    
    const forgotLink = screen.getByText(/forgot password/i)
    expect(forgotLink).toBeInTheDocument()
    expect(forgotLink.closest('a')).toHaveAttribute('href', '/password/forgot')
  })

  it('has sign up link', () => {
    render(<LoginForm />)

    const signUpLink = screen.getByText(/no account yet\? sign up/i)
    expect(signUpLink).toBeInTheDocument()
    expect(signUpLink.closest('a')).toHaveAttribute('href', '/register')
  })
})
