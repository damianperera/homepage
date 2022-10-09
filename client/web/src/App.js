import logo from './logo.svg';
import './App.css';

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
        <form action="https://www.google.com/search" class="searchform" method="get" name="searchform">
          <input autocomplete="on" class="form-control search" name="q" placeholder="Search Google or type a URL" required="required"  type="text" />
          <button class="button" type="submit">Search</button>
        </form>
      </header>
    </div>
  );
}

export default App;
