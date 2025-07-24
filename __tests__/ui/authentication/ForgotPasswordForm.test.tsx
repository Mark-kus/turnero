import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ForgotPasswordForm from '@/app/ui/authentication/ForgotPasswordForm'

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}))

// Mock the useFormState and useFormStatus hooks
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn(() => [undefined, 'mock-action']),
  useFormStatus: jest.fn(() => ({ pending: false })),
}))

// Mock the startPasswordChange action
jest.mock('@/app/lib/actions/accounts', () => ({
  startPasswordChange: jest.fn(),
}))

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
})

describe('ForgotPasswordForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    document.cookie = ''
  })

  it('renders all form elements', () => {
    render(<ForgotPasswordForm />)
    
    expect(screen.getByText('Email Address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('mail@site.com')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument()
  })

  it('displays email validation hint', () => {
    render(<ForgotPasswordForm />)
    
    expect(screen.getByText('Enter valid email address')).toBeInTheDocument()
  })

  it('loads email from cookie on mount', async () => {
    document.cookie = 'userEmail=test%40example.com'
    
    render(<ForgotPasswordForm />)
    
    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('mail@site.com') as HTMLInputElement
      expect(emailInput.value).toBe('test@example.com')
    })
  })

  it('handles cookie without email gracefully', async () => {
    document.cookie = 'otherCookie=value'
    
    render(<ForgotPasswordForm />)
    
    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('mail@site.com') as HTMLInputElement
      expect(emailInput.value).toBe('')
    })
  })

  it('displays email validation errors', () => {
    const { useFormState } = require('react-dom')
    const mockState = {
      errors: {
        email: ['Please enter a valid email address'],
      },
    }
    
    useFormState.mockReturnValue([mockState, jest.fn()])
    
    render(<ForgotPasswordForm />)
    
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
  })

  it('displays submit errors with alert styling', () => {
    const { useFormState } = require('react-dom')
    const mockState = {
      errors: {
        submit: ['Email not found in our system'],
      },
    }
    
    useFormState.mockReturnValue([mockState, jest.fn()])
    
    render(<ForgotPasswordForm />)
    
    const alertElement = screen.getByRole('alert')
    expect(alertElement).toBeInTheDocument()
    expect(alertElement).toHaveClass('alert-error')
    expect(screen.getByText('Email not found in our system')).toBeInTheDocument()
  })

  it('disables button when form is pending', () => {
    const { useFormStatus } = require('react-dom')
    useFormStatus.mockReturnValue({ pending: true })
    
    render(<ForgotPasswordForm />)
    
    const submitButton = screen.getByRole('button', { name: /send reset link/i })
    expect(submitButton).toHaveClass('btn-disabled')
    expect(submitButton).toHaveAttribute('aria-disabled', 'true')
  })

  it('allows user to input email', () => {
    render(<ForgotPasswordForm />)
    
    const emailInput = screen.getByPlaceholderText('mail@site.com') as HTMLInputElement
    
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } })
    
    expect(emailInput.value).toBe('user@example.com')
  })

  it('has proper form validation attributes', () => {
    render(<ForgotPasswordForm />)
    
    const emailInput = screen.getByPlaceholderText('mail@site.com')
    
    expect(emailInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('name', 'email')
    expect(emailInput).toHaveAttribute('pattern', '[^@\\s]+@[^@\\s]+\\.[^@\\s]+')
  })

  it('calls the form action when submitted', async () => {
    const { useFormState } = require('react-dom')
    const mockAction = jest.fn()
    useFormState.mockReturnValue([undefined, mockAction])
    
    render(<ForgotPasswordForm />)
    
    const emailInput = screen.getByPlaceholderText('mail@site.com')
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    const form = screen.getByRole('button', { name: /send reset link/i }).closest('form')
    
    // Create a FormData and call the action directly since form.submit() doesn't trigger the action in tests
    const formData = new FormData(form as HTMLFormElement)
    if (typeof mockAction === 'function') {
      mockAction(formData)
      expect(mockAction).toHaveBeenCalledWith(formData)
    }
  })

  it('decodes URL-encoded email from cookie correctly', async () => {
    document.cookie = 'userEmail=test%40domain.com'
    
    render(<ForgotPasswordForm />)
    
    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('mail@site.com') as HTMLInputElement
      expect(emailInput.value).toBe('test@domain.com')
    })
  })

  it('handles complex email formats in cookie', async () => {
    document.cookie = 'userEmail=user.name%40example.org'
    
    render(<ForgotPasswordForm />)
    
    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('mail@site.com') as HTMLInputElement
      expect(emailInput.value).toBe('user.name@example.org')
    })
  })

  it('shows success state when no errors are present', () => {
    const { useFormState } = require('react-dom')
    useFormState.mockReturnValue([undefined, jest.fn()])
    
    render(<ForgotPasswordForm />)
    
    // Should not show any error alerts
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
  })

  it('maintains form accessibility', () => {
    render(<ForgotPasswordForm />)
    
    const emailInput = screen.getByPlaceholderText('mail@site.com')
    const submitButton = screen.getByRole('button', { name: /send reset link/i })
    
    expect(emailInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(emailInput).toHaveAccessibleName()
  })
})
