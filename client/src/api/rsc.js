const BASE = "https://api.rsc.org/compounds/v1";
const API_KEY = import.meta.env.VITE_RSC_KEY;

async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("No compound found");
  return res.json();
}

export async function getCompoundByName(name) {
  const filter = await fetchJson(`${BASE}/filter/name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: API_KEY,
    },
    body: JSON.stringify({ name }),
  });

  const queryId = filter?.queryId;
  if (!queryId) throw new Error("No compound found");

  const results = await fetchJson(`${BASE}/filter/${queryId}/results`, {
    headers: { apikey: API_KEY },
  });

  const csid = results?.results?.[0];
  if (!csid) throw new Error("No compound found");

  const details = await fetchJson(`${BASE}/records/${csid}/details`, {
    headers: { apikey: API_KEY },
  });

  return { csid, ...details };
}

export function imageUrl(csid) {
  return `${BASE}/records/${csid}/image`;
}
