import { useState } from "react";
import axios from "axios";

function App() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  
  const [directRoutes, setDirectRoutes] = useState([]);
  const [transferRoutes, setTransferRoutes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!source || !destination) {
      alert("Please enter source and destination");
      return;
    }

    setIsLoading(true);
    setHasSearched(false);

    try {
      const res = await axios.post("http://127.0.0.1:3000/find-route", {
        source: source.trim().toLowerCase(),
        destination: destination.trim().toLowerCase()
      });

      console.log("Response:", res.data); // debug

      setDirectRoutes(res.data.direct || []);
      setTransferRoutes(res.data.transfer || []);
      setHasSearched(true);
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data.message || "Server error");
      } else {
        alert("Backend not reachable");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h2 className="title">Route<span className="text-primary">Finder</span></h2>
        <p className="subtitle">Discover the best bus routes in Bengaluru</p>

        <form onSubmit={handleSearch} className="search-form">
          <div className="input-group">
            <label>Source</label>
            <input
              type="text"
              placeholder="e.g. Majestic"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>

          <div className="icon-separator">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>

          <div className="input-group">
            <label>Destination</label>
            <input
              type="text"
              placeholder="e.g. Silk Board"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <button type="submit" className="search-btn" disabled={isLoading}>
            {isLoading ? "Searching..." : "Find Route"}
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="results-container">
          {/* Direct Routes */}
          {directRoutes.length > 0 && (
            <div className="result-section">
              <h3 className="section-title">Direct Routes</h3>
              <div className="routes-grid">
                {directRoutes.map((route, index) => (
                  <div key={`direct-${index}`} className={`route-card ${index === 0 ? 'best-route' : ''}`}>
                    {index === 0 && <div className="badge">⭐ Best Route</div>}
                    <div className="route-info">
                      <div className="bus-icon">🚌</div>
                      <div>
                        <div className="bus-number">{route.bus_no}</div>
                        <div className="bus-type">Direct Bus</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transfer Routes */}
          {transferRoutes.length > 0 && (
            <div className="result-section">
              <h3 className="section-title">Transfer Routes</h3>
              <div className="routes-grid">
                {transferRoutes.map((route, index) => (
                  <div key={`transfer-${index}`} className="route-card transfer-card">
                    <div className="transfer-flow">
                      <div className="flow-item">
                        <div className="bus-number small">{route.from}</div>
                      </div>
                      <div className="flow-separator">
                        <span className="stop-name" title={route.changeAt}>{route.changeAt}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 16 16 12 12 8"></polyline>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </div>
                      <div className="flow-item">
                        <div className="bus-number small">{route.to}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {directRoutes.length === 0 && transferRoutes.length === 0 && (
            <div className="no-results card">
              <p>No routes found between these locations. Try different stops.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;