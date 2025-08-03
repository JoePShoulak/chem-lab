import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Equipment.scss";

const API_URL = "/api/equipment";

export default function EditEquipment() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setBrand(data.brand || "");
        setCategory(data.category || "");
        setNotes(data.notes || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, category, notes }),
    });
    navigate(`/equipment/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Equipment</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
