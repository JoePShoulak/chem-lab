import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/glassware";

export default function GlasswareList() {
  const [glassware, setGlassware] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setGlassware(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const deleteGlass = async id => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setGlassware(glassware.filter(g => g._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Inventory</h2>
      <Link to="/inventory/new">Add Glassware</Link>
      <ul>
        {glassware.map(g => (
          <li key={g._id}>
            <Link to={`/inventory/${g._id}`}>{g.brand} {g.shape} ({g.capacity} mL)</Link>{" "}
            <Link to={`/inventory/${g._id}/edit`}>Edit</Link>{" "}
            <button onClick={() => deleteGlass(g._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
