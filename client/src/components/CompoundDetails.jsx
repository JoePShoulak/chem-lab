// client/src/components/CompoundDetails.jsx
import "./CompoundDetails.scss";

function getProp(compound, label, name = null) {
  return compound.props.find(
    p => p.urn.label === label && (name ? p.urn.name === name : true)
  )?.value;
}

export default function CompoundDetails({ compound }) {
  const cid = compound?.id?.id?.cid;
  const iupacName = getProp(compound, "IUPAC Name", "Preferred")?.sval;
  const formula = getProp(compound, "Molecular Formula")?.sval;
  const weight = getProp(compound, "Molecular Weight")?.sval;
  const inchi = getProp(compound, "InChI", "Standard")?.sval;
  const smiles = getProp(compound, "SMILES", "Absolute")?.sval;

  return (
    <div className="compound-card">
      <div className="compound-header">
        <h2>{iupacName || "Unnamed Compound"}</h2>
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
              {weight && (
                <tr>
                  <th>Molecular Weight</th>
                  <td>{weight}</td>
                </tr>
              )}
              {inchi && (
                <tr>
                  <th>InChI</th>
                  <td className="break">{inchi}</td>
                </tr>
              )}
              {smiles && (
                <tr>
                  <th>SMILES</th>
                  <td className="break">{smiles}</td>
                </tr>
              )}
              <tr>
                <th>PubChem CID</th>
                <td>{cid}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
