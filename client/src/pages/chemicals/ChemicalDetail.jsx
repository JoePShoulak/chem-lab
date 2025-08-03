import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CompoundDetails from "../../components/CompoundDetails";
import "./Chemical.scss";

const API_URL = "/api/chemicals";
const PUBCHEM = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";

export default function ChemicalDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [compound, setCompound] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setLoading(false);
        if (data?.name) {
          fetch(
            `${PUBCHEM}/compound/name/${encodeURIComponent(data.name)}/JSON`
          )
            .then(res => (res.ok ? res.json() : Promise.reject()))
            .then(pc => setCompound(pc?.PC_Compounds?.[0]))
            .catch(() => {});
        }
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Chemical not found.</p>;

  return (
    <div className="chemical-detail">
      <h2>{item.name}</h2>
      {item.volume != null && <p>Volume: {item.volume} mL</p>}
      {item.mass != null && <p>Mass: {item.mass} g</p>}
      {item.notes && <p>Notes: {item.notes}</p>}
      {compound && <CompoundDetails compound={compound} />}
      <div className="actions">
        <Link to={`/chemicals/${id}/edit`}>Edit</Link>
        <Link to="/inventory?type=chemicals">Back to list</Link>
      </div>
    </div>
  );
}
