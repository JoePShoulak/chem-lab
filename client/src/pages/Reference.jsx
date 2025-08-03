import { useState } from "react";

export default function Reference() {
  const [name, setName] = useState("");
  const pubchem = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/";

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`${pubchem}/compound/name/${name}/JSON`);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h2>Chemical Reference</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Chemical name"
        />
        <button type="submit">Lookup</button>
      </form>
    </div>
  );
}
