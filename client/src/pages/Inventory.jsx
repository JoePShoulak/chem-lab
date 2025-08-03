import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const API_URLS = {
  all: "http://localhost:5000/inventory",
  glassware: "http://localhost:5000/glassware",
};

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "all";

  useEffect(() => {
    const url = API_URLS[type];
    if (!url) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [type]);

  const deleteItem = async id => {
    const url = type === "all" ? API_URLS.glassware : API_URLS[type];
    if (!url) return;
    await fetch(`${url}/${id}`, { method: "DELETE" });
    setItems(items.filter(g => g._id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (!API_URLS[type]) return <p>Category not implemented.</p>;

  return (
    <div>
      <h2>Inventory</h2>
      {(type === "glassware" || type === "all") && (
        <Link to="/inventory/new">Add Glassware</Link>
      )}
      <ul>
        {items.map(g => (
          <li key={g._id}>
            <Link to={`/inventory/${g._id}`}>{g.brand} {g.shape} ({g.capacity} mL)</Link>{" "}
            <Link to={`/inventory/${g._id}/edit`}>Edit</Link>{" "}
            <button onClick={() => deleteItem(g._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
