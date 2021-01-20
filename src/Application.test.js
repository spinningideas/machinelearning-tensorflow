import React from 'react';
import { render } from '@testing-library/react';
import Application from './Application';

test('renders welcome text', () => {
  const { getByText } = render(<Application />);
  const linkElement = getByText(/welcome/i);
  expect(linkElement).toBeInTheDocument();
});
