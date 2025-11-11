import { render, screen } from '@testing-library/react';
import App from './App';

test('renders My Email App heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/My Email App/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders Send Us a Message heading', () => {
  render(<App />);
  const messageHeading = screen.getByText(/Send Us a Message/i);
  expect(messageHeading).toBeInTheDocument();
});

test('renders email form inputs', () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/Your Name/i);
  const emailInput = screen.getByLabelText(/Your Email/i);
  const submitButton = screen.getByText(/Send Message/i);
  
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});