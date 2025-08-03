import { useEffect, useState } from "react";

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

  const deleteGlassware = async id => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setGlassware(glassware.filter(g => g._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Glassware</h2>
      <a href="/glassware/new">Add Glassware</a>
      <ul>
        {glassware.map(g => (
          <li key={g._id}>
            <a href={`/glassware/${g._id}`}>{g.name}</a> ({g.capacity}, {g.shape}, {g.brand}){" "}
            <a href={`/glassware/${g._id}/edit`}>Edit</a>{" "}
            <button onClick={() => deleteGlassware(g._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
