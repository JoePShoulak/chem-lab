// client/src/pages/Reference.jsx
import { useState } from "react";
import CompoundDetails from "../components/CompoundDetails"; // make sure path is correct
import "./Reference.scss";
import { getCompoundByName } from "../api/rsc";

export default function Reference() {
  const [name, setName] = useState("");
  const [compound, setCompound] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setCompound(null);
    try {
      const compoundData = await getCompoundByName(name);
      setCompound(compoundData);
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
      {compound && <CompoundDetails compound={compound} />}
    </div>
  );
}
