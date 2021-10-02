jest.useFakeTimers();

import React from 'react';
import renderer from 'react-test-renderer';

import TextEnglish from '../screens/Texts/Text/TextEnglish';

describe('<TextEnglish />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<TextEnglish />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});
