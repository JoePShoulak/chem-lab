import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Glassware.scss";

const API_URL = "http://localhost:5000/glassware";

export default function CreateGlassware() {
  const [capacity, setCapacity] = useState("");
  const [shape, setShape] = useState("");
  const [brand, setBrand] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        capacity: Number(capacity),
        shape,
        brand,
      }),
    });
    navigate("/inventory");
  };

  return (
    <div>
      <h2>Add Glassware</h2>
      <form onSubmit={handleSubmit} className="glassware-form">
        <label>
          Capacity (mL)
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </label>
        <label>
          Shape
          <input
            value={shape}
            onChange={(e) => setShape(e.target.value)}
          />
        </label>
        <label>
          Brand
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
