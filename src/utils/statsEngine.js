// =============================================================================
// NORMAL DISTRIBUTION UTILITIES
//
// The standard normal distribution (mean=0, std=1) has this bell-shaped PDF:
//   φ(z) = (1 / √2π) · e^(−z²/2)
//
// These two functions let you move between two views of the same distribution:
//   ┌─────────────────────────────────────────────┐
//   │  CDF (normCDF): z → probability             │
//   │  PPF (normPPF): probability → z  (inverse)  │
//   └─────────────────────────────────────────────┘
// =============================================================================


// -----------------------------------------------------------------------------
// normCDF(z) — Cumulative Distribution Function
// -----------------------------------------------------------------------------
// Answers: "Given a z-score, what fraction of the distribution lies to its left?"
//
// True formula (requires numerical integration, expensive):
//   CDF(z) = ∫₋∞ᶻ φ(t) dt
//
// This implementation uses the Hart/Abramowitz & Stegun polynomial approximation
// (formula 26.2.17) — a fast, closed-form estimate with error < 7.5 × 10⁻⁸.
// The trick: express CDF in terms of a related function called the error function,
// then approximate *that* with a polynomial in a transformed variable t.
//
export const normCDF = (z) => {

  // --- Step 1: Transform z into t via the Horner's method parameter ---
  //
  // We substitute: t = 1 / (1 + 0.2316419 · |z|)
  //
  // Why |z|? Because the formula was derived for z ≥ 0 only.
  //   We handle negative z by symmetry at the end (Step 4).
  //
  // The constant 0.2316419 comes from the polynomial's derivation:
  //   t ∈ (0, 1] for any finite z, which keeps the polynomial well-behaved.
  //   As |z| → ∞, t → 0 and the tail probability → 0 correctly.
  //
  const t = 1 / (1 + 0.2316419 * Math.abs(z));

  // --- Step 2: Evaluate the PDF height φ(z) = (1/√2π) · e^(−z²/2) ---
  //
  // 0.3989423 ≈ 1/√(2π)  — the normalization constant of the normal distribution.
  //   It ensures the total area under the bell curve equals exactly 1.
  //
  // Math.exp(-z * z / 2) is the Gaussian kernel: e^(−z²/2).
  //   - At z = 0, this equals 1 (the peak of the bell curve).
  //   - As |z| grows, this decays rapidly toward 0 (the tails).
  //
  // Together, d = φ(|z|): the height of the PDF at point z.
  //
  const d = 0.3989423 * Math.exp((-z * z) / 2);

  // --- Step 3: Horner's polynomial in t to approximate the tail probability ---
  //
  // The approximation maps t → (1 − CDF(|z|)), i.e., the right-tail area.
  // The 5 coefficients below are the Abramowitz & Stegun constants b₁…b₅:
  //
  //   b₁ =  0.3193815
  //   b₂ = −0.3565638
  //   b₃ =  1.7814780
  //   b₄ = −1.8212560
  //   b₅ =  1.3302740
  //
  // The polynomial is evaluated using Horner's method to minimize floating-point
  // error and reduce the number of multiplications:
  //   p(t) = d · t · (b₁ + t·(b₂ + t·(b₃ + t·(b₄ + t·b₅))))
  //
  // Here p ≈ P(Z > |z|), the probability in the right tail.
  //
  const p =
    d *
    t *
    (0.3193815 +                          // b₁
      t * (-0.3565638 +                   // b₂
        t * (1.781478 +                   // b₃
          t * (-1.821256 +                // b₄
            t * 1.330274))));             // b₅

  // --- Step 4: Apply symmetry to return the left-tail probability ---
  //
  // p currently holds the *right*-tail probability: P(Z > |z|).
  //
  // Symmetry of the normal distribution:
  //   - If z > 0:  CDF(z) = 1 − p   (most area is to the left)
  //   - If z ≤ 0:  CDF(z) = p        (most area is to the right)
  //
  // Example:
  //   normCDF(1.96)  ≈ 0.975  → 97.5% of values lie below z = 1.96
  //   normCDF(0)     ≈ 0.5    → exactly half the distribution
  //   normCDF(-1.96) ≈ 0.025  → only 2.5% of values lie below z = −1.96
  //
  return z > 0 ? 1 - p : p;
};


// -----------------------------------------------------------------------------
// normPPF(p) — Percent Point Function (inverse of normCDF)
// -----------------------------------------------------------------------------
// Answers: "Given a probability p, what z-score has exactly that much area
//           to its left under the standard normal curve?"
//
// This is the mathematical inverse: normPPF(normCDF(z)) = z
//
// Common use cases:
//   normPPF(0.975) ≈ 1.96    (the famous 95% confidence z-score)
//   normPPF(0.5)   = 0       (the median of a symmetric distribution)
//   normPPF(0.025) ≈ −1.96   (the lower 2.5% critical value)
//
export const normPPF = (p) => {

  // --- Step 1: Guard against invalid inputs ---
  //
  // CDF only returns values in the open interval (0, 1).
  // The z-score for p=0 is −∞ and for p=1 is +∞ — both inexpressible as finite
  // numbers. We return 0 as a safe fallback (a common convention).
  //
  if (p <= 0 || p >= 1) return 0;

  // --- Step 2: Set up binary search bounds ---
  //
  // We know the answer z lies in [−10, 10]:
  //   normCDF(−10) ≈ 7.6 × 10⁻²⁴ (essentially 0)
  //   normCDF(+10) ≈ 1 − 7.6 × 10⁻²⁴ (essentially 1)
  //
  // So any valid probability p ∈ (0, 1) maps to a z within this range.
  //
  let low = -10,
    high = 10,
    mid = 0;

  // --- Step 3: Binary search (bisection method) ---
  //
  // We're solving:  normCDF(z) = p
  //
  // Since normCDF is strictly monotonically increasing (every step right
  // on the x-axis adds more area), binary search works perfectly:
  //
  //   ┌─────────────────────────────────────────────────────┐
  //   │  Each iteration halves the search interval.         │
  //   │  After 100 iterations: interval ≤ 20 / 2¹⁰⁰        │
  //   │  Error < 1.6 × 10⁻²⁹ — far beyond float64 precision │
  //   └─────────────────────────────────────────────────────┘
  //
  // In practice, ~52 iterations would suffice for float64 precision,
  // but 100 is used here for an extra safety margin.
  //
  for (let i = 0; i < 100; i++) {  // 100 iterations → ~30 decimal places of precision

    mid = (low + high) / 2;         // Candidate z: midpoint of current interval

    // If normCDF(mid) < p, the true z is to the RIGHT of mid (we need more area).
    // If normCDF(mid) ≥ p, the true z is to the LEFT of mid (we have too much area).
    if (normCDF(mid) < p) low = mid;
    else high = mid;
  }

  // After 100 halvings, low ≈ high ≈ mid = the z-score that gives CDF(z) = p.
  return mid;
};