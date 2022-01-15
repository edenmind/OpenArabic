import { describe, it, jest } from '@jest/globals';
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6

jest.useFakeTimers();

import React from 'react';

import App from '../App';

describe('<App />', () => {
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer();
    renderer.render(<App />);
  });
});
