import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock auth service and context
vi.mock('../services/authService', () => ({
  login: vi.fn(),
}));
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));
// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

import { login as loginService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';

describe('LoginPage', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ login: vi.fn() });
  });

  it('renders email and password inputs', () => {
    render(<MemoryRouter><LoginPage /></MemoryRouter>);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('shows an error message on failed login', async () => {
    loginService.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    render(<MemoryRouter><LoginPage /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'bad@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    );
  });
});
