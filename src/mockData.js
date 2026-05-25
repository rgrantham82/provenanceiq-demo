export const initialCollection = [
  {
    id: "art-1",
    title: "Untitled Landscape",
    artist: {
      name: "Unknown / Possible H. Williams",
      attributionType: "possible",
      confidence: "Low",
    },
    medium: "Oil on canvas",
    date: "Circa 1950",
    dimensions: "18 × 24 in.",
    condition: "Good, minor surface grime",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
    images: [
      {
        id: "art-1-front",
        label: "Front image",
        url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
        type: "front",
      },
      {
        id: "art-1-detail",
        label: "Surface detail",
        url: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&q=80&w=800",
        type: "detail",
      },
    ],
    docScore: 38,
    estimates: {
      fairMarket: { low: 250, high: 600, currency: "USD" },
      insuranceReplacement: { low: 700, high: 900, currency: "USD" },
      liquidation: { low: 100, high: 200, currency: "USD" },
      retailPrivateSale: { low: 550, high: 900, currency: "USD" },
    },
    confidence: "Low",
    triage:
      "Not urgent. Your current evidence suggests this work may be worth under $1,000. Keep documentation, but a formal appraisal may not be cost-effective unless needed for estate planning, insurance scheduling, donation, or legal use.",
    riskFlags: ["No visible signature", "Provenance gap before 2014"],
    documents: [
      { label: "Front Image", status: "uploaded" },
      { label: "Back Image", status: "uploaded" },
      { label: "Signature Detail", status: "missing" },
      { label: "Gallery Receipt", status: "missing" },
      { label: "Prior Appraisal", status: "missing" },
    ],
  },
  {
    id: "art-2",
    title: "Study in Blue",
    artist: {
      name: "Eleanor Vance",
      attributionType: "documented",
      confidence: "High",
    },
    medium: "Acrylic on panel",
    date: "1984",
    dimensions: "24 × 24 in.",
    condition: "Excellent",
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=800",
    images: [
      {
        id: "art-2-front",
        label: "Front image",
        url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=800",
        type: "front",
      },
      {
        id: "art-2-detail",
        label: "Installation detail",
        url: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800",
        type: "detail",
      },
    ],
    docScore: 85,
    estimates: {
      fairMarket: { low: 4500, high: 6000, currency: "USD" },
      insuranceReplacement: { low: 7000, high: 8000, currency: "USD" },
      liquidation: { low: 2800, high: 3500, currency: "USD" },
      retailPrivateSale: { low: 6000, high: 7500, currency: "USD" },
    },
    confidence: "High",
    triage:
      "Yes. Estimated value, artist identity, and available documentation suggest a qualified appraiser should review this work before insurance scheduling or formal estate use.",
    riskFlags: [],
    documents: [
      { label: "Front Image", status: "uploaded" },
      { label: "Signature Detail", status: "uploaded" },
      { label: "Gallery Receipt 1984", status: "uploaded" },
      { label: "Previous Appraisal 2010", status: "uploaded" },
    ],
  },
];
