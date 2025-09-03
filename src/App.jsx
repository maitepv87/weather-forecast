import "./App.css";
import { AsyncProvider } from "./context/AsyncContext";
import { HomePage } from "./page";

function App() {
  return (
    <AsyncProvider>
      <HomePage />
    </AsyncProvider>
  );
}

export default App;
