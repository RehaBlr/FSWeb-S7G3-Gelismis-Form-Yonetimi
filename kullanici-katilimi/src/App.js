import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import Form2 from "./components/Form2";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Form />
        {/* <Form2 /> */}
      </header>
    </div>
  );
}

export default App;
