import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AugmentFirst | When the board asks for the numbers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(160deg, #080b12 0%, #0c1018 45%, #12171f 100%)",
          color: "#f0ebe3",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#c9a227",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontWeight: 600,
          }}
        >
          AugmentFirst
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              lineHeight: 1.15,
              fontWeight: 500,
              maxWidth: 920,
            }}
          >
            When the board asks for the numbers, can everyone agree on them?
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              lineHeight: 1.4,
              color: "#8f96a3",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              maxWidth: 820,
            }}
          >
            Senior-led data foundation work for banks, fintechs, and regulated firms.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 3,
            width: 96,
            background: "#c9a227",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
