/**
 *
 * Tests for RichTextEditor
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { EditorState } from 'draft-js';
import { ConnectedRouter } from 'connected-react-router';
import { browserHistory } from 'react-router-dom';
import history from 'utils/history';
import { PersistGate } from 'redux-persist/integration/react';
import RichTextEditor from '../index';
import configureStore from '../../../configureStore';

// let store;
let prevStore;
let prevPersistor;
const props = {
  value: EditorState.createEmpty(),
  onChange: jest.fn(),
};

const componentWrapper = () =>
  render(
    <Provider store={prevStore}>
      <PersistGate persistor={prevPersistor}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <RichTextEditor {...props} />
          </ConnectedRouter>
        </IntlProvider>
      </PersistGate>
    </Provider>,
  );

describe('<RichTextEditor />', () => {
  beforeAll(() => {
    // store = configureStore({}, browserHistory);
    const { store, persistor } = configureStore({}, browserHistory);
    prevStore = store;
    prevPersistor = persistor;
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
