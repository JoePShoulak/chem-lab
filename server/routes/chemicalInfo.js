const express = require('express');

const router = express.Router();

// Look up chemical details using PubChem for base information and SMILES,
// then enrich with additional characteristics from the RSC API
router.get('/:name', async (req, res) => {
  try {
    const name = req.params.name;

    // Fetch full compound details from PubChem
    const pubChemRes = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(name)}/JSON`
    );
    if (!pubChemRes.ok)
      return res.status(404).json({ error: 'Chemical not found in PubChem' });
    const pubChemData = await pubChemRes.json();
    const compound = pubChemData?.PC_Compounds?.[0];
    if (!compound)
      return res.status(404).json({ error: 'Chemical not found in PubChem' });

    // Helper to pull a property from the PubChem response
    const getProp = (label, propName) =>
      compound.props?.find(
        p => p.urn.label === label && p.urn.name === propName
      )?.value?.sval;

    // SMILES is required for the RSC lookup
    const smiles =
      getProp('SMILES', 'Canonical') ||
      getProp('SMILES', 'Isomeric') ||
      getProp('SMILES', 'Absolute');
    if (!smiles)
      return res.status(404).json({ error: 'SMILES information not available' });

    const apiKey = process.env.RSC_KEY;
    if (!apiKey)
      return res.status(500).json({ error: 'RSC API key missing' });

    // Search RSC (ChemSpider) for the compound using the SMILES string
    const filterRes = await fetch('https://api.rsc.org/compounds/v1/filter/smiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
      },
      body: JSON.stringify({ smiles }),
    });
    const filterData = await filterRes.json();
    const queryId = filterData.queryId;

    // Retrieve the first result identifier
    const resultRes = await fetch(
      `https://api.rsc.org/compounds/v1/filter/${queryId}/results`
    );
    const resultData = await resultRes.json();
    const csid = resultData?.results?.[0];
    if (!csid)
      return res.status(404).json({ error: 'RSC data not found for SMILES' });

    // Request details for the compound
    const detailRes = await fetch(
      `https://api.rsc.org/compounds/v1/records/${csid}/details?fields=Stability,MeltingPoint,BoilingPoint,Appearance`,
      {
        headers: { apikey: apiKey },
      }
    );
    const detailData = await detailRes.json();

    res.json({
      compound,
      smiles,
      appearance: detailData.appearance,
      stability: detailData.stability,
      meltingPoint: detailData.meltingPoint,
      boilingPoint: detailData.boilingPoint,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
