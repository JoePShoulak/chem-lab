import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/glassware";

export default function EditGlassware({ id }) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [shape, setShape] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name || "");
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
      body: JSON.stringify({ name, capacity, shape, brand }),
    });
    window.location.hash = `/glassware/${id}`;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Glassware</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} />
        <input value={capacity} onChange={e => setCapacity(e.target.value)} />
        <input value={shape} onChange={e => setShape(e.target.value)} />
        <input value={brand} onChange={e => setBrand(e.target.value)} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
