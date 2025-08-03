import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Capacity (mL)"
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
