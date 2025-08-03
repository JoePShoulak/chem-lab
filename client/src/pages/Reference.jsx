// client/src/pages/Reference.jsx
import { useState } from "react";
import CompoundDetails from "../components/CompoundDetails"; // make sure path is correct
import "./Reference.scss";

export default function Reference() {
  const [name, setName] = useState("");
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const API_URL = "/api/chemical-info";

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      const response = await fetch(
        `${API_URL}/${encodeURIComponent(name)}`
      );

      if (!response.ok) throw new Error("No compound found");

      const data = await response.json();
      setInfo(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="reference-page">
      <h2>Chemical Reference</h2>
      <form onSubmit={handleSubmit} className="reference-form">
        <label>
          Name or formula
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Chemical name or formula"
          />
        </label>
        <button type="submit">Lookup</button>
      </form>

      {error && <p className="error">{error}</p>}
      {info && <CompoundDetails info={info} />}
    </div>
  );
}
