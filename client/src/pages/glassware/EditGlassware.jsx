import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Glassware.scss";

const API_URL = "/api/glassware";

export default function EditGlassware() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [capacity, setCapacity] = useState("");
  const categories = [
    "Boiling Flask",
    "Erlenmeyer Flask",
    "Filtering Flask",
    "Filtering Funnel",
    "Addition Funnel",
    "Separation Funnel",
    "Basic Funnel",
    "Griffin Beaker",
    "Graduated Cylinder",
    "Test Tube",
    "Condenser",
    "Watch Glass",
    "Wash Bottle",
    "Cold Trap",
  ];
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setCapacity(data.capacity || "");
        setCategory(data.category || "");
        setBrand(data.brand || "");
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
      body: JSON.stringify({
        capacity: Number(capacity),
        category,
        brand,
        notes,
      }),
    });
    navigate(`/glassware/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Glassware</h2>
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
          <input value={brand} onChange={e => setBrand(e.target.value)} />
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
