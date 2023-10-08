import './App.css';

fetch("http://127.0.0.1:5000/ask")
  .then(response => response.json())
  .then(data => console.log(data.answers));

function App() {
  return (
    <h1>Hello</h1>
  );
}

export default App;
