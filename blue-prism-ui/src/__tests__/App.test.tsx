import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../App';

expect.extend(toHaveNoViolations);

describe('The App Component', () => {
  test('should render header', () => {
    render(<App />);
    const headerElement = screen.getByText('Schedule List & Log Entries');
    expect(headerElement).toBeInTheDocument();
  });

  test('should render footer', () => {
    render(<App />);
    const headerElement = screen.getByText('Blue Prism Assignment');
    expect(headerElement).toBeInTheDocument();
  });

  test("should not have any accessibility violations", async () => {
    const { container } = render(<App />);
    expect(await axe(container)).toHaveNoViolations();
  });
});