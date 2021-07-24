import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import ShallowRenderer from 'react-test-renderer/shallow';
import { browserHistory, MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { PersistGate } from 'redux-persist/integration/react';
import App from '../index';
import configureStore from '../../../configureStore';
import { ROUTES } from '../../constants';
import StorageService from '../../../utils/StorageService';
import { TOKEN_KEY } from '../../../utils/constants';

// let store;
let prevStore;
let prevPersistor;
const renderer = new ShallowRenderer();
const componentWrapper = () =>
  render(
    <Provider store={prevStore}>
      <PersistGate persistor={prevPersistor}>
        <IntlProvider locale="en">
          <MemoryRouter initialEntries={[ROUTES.TEST_ADMIN_PAGE]}>
            <App />
          </MemoryRouter>
        </IntlProvider>
      </PersistGate>
    </Provider>,
  );

describe('<App />', () => {
  beforeAll(() => {
    // store = configureStore({}, browserHistory);
    const { store, persistor } = configureStore({}, browserHistory);
    prevStore = store;
    prevPersistor = persistor;
    StorageService.set(TOKEN_KEY, 'TOKENVALUE');
  });
  it('should render and match the snapshot', () => {
    renderer.render(<App />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
  it('should render Div', () => {
    const { container } = componentWrapper();
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('DIV');
  });
});
