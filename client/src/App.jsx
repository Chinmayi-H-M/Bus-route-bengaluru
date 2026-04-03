import { useState } from "react";
import axios from "axios";

function App() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = async () => {
  if (!source || !destination) {
    alert("Please enter source and destination");
    return;
  }

  try {
    const res = await axios.post("http://127.0.0.1:3000/find-route", {
      source: source.trim(),
      destination: destination.trim()
    });

    console.log("Response:", res.data); // debug

    // Adjust based on backend response
    setResult(res.data.routes || res.data.result || []);
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      alert(error.response.data.message || "Server error");
    } else {
      alert("Backend not reachable");
    }
  }
};
  return (
    <div style={{ padding: "20px" }}>
      <h2>Bus Route Finder</h2>

      <input
        type="text"
        placeholder="Enter Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSearch}>Search</button>

      <h3>Results:</h3>

      {result.length > 0 ? (
        result.map((bus, index) => (
          <div key={index}>
            <p>Bus No: {bus.bus_no}</p>
          </div>
        ))
      ) : (
        <p>No results</p>
      )}
    </div>
  );
}

export default App;