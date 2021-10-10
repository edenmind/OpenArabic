import { expect, describe, it, jest } from '@jest/globals';

jest.useFakeTimers();

import React from 'react';
import renderer from 'react-test-renderer';

import Settings from '../screens/About/AboutNavigator';

describe('<Settings />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Settings />).toJSON();
    // @ts-ignore
    expect(tree.children.length).toBe(1);
  });
});
