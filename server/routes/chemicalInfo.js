const express = require('express');

const router = express.Router();

// Look up chemical details using PubChem and RSC APIs
router.get('/:name', async (req, res) => {
  try {
    const name = req.params.name;
    // Fetch SMILES from PubChem
    const pubChemRes = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(name)}/property/CanonicalSMILES/JSON`
    );
    if (!pubChemRes.ok)
      return res.status(404).json({ error: 'Chemical not found in PubChem' });
    const pubChemData = await pubChemRes.json();
    const smiles = pubChemData?.PropertyTable?.Properties?.[0]?.CanonicalSMILES;
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
