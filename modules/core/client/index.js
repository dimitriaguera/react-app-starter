/**
 * Created by Dimitri Aguera on 30/08/2017.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import Boot from './components/boot.jsx'

ReactDOM.render((
    <Provider store={store}>
            <Boot />
    </Provider>
), document.getElementById('root'));