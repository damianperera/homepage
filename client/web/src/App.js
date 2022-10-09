import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form action="https://www.google.com/search" class="searchform" method="get" name="searchform">
          <input autocomplete="on" class="form-control search" name="q" placeholder="Search Google or type a URL" required="required"  type="text" />
          <button class="button" type="submit">Search</button>
        </form>
      </header>
    </div>
  );
}

export default App;
