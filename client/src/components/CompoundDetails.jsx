import { imageUrl } from "../api/rsc";
import "./CompoundDetails.scss";

export default function CompoundDetails({ compound }) {
  const {
    csid,
    commonName,
    iupacName,
    molecularFormula,
    molecularWeight,
    inchi,
    smiles,
  } = compound || {};

  const name = iupacName || commonName;

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
        <h2>{name}</h2>
        {molecularFormula && <p className="formula">{molecularFormula}</p>}
      </div>

      <div className="compound-body">
        <div className="structure-img">
          {csid ? (
            <img src={imageUrl(csid)} alt={`Structure of ${name || molecularFormula}`} />
          ) : (
            <p>[No image]</p>
          )}
        </div>

        <div className="compound-info">
          <table>
            <tbody>
              {molecularWeight && (
                <Prop label="Molecular Weight" value={molecularWeight} />
              )}
              {inchi && <Prop label="InChI" value={inchi} />}
              {smiles && <Prop label="SMILES" value={smiles} />}
              {csid && <Prop label="CSID" value={csid} />}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
