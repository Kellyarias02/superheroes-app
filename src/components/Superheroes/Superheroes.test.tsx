import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../../contexts/authContext';
import Superheroes from './Superheroes';

// Mock del AuthProvider
vi.mock('../../contexts/authContext', () => ({
  useAuth: () => ({ token: 'mock-token', logout: vi.fn() }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Superheroes Component', () => {
  it('renders loading state', () => {
    render(
      <AuthProvider>
        <Superheroes />
      </AuthProvider>
    );

    //Este test verifica que se muestre el texto de carga
    expect(screen.getByText(/Cargando superhéroes/i)).toBeInTheDocument();
  });
});
