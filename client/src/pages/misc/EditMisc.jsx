import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Misc.scss";

const API_URL = "/api/misc";

export default function EditMisc() {
  const { id } = useParams();
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setBrand(data.brand || "");
        setName(data.name || "");
        setNotes(data.notes || "");
      });
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, name, notes }),
    });
    navigate(`/misc/${id}`);
  };

  return (
    <div>
      <h2>Edit Misc Item</h2>
      <form className="misc-form" onSubmit={handleSubmit}>
        <label>
          Brand
          <input value={brand} onChange={e => setBrand(e.target.value)} />
        </label>
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Notes
          <textarea value={notes} onChange={e => setNotes(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
