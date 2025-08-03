import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Misc.scss";

const API_URL = "/api/misc";

export default function CreateMisc() {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, name, notes }),
    });
    navigate("/inventory?type=misc");
  };

  return (
    <div>
      <h2>Add Misc Item</h2>
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
