import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PPE.scss";

const API_URL = "/api/ppe";

export default function PPEDetail() {
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
  if (!item) return <p>PPE not found.</p>;

  return (
    <div className="ppe-detail">
      <h2>
        {item.brand} {item.category}
      </h2>
      {item.notes && <p>Notes: {item.notes}</p>}
      <div className="actions">
        <Link to={`/ppe/${id}/edit`}>Edit</Link>
        <Link to="/inventory?type=ppe">Back to list</Link>
      </div>
    </div>
  );
}
