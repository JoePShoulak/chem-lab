// client/src/pages/Reference.jsx
import { useState } from "react";
import CompoundDetails from "../components/CompoundDetails"; // make sure path is correct

export default function Reference() {
  const [name, setName] = useState("");
  const [compound, setCompound] = useState(null);
  const [error, setError] = useState(null);
  const pubchem = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";

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
    <div>
      <h2>Chemical Reference</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Chemical name or formula"
        />
        <button type="submit">Lookup</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {compound && <CompoundDetails compound={compound} />}
    </div>
  );
}
