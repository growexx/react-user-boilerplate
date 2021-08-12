import React from 'react';
import { render } from 'react-testing-library';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';
// import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import ConnectedLanguageProvider, { LanguageProvider } from '../index';
import configureStore from '../../../configureStore';

import { translationMessages } from '../../../i18n';

const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message',
  },
});

describe('<LanguageProvider />', () => {
  it('should render its children', () => {
    const children = <h1>Test</h1>;
    const { container } = render(
      <LanguageProvider messages={messages} locale="en">
        {children}
      </LanguageProvider>,
    );
    expect(container.firstChild).not.toBeNull();
  });
});

describe('<ConnectedLanguageProvider />', () => {
  let prevStore;
  let prevPersistor;

  beforeAll(() => {
    // store = configureStore({}, browserHistory);
    const { store, persistor } = configureStore({}, browserHistory);
    prevStore = store;
    prevPersistor = persistor;
  });

  it('should render the default language messages', () => {
    const { queryByText } = render(
      <Provider store={prevStore}>
        <PersistGate persistor={prevPersistor}>
          <ConnectedLanguageProvider messages={translationMessages}>
            <FormattedMessage {...messages.someMessage} />
          </ConnectedLanguageProvider>
        </PersistGate>
      </Provider>,
    );
    expect(queryByText(messages.someMessage.defaultMessage)).not.toBeNull();
  });
});
