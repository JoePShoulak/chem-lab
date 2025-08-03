import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";
const ENDPOINT_MAP = {
  All: "items",
  Glassware: "glassware",
  Chemicals: "chemicals",
  PPE: "ppe",
  Equipment: "equipment"
};

export default function ItemsList({ filter }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = ENDPOINT_MAP[filter] || "items";
    setLoading(true);
    fetch(`${API_BASE}/${endpoint}`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filter]);

  const deleteItem = async id => {
    const endpoint = ENDPOINT_MAP[filter] || "items";
    await fetch(`${API_BASE}/${endpoint}/${id}`, { method: "DELETE" });
    setItems(items.filter(i => i._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Items</h2>
      {filter === "All" && <a href="/items/new">Create Item</a>}
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <span>
              {item.name}
              {filter === "Glassware" && item.type ? ` (${item.type})` : ""}
            </span>{" "}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
