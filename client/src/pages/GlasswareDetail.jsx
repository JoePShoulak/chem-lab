import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/glassware";

export default function GlasswareDetail({ id }) {
  const [glass, setGlass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setGlass(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!glass) return <p>Glassware not found.</p>;

  return (
    <div>
      <h2>{glass.name}</h2>
      <p>Capacity: {glass.capacity}</p>
      <p>Shape: {glass.shape}</p>
      <p>Brand: {glass.brand}</p>
      <a href={`/glassware/${id}/edit`}>Edit</a>
      <a href="/glassware">Back to list</a>
    </div>
  );
}
