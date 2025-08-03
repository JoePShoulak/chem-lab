import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/items";

export default function ItemDetail({ id }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div>
      <h2>{item.name}</h2>
      <a href={`#/items/${id}/edit`}>Edit</a>{" "}
      <a href="#/items">Back to list</a>
    </div>
  );
}
