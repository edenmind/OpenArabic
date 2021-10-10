import { expect, describe, it, jest } from '@jest/globals';

jest.useFakeTimers();

import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    // @ts-ignore
    expect(tree.children.length).toBe(1);
  });
});
