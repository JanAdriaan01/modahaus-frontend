import React from 'react';
import './App.css';
import EmailForm from './EmailForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Email App</h1>
        <p>Test our email functionality</p>
      </header>
      <main>
        <EmailForm />
      </main>
    </div>
  );
}

export default App;