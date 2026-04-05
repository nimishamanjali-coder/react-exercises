import "./App.css";
import ToggleMessage from "./MessageToggle";
import CharExceedWarning from "./CharExceedWarning";
import SwitchToggle from "./SwitchToggle";
function App() {
  return (
    <div>
      <>Hello world!</>
      <ToggleMessage />
      <br />

      <CharExceedWarning />
      <SwitchToggle></SwitchToggle>
    </div>
  );
}

export default App;
