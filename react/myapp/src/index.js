// 1) Import React and ReactDOM libraries
import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Pages/FormPage/store'


// 2) Get a reference to the Div with id root
const el = document.getElementById('root');

// 3) Tell React to take control of that element
const root = ReactDom.createRoot(el)

// 4) Show the component on the screen
root.render(<Provider store={store}><App /></Provider>)