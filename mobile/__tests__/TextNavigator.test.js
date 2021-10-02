jest.useFakeTimers();

import React from 'react';
import renderer from 'react-test-renderer';

import TextNavigator from '../screens/Texts/TextNavigator';

describe('<TextNavigator />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<TextNavigator />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
