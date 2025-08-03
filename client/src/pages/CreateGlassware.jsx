import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/glassware";

export default function CreateGlassware() {
  const [capacity, setCapacity] = useState("");
  const categories = [
    "Boiling Flask",
    "Erlenmeyer Flask",
    "Filtering Flask",
    "Filtering Funnel",
    "Addition Funnel",
    "Separation Funnel",
    "Griffin Beaker",
    "Graduated Cylinder",
    "Test Tube",
    "Condenser",
    "Watch Glass",
  ];
  const [category, setCategory] = useState(categories[0]);
  const [brand, setBrand] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        capacity: Number(capacity),
        category,
        brand,
      }),
    });
    navigate("/inventory");
  };

  return (
    <div>
      <h2>Add Glassware</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
          placeholder="Capacity (mL)"
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          value={brand}
          onChange={e => setBrand(e.target.value)}
          placeholder="Brand"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
