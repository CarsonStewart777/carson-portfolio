import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App navigation', () => {
  test('renders home page by default and navigates to about page', () => {
    render(<App />);

    // Verify Home page content is rendered initially
    expect(screen.getByText(/Hello, I'm Carson/i)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /About Me/i })).not.toBeInTheDocument();

    // Click on the 'About' navigation link
    fireEvent.click(screen.getByRole('button', { name: 'About' }));

    // Verify About page content is rendered after clicking 'About'
    expect(screen.getByRole('heading', { name: /About Me/i })).toBeInTheDocument();
    expect(screen.queryByText(/Hello, I'm Carson/i)).not.toBeInTheDocument();
  });
});
