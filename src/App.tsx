import { useState } from "react";
import "./App.css";
import ErrorBoundary from "./components/Errors/ErrorBoundary";
import Navbar from "./components/Navbar";
import Client from "./components/Pages/Client";
import Frais from "./components/Pages/Frais";
import Taux from "./components/Pages/Taux";
import Envoyer from "./components/Pages/Envoyer";

const pages = [<Envoyer />, <Client />, <Taux />, <Frais />];
function App() {
  const [page, setPage] = useState(0);
  return (
    <div className="font-mono">
      <Navbar handlepage={setPage} />
      <ErrorBoundary>{pages[page]}</ErrorBoundary>
    </div>
  );
}

export default App;
