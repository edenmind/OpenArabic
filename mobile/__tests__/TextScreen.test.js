jest.useFakeTimers();

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import TextScreen from '../screens/Texts/Text/TextScreen';
import configureStore from 'redux-mock-store';

describe('<TextScreen />', () => {
  const mockStore = configureStore([]);
  const store = mockStore({ text: [{ textId: 1 }] });
  it('has 1 child', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <TextScreen />
        </Provider>,
      )
      .toJSON();
    expect(tree.children.length).toBe(1);
  });
});
