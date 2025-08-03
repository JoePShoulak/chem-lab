import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/items";

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const deleteItem = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setItems(items.filter((i) => i._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Items</h2>
      <a href="#/items/new">Create Item</a>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <a href={`#/items/${item._id}`}>{item.name}</a>{" "}
            <a href={`#/items/${item._id}/edit`}>Edit</a>{" "}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
