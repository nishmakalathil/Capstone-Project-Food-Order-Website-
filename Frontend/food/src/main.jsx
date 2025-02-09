// index.js

// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import Tailwind CSS
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js'; // Default import (no curly braces)

// Create root and render the app
createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Correct usage of <Provider> */}
    <App />  {/* Render the App component */}
  </Provider>
);
