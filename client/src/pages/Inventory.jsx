import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./glassware/Glassware.scss";
import "./ppe/PPE.scss";
import "./equipment/Equipment.scss";
import "./chemicals/Chemical.scss";

const API_URLS = {
  all: "/api/inventory",
  glassware: "/api/glassware",
  ppe: "/api/ppe",
  equipment: "/api/equipment",
  chemicals: "/api/chemicals",
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
      {type === "equipment" && <Link to="/equipment/new">Add Equipment</Link>}
      {type === "chemicals" && <Link to="/chemicals/new">Add Chemical</Link>}
      {type === "all" && (
        <>
          <Link to="/glassware/new">Add Glassware</Link> <br />
          <Link to="/ppe/new">Add PPE</Link> <br />
          <Link to="/equipment/new">Add Equipment</Link> <br />
          <Link to="/chemicals/new">Add Chemical</Link>
        </>
      )}
      <ul className={(type === "all" ? "glassware" : type) + "-list"}>
        {items.map(item => {
          const itemType = type === "all" ? item.type : type;
          return (
            <li key={item._id}>
              <Link to={`/${itemType}/${item._id}`}>
                {itemType === "chemicals"
                  ? item.name
                  : `${item.brand} ${item.category}`} 
                {itemType === "glassware" && ` (${item.capacity} mL)`}
                {itemType === "chemicals" &&
                  ` (${
                    item.volume != null
                      ? `${item.volume} mL`
                      : item.mass != null
                      ? `${item.mass} g`
                      : ""
                  })`}
              </Link>
              <div className="actions">
                <Link to={`/${itemType}/${item._id}/edit`}>Edit</Link>
                <button onClick={() => deleteItem(item._id, itemType)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
