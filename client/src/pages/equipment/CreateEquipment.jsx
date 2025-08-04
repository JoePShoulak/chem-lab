import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Equipment.scss";

const API_URL = "/api/equipment";

export default function CreateEquipment() {
  const categories = [
    "Vacuum Pump",
    "Water Pump",
    "pH Tester",
    "Heating Element",
    "Stirring Element",
    "Heat/Stir Element",
    "Jack Stand",
    "Mortar & Pestle",
    "Scale",
  ];
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, category, notes }),
    });
    navigate("/inventory?type=equipment");
  };

  return (
    <div>
      <h2>Add Equipment</h2>
      <form className="equipment-form" onSubmit={handleSubmit}>
        <label>
          Brand
          <input value={brand} onChange={e => setBrand(e.target.value)} />
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
          Notes
          <textarea value={notes} onChange={e => setNotes(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
