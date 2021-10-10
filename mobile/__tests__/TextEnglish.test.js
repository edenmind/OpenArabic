import { expect, describe, it, jest } from '@jest/globals';

jest.useFakeTimers();

import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { store } from '../redux/store';
import TextEnglish from '../screens/Texts/Text/TextEnglish';

describe('<TextEnglish />', () => {
  it('has 1 child', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <TextEnglish />
        </Provider>,
      )
      .toJSON();
    // @ts-ignore
    expect(tree.children.length).toBe(1);
  });
});
