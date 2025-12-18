import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Import the AuthProvider we created in Step 2
import { AuthProvider } from './app/context/AuthContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* By wrapping App in AuthProvider, every component inside App can now access user data */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);