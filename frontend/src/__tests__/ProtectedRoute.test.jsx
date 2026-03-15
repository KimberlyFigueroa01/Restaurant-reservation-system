import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../context/AuthContext';

describe('ProtectedRoute', () => {
  it('shows loading indicator while auth is resolving', () => {
    useAuth.mockReturnValue({ user: null, loading: true });
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>protected</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    useAuth.mockReturnValue({ user: { id: 1, name: 'Alice' }, loading: false });
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>secret content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.getByText('secret content')).toBeInTheDocument();
  });

  it('redirects to /login when user is not authenticated', () => {
    useAuth.mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter initialEntries={['/reservations']}>
        <ProtectedRoute>
          <div>secret content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.queryByText('secret content')).not.toBeInTheDocument();
  });
});
