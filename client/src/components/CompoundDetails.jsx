// client/src/components/CompoundDetails.jsx
import "./CompoundDetails.scss";

const getProp = (compound, label, name) =>
  compound.props.find(p => p.urn.label === label && p.urn.name === name)?.value;

export default function CompoundDetails({ compound }) {
  const cid = compound?.id?.id?.cid;
  const iupacName = getProp(compound, "IUPAC Name", "Systematic")?.sval;
  const tradName = getProp(compound, "IUPAC Name", "Traditional")?.sval;
  const formula = getProp(compound, "Molecular Formula")?.sval;
  const weight = getProp(compound, "Molecular Weight")?.sval;
  const inchi = getProp(compound, "InChI", "Standard")?.sval;
  const smiles = getProp(compound, "SMILES", "Absolute")?.sval;
  const pubchemUrl = cid
    ? `https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`
    : null;

  function Prop({ label, value }) {
    return (
      <tr>
        <th>{label}</th>
        <td>{value}</td>
      </tr>
    );
  }

  return (
    <div className="compound-card">
      <div className="compound-header">
        <h2>{`${iupacName} ${
          tradName != iupacName ? `(${tradName})` : ""
        }`}</h2>
        <p className="formula">{formula}</p>
      </div>

      <div className="compound-body">
        <div className="structure-img">
          {cid ? (
            <img
              src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG`}
              alt={`Structure of ${iupacName || formula}`}
            />
          ) : (
            <p>[No image]</p>
          )}
        </div>

        <div className="compound-info">
          <table>
            <tbody>
              {weight && <Prop label="Molecular Weight" value={weight} />}
              {inchi && <Prop label="InChI" value={inchi} />}
              {smiles && <Prop label="SMILES" value={smiles} />}
              {cid && <Prop label="CID" value={cid} />}
            </tbody>
          </table>
          {pubchemUrl && (
            <p className="pubchem-link">
              <a href={pubchemUrl} target="_blank" rel="noopener noreferrer">
                View more on PubChem
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
