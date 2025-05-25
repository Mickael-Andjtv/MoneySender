// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import ErrorBoundary from "./components/Errors/ErrorBoundary";
import Navbar from "./components/Navbar";
import Client from "./components/Pages/Client";

function App() {
  return (
    <div className="font-mono">
      <Navbar />
      <ErrorBoundary>
        <Client />
      </ErrorBoundary>
    </div>
  );
}

export default App;
