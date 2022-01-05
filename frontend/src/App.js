import "./App.css";

async function fetchButton() {
  let data = await fetch("http://localhost:8080/locations");
  let js = await data.json();
  console.log(js);
}

function App() {
  return (
    <div className="App">
      <button onClick={fetchButton}>Nouda</button>
    </div>
  );
}

export default App;
