import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RegisterForm from '@/app/ui/authentication/RegisterForm'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function Image({ alt, ...props }: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />
  }
})

// Mock the useFormState and useFormStatus hooks
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn(() => [undefined, jest.fn()]),
  useFormStatus: jest.fn(() => ({ pending: false })),
}))

// Mock the signup action
jest.mock('@/app/lib/actions/accounts', () => ({
  signup: jest.fn(),
}))

describe('RegisterForm Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
  })

  it('renders all form elements', () => {
    render(<RegisterForm />)
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('has correct input attributes for first name', () => {
    render(<RegisterForm />)
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    expect(firstNameInput).toHaveAttribute('type', 'input')
    expect(firstNameInput).toHaveAttribute('name', 'first_name')
    expect(firstNameInput).toHaveAttribute('placeholder', 'First Name')
    expect(firstNameInput).toHaveAttribute('required')
    expect(firstNameInput).toHaveAttribute('minlength', '3')
    expect(firstNameInput).toHaveAttribute('maxlength', '30')
    expect(firstNameInput).toHaveAttribute('pattern', '[A-Za-z][A-Za-z0-9\\-]*')
  })

  it('has correct input attributes for last name', () => {
    render(<RegisterForm />)
    
    const lastNameInput = screen.getByLabelText(/last name/i)
    expect(lastNameInput).toHaveAttribute('type', 'input')
    expect(lastNameInput).toHaveAttribute('name', 'last_name')
    expect(lastNameInput).toHaveAttribute('placeholder', 'Last Name')
    expect(lastNameInput).toHaveAttribute('required')
    expect(lastNameInput).toHaveAttribute('minlength', '3')
    expect(lastNameInput).toHaveAttribute('maxlength', '30')
    expect(lastNameInput).toHaveAttribute('pattern', '[A-Za-z][A-Za-z0-9\\-]*')
  })

  it('has correct input attributes for email', () => {
    render(<RegisterForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('name', 'email')
    expect(emailInput).toHaveAttribute('placeholder', 'mail@site.com')
    expect(emailInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('pattern', '[^@\\s]+@[^@\\s]+\\.[^@\\s]+')
  })

  it('has correct input attributes for password', () => {
    render(<RegisterForm />)
    
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('name', 'password')
    expect(passwordInput).toHaveAttribute('placeholder', 'Password')
    expect(passwordInput).toHaveAttribute('required')
    expect(passwordInput).toHaveAttribute('minlength', '7')
    expect(passwordInput).toHaveAttribute('title', 'Must be more than 7 characters, including numbers, letters and symbols')
  })

  it('toggles password visibility when eye icon is clicked', () => {
    render(<RegisterForm />)
    
    const passwordInput = screen.getByLabelText(/password/i)
    const toggleButton = screen.getByRole('button', { name: /can't view password icon/i })
    
    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    // Click to show password
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')
    
    // The button image should change
    expect(screen.getByAltText(/can view password icon/i)).toBeInTheDocument()
    
    // Click to hide password again
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(screen.getByAltText(/can't view password icon/i)).toBeInTheDocument()
  })

  it('displays validation hints for form inputs', () => {
    render(<RegisterForm />)
    
    expect(screen.getAllByText('Must be 3 to 30 characters long')).toHaveLength(2) // First and last name
    expect(screen.getByText('Enter valid email address')).toBeInTheDocument()
    expect(screen.getByText(/Must be more than 7 characters, including/)).toBeInTheDocument()
    expect(screen.getByText('At least one number')).toBeInTheDocument()
    expect(screen.getByText('At least one letter')).toBeInTheDocument()
    expect(screen.getByText('At least one symbol')).toBeInTheDocument()
  })

  it('displays validation errors when provided by form state', () => {
    const mockUseFormState = require('react-dom').useFormState
    mockUseFormState.mockReturnValue([
      {
        errors: {
          first_name: ['First name is required.'],
          last_name: ['Last name is required.'],
          email: ['Please enter a valid email.'],
          password: ['Password must be at least 8 characters long', 'Password must contain at least one letter'],
        },
      },
      jest.fn(),
    ])

    render(<RegisterForm />)
    
    expect(screen.getByText('First name is required.')).toBeInTheDocument()
    expect(screen.getByText('Last name is required.')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument()
    
    // Password errors should be displayed as a list
    expect(screen.getByText('Password must:')).toBeInTheDocument()
    expect(screen.getByText('- Password must be at least 8 characters long')).toBeInTheDocument()
    expect(screen.getByText('- Password must contain at least one letter')).toBeInTheDocument()
  })

  it('displays general submit error when provided', () => {
    const mockUseFormState = require('react-dom').useFormState
    mockUseFormState.mockReturnValue([
      {
        errors: {
          submit: ['Email already exists. Please try with a different email.'],
        },
      },
      jest.fn(),
    ])

    render(<RegisterForm />)
    
    expect(screen.getByText('Email already exists. Please try with a different email.')).toBeInTheDocument()
  })

  it('shows loading state when form is submitting', () => {
    const mockUseFormStatus = require('react-dom').useFormStatus
    mockUseFormStatus.mockReturnValue({ pending: true })

    render(<RegisterForm />)
    
    const submitButton = screen.getByRole('button', { name: /submitting/i })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent('Submitting...')
    expect(submitButton).toHaveClass('btn-disabled')
  })

  it('shows normal state when form is not submitting', () => {
    const mockUseFormStatus = require('react-dom').useFormStatus
    mockUseFormStatus.mockReturnValue({ pending: false })

    render(<RegisterForm />)
    
    const submitButton = screen.getByRole('button', { name: /sign up/i })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).not.toBeDisabled()
    expect(submitButton).toHaveTextContent('Sign up')
    expect(submitButton).not.toHaveClass('btn-disabled')
  })

  it('allows typing in form inputs', () => {
    render(<RegisterForm />)
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } })
    
    expect(firstNameInput).toHaveValue('John')
    expect(lastNameInput).toHaveValue('Doe')
    expect(emailInput).toHaveValue('john.doe@example.com')
    expect(passwordInput).toHaveValue('Password123!')
  })

  it('has proper form structure and accessibility', () => {
    render(<RegisterForm />)
    
    // Check that all inputs have proper labels
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    
    // Check that the form exists
    const form = document.querySelector('form')
    expect(form).toBeInTheDocument()
    
    // Check that submit button is accessible
    const submitButton = screen.getByRole('button', { name: /sign up/i })
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('maintains form state when password visibility is toggled', () => {
    render(<RegisterForm />)
    
    const passwordInput = screen.getByLabelText(/password/i)
    const toggleButton = screen.getByRole('button', { name: /can't view password icon/i })
    
    // Enter password
    fireEvent.change(passwordInput, { target: { value: 'TestPassword123!' } })
    expect(passwordInput).toHaveValue('TestPassword123!')
    
    // Toggle visibility
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveValue('TestPassword123!') // Value should remain
    
    // Toggle back
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveValue('TestPassword123!') // Value should still remain
  })

  it('renders password hint when no password errors are present', () => {
    render(<RegisterForm />)
    
    // Should show hint text when no errors
    expect(screen.getByText(/Must be more than 7 characters, including/)).toBeInTheDocument()
    expect(screen.getByText('At least one number')).toBeInTheDocument()
    expect(screen.getByText('At least one letter')).toBeInTheDocument()
    expect(screen.getByText('At least one symbol')).toBeInTheDocument()
  })

  it('replaces password hint with error list when password errors exist', () => {
    const mockUseFormState = require('react-dom').useFormState
    mockUseFormState.mockReturnValue([
      {
        errors: {
          password: ['Password must be at least 8 characters long', 'Password must contain a special character'],
        },
      },
      jest.fn(),
    ])

    render(<RegisterForm />)
    
    // Should show error list instead of hint
    expect(screen.getByText('Password must:')).toBeInTheDocument()
    expect(screen.getByText('- Password must be at least 8 characters long')).toBeInTheDocument()
    expect(screen.getByText('- Password must contain a special character')).toBeInTheDocument()
    
    // Should not show the hint text
    expect(screen.queryByText(/Must be more than 7 characters, including/)).not.toBeInTheDocument()
  })
})
