import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  const deleteItem = async id => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setItems(items.filter(i => i._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Items</h2>
      <Link to="/items/new">Create Item</Link>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <Link to={`/items/${item._id}`}>{item.name}</Link>{" "}
            <Link to={`/items/${item._id}/edit`}>Edit</Link>{" "}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
