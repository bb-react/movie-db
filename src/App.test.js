import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from 'redux-mock-store';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

const mockStore = configureStore({});

describe('React-Redux Components', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
