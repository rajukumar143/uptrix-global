import { ImageResponse } from "next/og";

export const alt = "Uptrix HRMS and CRM for growing Indian businesses";
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
          justifyContent: "center",
          padding: "88px",
          color: "white",
          background: "linear-gradient(125deg, #080e27 0%, #16275b 60%, #3b3fd4 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: 5 }}>UPTRIX</div>
        <div style={{ display: "flex", marginTop: 42, fontSize: 62, lineHeight: 1.12, fontWeight: 700 }}>
          HRMS + CRM for growing businesses
        </div>
        <div style={{ display: "flex", marginTop: 28, color: "#dbe4ff", fontSize: 29 }}>
          Manage your people and customers in one place.
        </div>
      </div>
    ),
    size
  );
}
