
/*
  File: src/App.js
  Description: File defines the main `App` component for the React application.
  Imports necessary components and CSS files, and renders the layout structure of the application.

   - Imports:
     - `React`, `useState`, `useEffect` from 'react' for React functionality.
     - `./App.css` for styling the application.
     - `Header` component from './components/Header/Header' for the top navigation/header.
     - `Main` component from './Main' for the main content area.
     - `Footer` component from './components/Footer/Footer' for the bottom navigation/footer.
     - `AudioController` component from './components/AudioController/AudioController' for controlling audio playback.

   - `App` Component:
     - Renders a `div` with the class name "App" containing the `Header`, `Main`, `AudioController`, and `Footer` components.
*/

// general
import React, { useState, useEffect } from 'react';

// CSS
import './App.css';

// components
import Header from './components/Header/Header';
import Main from './Main';
import Footer from './components/Footer/Footer';
import AudioController from './components/AudioController/AudioController';

function App() {

  return (
    <div className="App" data-testid="App">
      <Header />
      < Main />
      <AudioController />
      <Footer />
    </div>
  );
};

export default App;
