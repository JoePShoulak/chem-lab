import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./glassware/Glassware.scss";
import "./ppe/PPE.scss";

const API_URLS = {
  all: "/api/inventory",
  glassware: "/api/glassware",
  ppe: "/api/ppe",
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

  const deleteItem = async (id, itemType = type) => {
    const url = API_URLS[itemType];
    if (!url) return;
    await fetch(`${url}/${id}`, { method: "DELETE" });
    setItems(items.filter(g => g._id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (!API_URLS[type]) return <p>Category not implemented.</p>;

  return (
    <div>
      <h2>Inventory</h2>
      {type === "glassware" && <Link to="/glassware/new">Add Glassware</Link>}
      {type === "ppe" && <Link to="/ppe/new">Add PPE</Link>}
      {type === "all" && (
        <>
          <Link to="/glassware/new">Add Glassware</Link>
          <Link to="/ppe/new">Add PPE</Link>
        </>
      )}
      <ul className={(type === "all" ? "glassware" : type) + "-list"}>
        {items.map(g => {
          const itemType = type === "all" ? g.type : type;
          return (
            <li key={g._id}>
              <Link to={`/${itemType}/${g._id}`}>
                {g.brand} {g.category}
                {itemType === "glassware" && ` (${g.capacity} mL)`}
              </Link>
              <div className="actions">
                <Link to={`/${itemType}/${g._id}/edit`}>Edit</Link>
                <button onClick={() => deleteItem(g._id, itemType)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
