import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Glassware.scss";

const API_URL = "/api/glassware";

export default function GlasswareDetail() {
  const { id } = useParams();
  const [glass, setGlass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setGlass(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!glass) return <p>Glassware not found.</p>;

  return (
    <div className="glassware-detail">
      <h2>
        {glass.brand} {glass.category}
      </h2>
      <p>Capacity: {glass.capacity} mL</p>
      <div className="actions">
        <Link to={`/inventory/${id}/edit`}>Edit</Link>
        <Link to="/inventory">Back to list</Link>
      </div>
    </div>
  );
}
