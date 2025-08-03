import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Glassware.scss";

const API_URL = "/api/glassware";

export default function CreateGlassware() {
  const [capacity, setCapacity] = useState("");
  const categories = [
    "Boiling Flask",
    "Erlenmeyer Flask",
    "Griffin Beaker",
    "Graduated Cylinder",
    "Addition Funnel",
    "Separation Funnel",
    "Filtering Funnel",
    "Filtering Flask",
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
    navigate("/inventory?type=glassware");
  };

  return (
    <div>
      <h2>Add Glassware</h2>
      <form className="glassware-form" onSubmit={handleSubmit}>
        <label>
          Capacity (mL)
          <input
            type="number"
            value={capacity}
            onChange={e => setCapacity(e.target.value)}
          />
        </label>
        <label>
          Category
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label>
          Brand
          <input
            value={brand}
            onChange={e => setBrand(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
