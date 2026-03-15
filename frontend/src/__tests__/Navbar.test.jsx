import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock the AuthContext so we don't need a real provider
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: null, loading: false, login: vi.fn(), logout: vi.fn() }),
}));

import Navbar from '../components/Navbar';

describe('Navbar', () => {
  it('renders the brand name', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/ReservaFácil/i)).toBeInTheDocument();
  });

  it('shows Login and Register links when logged out', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});
