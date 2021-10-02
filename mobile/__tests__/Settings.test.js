jest.useFakeTimers();

import React from 'react';
import renderer from 'react-test-renderer';

import Settings from '../screens/Settings/Settings';

describe('<Settings />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Settings />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});
