// client/src/pages/Reference.jsx
import { useState } from "react";
import CompoundDetails from "../components/CompoundDetails"; // make sure path is correct
import "./Reference.scss";

export default function Reference() {
  const [name, setName] = useState("");
  const [compound, setCompound] = useState(null);
  const [error, setError] = useState(null);
  const pubchem = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";
  // TODO: Get physical characteristics like boiling and melting point from somewhere like: https://www.chemspider.com/
  // TODO: Get related reactions from somewhere like: https://docs.open-reaction-database.org/

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setCompound(null);
    try {
      const response = await fetch(
        `${pubchem}/compound/name/${encodeURIComponent(name)}/JSON`
      );

      if (!response.ok) throw new Error("No compound found");

      const data = await response.json();
      const compoundData = data?.PC_Compounds?.[0];

      if (!compoundData) throw new Error("No compound found");

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
