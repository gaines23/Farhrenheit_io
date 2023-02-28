import  ReactDOM from 'react';
import { Provider } from 'react-redux';

import EcstaApp from './EcstaApp';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <EcstaApp />
    </Provider>
)