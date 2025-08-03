import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Misc.scss";

const API_URL = "/api/misc";

export default function MiscDetail() {
  const { id } = useParams();
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
    <div className="misc-detail">
      <h2>
        {item.brand} {item.name}
      </h2>
      {item.notes && <p>Notes: {item.notes}</p>}
      <div className="actions">
        <Link to={`/misc/${id}/edit`}>Edit</Link>
        <Link to="/inventory?type=misc">Back to list</Link>
      </div>
    </div>
  );
}
