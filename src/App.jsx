import "./App.css";
import { WeatherProvider } from "./context/WeatherProvider";
import { HomePage } from "./page";

function App() {
  return (
    <WeatherProvider>
      <HomePage />
    </WeatherProvider>
  );
}

export default App;
