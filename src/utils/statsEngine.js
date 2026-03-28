// Cumulative Distribution Function (CDF) - Finds Probability given Z
export const normCDF = (z) => {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
};

// Percent Point Function (PPF) - Inverse CDF - Finds Z given Probability
// Uses Wichura's algorithm approximation
export const normPPF = (p) => {
  if (p <= 0 || p >= 1) return 0;
  let low = -10,
    high = 10,
    mid = 0;
  for (let i = 0; i < 100; i++) {
    // Binary search for high precision
    mid = (low + high) / 2;
    if (normCDF(mid) < p) low = mid;
    else high = mid;
  }
  return mid;
};
