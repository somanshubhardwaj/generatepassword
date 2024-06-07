// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables for user inputs
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  // Character sets
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // Password generation function
  const generatePassword = () => {
    let availableCharacters = '';

    if (includeUppercase) availableCharacters += uppercaseLetters;
    if (includeLowercase) availableCharacters += lowercaseLetters;
    if (includeNumbers) availableCharacters += numbers;
    if (includeSymbols) availableCharacters += symbols;

    if (!availableCharacters) {
      alert('Please select at least one character type.');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableCharacters.length);
      password += availableCharacters[randomIndex];
    }

    setGeneratedPassword(password);
    evaluateStrength(password);
  };

  // Function to copy password to clipboard
  const copyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword)
        .then(() => alert('Password copied to clipboard!'))
        .catch(err => console.error('Failed to copy text: ', err));
    }
  };

  // Function to evaluate password strength
  const evaluateStrength = (password) => {
    let strength = '';
    const lengthCriteria = password.length >= 12;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const symbolCriteria = /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password);

    const criteriaMet = [
      lengthCriteria,
      uppercaseCriteria,
      lowercaseCriteria,
      numberCriteria,
      symbolCriteria
    ].filter(Boolean).length;

    if (criteriaMet <= 2) {
      strength = 'Weak';
    } else if (criteriaMet === 3) {
      strength = 'Medium';
    } else if (criteriaMet >= 4) {
      strength = 'Strong';
    }

    setPasswordStrength(strength);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Password Generator</h1>
      </header>
      <main>
        <div className="settings">
          <div>
            <label>Password Length:</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min="1"
              max="128"
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              Include Uppercase Letters
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              Include Lowercase Letters
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              Include Numbers
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              Include Symbols
            </label>
          </div>
        </div>
        <button onClick={generatePassword}>Generate Password</button>
        <div className="result">
          <h2>Generated Password:</h2>
          <p>{generatedPassword}</p>
          {generatedPassword && (
            <div>
              <button onClick={copyToClipboard}>Copy to Clipboard</button>
            </div>
          )}
          <div className={`strength ${passwordStrength.toLowerCase()}`}>
            Strength: {passwordStrength}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
