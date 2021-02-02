import React from 'react';
import { waitFor } from "@testing-library/dom"
import { render } from '@testing-library/react';
import App from './App';

test('How the heck do I mock a window.fetch function?', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => [{ title: "Princess Mononoke" }]}))

  const { getByText, debug, findByText } = render(<App />);
  const items = await findByText(/mononoke/i)
  // toHaveTextContent is part of the expanded jest-dom library
  expect(items).toHaveTextContent(/Princess Mononoke/i)
});
