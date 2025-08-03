import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Chemical.scss";

const API_URL = "/api/chemicals";

export default function EditChemical() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [volume, setVolume] = useState("");
  const [mass, setMass] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name || "");
        setVolume(data.volume ?? "");
        setMass(data.mass ?? "");
        setNotes(data.notes || "");
      });
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        volume: volume !== "" ? Number(volume) : undefined,
        mass: mass !== "" ? Number(mass) : undefined,
        notes,
      }),
    });
    navigate(`/chemicals/${id}`);
  };

  return (
    <div>
      <h2>Edit Chemical</h2>
      <form className="chemical-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Volume (mL)
          <input
            type="number"
            value={volume}
            onChange={e => setVolume(e.target.value)}
          />
        </label>
        <label>
          Mass (g)
          <input
            type="number"
            value={mass}
            onChange={e => setMass(e.target.value)}
          />
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
