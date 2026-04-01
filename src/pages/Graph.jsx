import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from "recharts";

const Graph = () => {
  const [searchParams] = useSearchParams();

  const initialMean = parseFloat(searchParams.get("mean")) || 50;
  const initialStdDev = parseFloat(searchParams.get("stddev")) || 10;

  const [mean, setMean] = useState(initialMean);
  const [stdDev, setStdDev] = useState(initialStdDev);

  // Generates the (x, y) data points that trace the bell curve.
  // Recharts doesn't know about math — it just connects dots.
  // So we pre-compute 100 evenly-spaced points along the PDF formula
  // and hand them to <AreaChart> as a plain array of { x, Probability } objects.
  //
  // The PDF (Probability Density Function) formula used here:
  //   y = (1 / (σ√2π)) · e^(−½ · ((x−μ)/σ)²)
  //
  //   μ (mu)    = mean    → controls the center / horizontal position of the peak
  //   σ (sigma) = stdDev  → controls the width; larger σ = flatter, wider curve
  //
  // We sample from μ − 4σ to μ + 4σ because beyond 4 standard deviations,
  // the PDF value is so close to zero it's visually indistinguishable from the axis.
  const generateData = (mu, sigma) => {
    const data = [];
    const minX = mu - 4 * sigma;
    const maxX = mu + 4 * sigma;
    const step = (maxX - minX) / 100; // 100 evenly spaced samples

    for (let x = minX; x <= maxX; x += step) {
      const exponent = Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
      const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * exponent;
      data.push({
        x: parseFloat(x.toFixed(1)),
        Probability: parseFloat(y.toFixed(4)),
      });
    }
    return data;
  };

  const chartData = useMemo(() => generateData(mean, stdDev), [mean, stdDev]);

  const getConclusion = () => {
    let spreadDescription = "";
    if (stdDev <= 10) {
      spreadDescription =
        "highly clustered and predictable. This represents a system with very strict quality control or natural consistency.";
    } else if (stdDev <= 25) {
      spreadDescription =
        "moderately spread out. This represents a normal, expected amount of variance in most real-world datasets.";
    } else {
      spreadDescription =
        "widely dispersed and highly variable. This represents a system with significant fluctuations and low predictability.";
    }

    return (
      <>
        Based on a mean of{" "}
        <strong className="text-stone-900 font-serif">{mean}</strong> and a
        standard deviation of{" "}
        <strong className="text-stone-900 font-serif">{stdDev}</strong>, the
        data in this distribution is {spreadDescription}
        <br />
        <br />
        Statistically, you can be <strong>95% confident</strong> that any
        randomly selected data point from this population will fall between{" "}
        <strong className="text-[#405232] font-serif">
          {(mean - 2 * stdDev).toFixed(1)}
        </strong>{" "}
        and{" "}
        <strong className="text-[#405232] font-serif">
          {(mean + 2 * stdDev).toFixed(1)}
        </strong>
        .
      </>
    );
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 mb-20 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-4 leading-normal py-2">
          Bell Curve Visualizer
        </h2>
        <p className="text-stone-500 text-lg max-w-2xl mx-auto">
          Adjust the mean and standard deviation to understand how the shape of
          a normal distribution changes in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm flex flex-col h-full">
          <h3 className="text-2xl font-serif text-stone-900 mb-8 pb-4 border-b border-stone-100">
            Distribution Controls
          </h3>

          <div className="space-y-8 mb-10">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-stone-600">
                  Mean (μ)
                </label>
                <span className="font-serif font-bold text-xl text-[#405232]">
                  {mean}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="1"
                value={mean}
                onChange={(e) => setMean(parseFloat(e.target.value))}
                className="w-full accent-[#405232] h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-stone-600">
                  Standard Deviation (σ)
                </label>
                <span className="font-serif font-bold text-xl text-[#405232]">
                  {stdDev}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={stdDev}
                onChange={(e) => setStdDev(parseFloat(e.target.value))}
                className="w-full accent-[#405232] h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-4 mt-auto pt-6 border-t border-stone-100">
            <div className="bg-[#f7f8f5] border border-[#a3ad88]/40 p-5 rounded-2xl shadow-sm">
              <h4 className="font-serif font-bold text-[#405232] text-lg mb-1">
                68% Rule
              </h4>
              <p className="text-stone-600 text-sm">
                Most values lie between{" "}
                <strong>{(mean - stdDev).toFixed(1)}</strong> and{" "}
                <strong>{(mean + stdDev).toFixed(1)}</strong>
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl shadow-sm">
              <h4 className="font-serif font-bold text-[#405232] text-lg mb-1">
                95% Rule
              </h4>
              <p className="text-stone-600 text-sm">
                Most values lie between{" "}
                <strong>{(mean - 2 * stdDev).toFixed(1)}</strong> and{" "}
                <strong>{(mean + 2 * stdDev).toFixed(1)}</strong>
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm">
              <h4 className="font-serif font-bold text-[#405232] text-lg mb-1">
                99.7% Rule
              </h4>
              <p className="text-stone-600 text-sm">
                Almost all values lie between{" "}
                <strong>{(mean - 3 * stdDev).toFixed(1)}</strong> and{" "}
                <strong>{(mean + 3 * stdDev).toFixed(1)}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Graph */}
        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] border border-stone-200 shadow-sm h-[600px] flex flex-col">
          {/*
            ResponsiveContainer measures its parent div and passes the
            exact pixel width/height down to <AreaChart>. This is what
            makes the chart fluid — AreaChart itself only works with
            fixed pixel dimensions.
          */}
          <ResponsiveContainer width="100%" height="100%">
            {/*
              <AreaChart> is the coordinate system. It:
                1. Receives the `data` array (our 100 bell curve points).
                2. Establishes the SVG canvas and the x/y scale.
                3. Acts as a context provider — every child component
                   (<Area>, <ReferenceArea>, <ReferenceLine>, etc.) reads
                   the scale from this context to know where to draw themselves.

              The `margin` prop adds breathing room between the plotted area
              and the outer SVG edges so axis labels and the curve don't clip.
            */}
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <defs>
                {/*
                  SVG gradient definition for the area fill under the curve.
                  x1/y1/x2/y2 define the gradient direction:
                    (0,0) → (0,1) means top-to-bottom (vertical gradient).
                  
                  stopOpacity fades from 0.6 at the curve edge to 0.1 at
                  the x-axis, giving the shaded area a natural "dissolve"
                  effect rather than a hard-edged filled region.
                  
                  This gradient is referenced by id="colorOlive" in <Area> below.
                */}
                <linearGradient id="colorOlive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#405232" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#405232" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f5f5f4"
                vertical={false} // Horizontal lines only — vertical lines would clutter a continuous curve
              />

              {/*
                XAxis reads the `x` key from each data point object.
                
                type="number" is critical: it tells Recharts to treat x as a
                continuous numeric scale rather than discrete categories.
                Without this, Recharts would space all 100 points evenly
                regardless of their actual x values — the curve would look
                correct but the σ zone boundaries (ReferenceArea x1/x2) would
                land in the wrong positions on screen.
                
                domain={["dataMin", "dataMax"]} locks the axis to exactly the
                range of our generated data (μ ± 4σ), so the curve always
                fills the full chart width regardless of slider values.
                
                tickCount={15} is a hint to Recharts for how many tick labels
                to render. Recharts may render fewer to avoid overlap.
              */}
              <XAxis
                dataKey="x"
                stroke="#a8a29e"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickCount={15}
                tick={{ fill: "#78716c", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />

              {/* YAxis is hidden because the raw PDF density values (e.g. 0.0399)
                  are not intuitive to users. The shape and relative height of
                  the curve is what matters visually, not the absolute y values. */}
              <YAxis hide={true} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e7e5e4",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ color: "#405232", fontWeight: "bold" }}
                labelStyle={{ color: "#78716c", marginBottom: "4px" }}
                formatter={(value) => [value, "Probability Density"]}
              />

              {/*
                ─── STANDARD DEVIATION ZONES (ReferenceArea) ────────────────────
                
                <ReferenceArea> draws a filled rectangle that spans from x1 to x2
                on the x-axis and from the bottom to the top of the chart area.
                It does NOT follow the curve — it's a flat vertical band layered
                behind the <Area> fill.
                
                The visual "σ zone" effect comes from painter's algorithm layering:
                the three ReferenceAreas are drawn first (back to front), then
                the <Area> curve is drawn on top of all of them. The result looks
                like nested colored regions under the curve, but it's actually
                three overlapping rectangles with the curve drawn over them.
                
                Stacking order (back to front):
                  ┌─────────────────────────────────────────────────────┐
                  │  3σ zone (lightest, widest)     — rendered first    │
                  │    2σ zone (medium)              — rendered second   │
                  │      1σ zone (darkest, narrowest)— rendered third   │
                  │        <Area> curve fill         — rendered on top  │
                  └─────────────────────────────────────────────────────┘
                
                Because each inner zone is a different color and fully covers
                the outer zone in its range, the final appearance is:
                  - Dark green band  from μ−1σ to μ+1σ  (68% zone)
                  - Medium gray band from μ−2σ to μ+2σ  (95% zone, visible only outside 1σ)
                  - Light gray band  from μ−3σ to μ+3σ  (99.7% zone, visible only outside 2σ)
                
                The x1/x2 values are re-computed live from `mean` and `stdDev`
                state, so all three bands reposition instantly as the sliders move.
              */}

              {/* 99.7% zone: μ ± 3σ — lightest fill, widest band */}
              <ReferenceArea
                x1={mean - 3 * stdDev}
                x2={mean + 3 * stdDev}
                fill="#e5e7eb"
                fillOpacity={0.4}
              />

              {/* 95% zone: μ ± 2σ — medium fill, drawn on top of 3σ zone */}
              <ReferenceArea
                x1={mean - 2 * stdDev}
                x2={mean + 2 * stdDev}
                fill="#d6d3d1"
                fillOpacity={0.4}
              />

              {/* 68% zone: μ ± 1σ — darkest/most saturated fill, drawn on top of both */}
              <ReferenceArea
                x1={mean - stdDev}
                x2={mean + stdDev}
                fill="#a3ad88"
                fillOpacity={0.3}
              />

              {/*
                Vertical dashed line at the mean.
                x={mean} maps directly to the x-axis scale — this line will
                always sit exactly at the peak of the bell curve because the
                mean is both the center of symmetry and the x-coordinate of
                the PDF's maximum value.
              */}
              <ReferenceLine
                x={mean}
                stroke="#405232"
                strokeWidth={2}
                strokeDasharray="4 4"
              />

              {/*
                ─── THE BELL CURVE (Area) ────────────────────────────────────────

                <Area> is what actually draws the bell curve shape. It works in
                two parts rendered as SVG:
                
                  1. A <path> stroke along the top — the visible curve outline.
                     `stroke="#405232"` and `strokeWidth={4}` style this line.
                
                  2. A filled <path> from the curve down to the x-axis baseline.
                     `fill="url(#colorOlive)"` applies the gradient defined in <defs>.
                
                type="monotone" controls how points are interpolected between our
                100 sampled data points. "monotone" uses a cubic spline that
                guarantees no overshoot between points — crucial for a smooth
                bell curve. Other options like "linear" would produce a jagged,
                polygonal shape instead of a smooth curve.
                
                dataKey="Probability" tells Recharts which key in each data object
                to use as the y-value. Our data objects are { x, Probability },
                so this maps to the PDF y-value at each point.
                
                isAnimationActive={false} disables Recharts' built-in draw-on
                animation. Since sliders fire onChange continuously, animation
                would cause the curve to stutter and lag. Disabling it makes
                the curve re-render instantly on every slider tick.
              */}
              <Area
                type="monotone"
                dataKey="Probability"
                stroke="#405232"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorOlive)"
                animationDuration={300}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border-l-4 border-[#405232] p-8 rounded-r-[2rem] rounded-l-lg shadow-sm">
        <h3 className="text-sm font-bold text-[#405232] uppercase tracking-wider mb-3">
          Graph Analysis
        </h3>
        <p className="text-stone-600 leading-relaxed text-lg">
          {getConclusion()}
        </p>
      </div>
    </div>
  );
};

export default Graph;