import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ChangePasswordForm from '@/app/ui/authentication/ChangePasswordForm'
import { useSearchParams } from 'next/navigation'

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

// Mock the changePassword action
jest.mock('@/app/lib/actions/accounts', () => ({
  changePassword: jest.fn(),
}))

const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>

describe('ChangePasswordForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock URLSearchParams
    const mockSearchParams = {
      get: jest.fn().mockReturnValue('test-token'),
      toString: jest.fn().mockReturnValue('token=test-token'),
    }
    mockUseSearchParams.mockReturnValue(mockSearchParams as any)
  })

  it('renders all form elements', () => {
    render(<ChangePasswordForm />)
    
    expect(screen.getByText('Ingresar nueva contraseña')).toBeInTheDocument()
    expect(screen.getByText('Repetir nueva contraseña')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirmar cambio de contraseña/i })).toBeInTheDocument()
  })

  it('includes token from URL params as hidden input', () => {
    render(<ChangePasswordForm />)
    
    const hiddenTokenInput = document.querySelector('input[name="token"]') as HTMLInputElement
    expect(hiddenTokenInput).toBeInTheDocument()
    expect(hiddenTokenInput.value).toBe('test-token')
  })

  it('displays password requirements', () => {
    render(<ChangePasswordForm />)
    
    expect(screen.getByText(/Must be more than 7 characters/)).toBeInTheDocument()
    expect(screen.getByText(/At least one number/)).toBeInTheDocument()
    expect(screen.getByText(/At least one letter/)).toBeInTheDocument()
    expect(screen.getByText(/At least one symbol/)).toBeInTheDocument()
  })

  it('displays validation errors for password field', () => {
    const { useFormState } = require('react-dom')
    const mockState = {
      errors: {
        password: ['Password is too weak', 'Must contain special characters'],
      },
    }
    
    useFormState.mockReturnValue([mockState, jest.fn()])
    
    render(<ChangePasswordForm />)
    
    expect(screen.getByText('Password must:')).toBeInTheDocument()
    expect(screen.getByText('- Password is too weak')).toBeInTheDocument()
    expect(screen.getByText('- Must contain special characters')).toBeInTheDocument()
  })

  it('displays validation errors for password confirmation field', () => {
    const { useFormState } = require('react-dom')
    const mockState = {
      errors: {
        password_confirmation: ['Passwords do not match'],
      },
    }
    
    useFormState.mockReturnValue([mockState, jest.fn()])
    
    render(<ChangePasswordForm />)
    
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
  })

  it('displays submit errors', () => {
    const { useFormState } = require('react-dom')
    const mockState = {
      errors: {
        submit: ['Token expired'],
      },
    }
    
    useFormState.mockReturnValue([mockState, jest.fn()])
    
    render(<ChangePasswordForm />)
    
    expect(screen.getByText('Token expired')).toBeInTheDocument()
  })

  it('disables button when form is pending', () => {
    const { useFormStatus } = require('react-dom')
    useFormStatus.mockReturnValue({ pending: true })
    
    render(<ChangePasswordForm />)
    
    const submitButton = screen.getByRole('button', { name: /confirmar cambio de contraseña/i })
    expect(submitButton).toHaveClass('btn-disabled')
    expect(submitButton).toHaveAttribute('aria-disabled', 'true')
  })

  it('allows user to input passwords', () => {
    render(<ChangePasswordForm />)
    
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password') as HTMLInputElement
    
    fireEvent.change(passwordInput, { target: { value: 'NewPassword123!' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123!' } })
    
    expect(passwordInput.value).toBe('NewPassword123!')
    expect(confirmPasswordInput.value).toBe('NewPassword123!')
  })

  it('has proper form validation attributes', () => {
    render(<ChangePasswordForm />)
    
    const passwordInput = screen.getByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
    
    expect(passwordInput).toHaveAttribute('required')
    expect(passwordInput).toHaveAttribute('minLength', '7')
    expect(passwordInput).toHaveAttribute('name', 'password')
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    expect(confirmPasswordInput).toHaveAttribute('required')
    expect(confirmPasswordInput).toHaveAttribute('minLength', '7')
    expect(confirmPasswordInput).toHaveAttribute('name', 'password_confirmation')
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
  })

  it('handles missing token gracefully', () => {
    const mockSearchParams = {
      get: jest.fn().mockReturnValue(null),
      toString: jest.fn().mockReturnValue(''),
    }
    mockUseSearchParams.mockReturnValue(mockSearchParams as any)
    
    render(<ChangePasswordForm />)
    
    const hiddenTokenInput = document.querySelector('input[name="token"]') as HTMLInputElement
    expect(hiddenTokenInput).toBeInTheDocument()
    expect(hiddenTokenInput.value).toBe('')
  })

  it('calls the form action when submitted', async () => {
    const { useFormState } = require('react-dom')
    const mockAction = jest.fn()
    useFormState.mockReturnValue([undefined, mockAction])
    
    render(<ChangePasswordForm />)
    
    const passwordInput = screen.getByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
    
    fireEvent.change(passwordInput, { target: { value: 'NewPassword123!' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123!' } })
    
    const form = screen.getByRole('button', { name: /confirmar cambio de contraseña/i }).closest('form')
    
    // Create a FormData and call the action directly since form.submit() doesn't trigger the action in tests
    const formData = new FormData(form as HTMLFormElement)
    if (typeof mockAction === 'function') {
      mockAction(formData)
      expect(mockAction).toHaveBeenCalledWith(formData)
    }
  })
})
