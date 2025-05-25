// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from "react";
import "./App.css";
import ErrorBoundary from "./components/Errors/ErrorBoundary";
import Navbar from "./components/Navbar";
import Client from "./components/Pages/Client";
import Frais from "./components/Pages/Frais";
import Taux from "./components/Pages/Taux";

const pages = ["envoyer", <Client />, <Taux />, <Frais />];
function App() {
  const [page, setPage] = useState(0);
  return (
    <div className="font-mono">
      <Navbar handlepage={setPage} />
      <ErrorBoundary>
        {/* <Client /> */}
        {/* <Taux></Taux> */}
        {/* <Frais/> */}
        {pages[page]}
      </ErrorBoundary>
    </div>
  );
}

export default App;
