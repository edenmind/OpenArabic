jest.useFakeTimers();

import React from 'react';
import renderer from 'react-test-renderer';

import TextArabic from '../screens/Texts/Text/TextArabic';

describe('<TextArabic />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<TextArabic />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});
