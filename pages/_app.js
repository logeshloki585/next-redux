import { Provider } from 'react-redux';
import { makeStore } from '../lib/store';

const store = makeStore();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
