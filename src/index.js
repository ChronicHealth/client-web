// @flow
import React from 'react';
import { render } from 'react-dom';
import App from './App'

const renderFunc = (Comp)=>render(<Comp />, document.getElementById('root'));

renderFunc(App);

if(module.hot) {
	module.hot.accept('./App', () => {
		const NewApp = require('./App').default;
		renderFunc(NewApp);
	});
}