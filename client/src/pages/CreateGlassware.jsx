import { useState } from "react";

const API_URL = "http://localhost:5000/glassware";

export default function CreateGlassware() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [shape, setShape] = useState("");
  const [brand, setBrand] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, capacity, shape, brand })
    });
    window.location.hash = "#/glassware";
  };

  return (
    <div>
      <h2>Add Glassware</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Capacity"
        />
        <input
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          placeholder="Shape"
        />
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
