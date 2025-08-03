import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/glassware";

export default function EditGlassware() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [capacity, setCapacity] = useState("");
  const [shape, setShape] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setCapacity(data.capacity || "");
        setShape(data.shape || "");
        setBrand(data.brand || "");
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
        shape,
        brand,
      }),
    });
    navigate(`/inventory/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Glassware</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
          placeholder="Capacity (mL)"
        />
        <input
          value={shape}
          onChange={e => setShape(e.target.value)}
          placeholder="Shape"
        />
        <input
          value={brand}
          onChange={e => setBrand(e.target.value)}
          placeholder="Brand"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
