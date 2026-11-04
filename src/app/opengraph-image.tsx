import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/config";

export const size = {
  width: 1200,
  height: 630,
};
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
          backgroundColor: "#0d0c0a",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(200, 156, 110, 0.22), transparent 45%), radial-gradient(circle at 15% 85%, rgba(180, 130, 80, 0.14), transparent 40%)",
          color: "#f5f3ef",
          padding: "48px 60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Outer Frosted Glass Card Plate */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(200, 156, 110, 0.3)",
            borderRadius: "28px",
            backgroundColor: "rgba(22, 19, 16, 0.78)",
            padding: "48px 56px",
          }}
        >
          {/* Top Bar: Brand, By ZenithDistrict, and Engine Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Emblem */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#c89c6e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(200, 156, 110, 0.5)",
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "22px",
                    border: "2px solid #0d0c0a",
                    borderRadius: "3px",
                  }}
                />
              </div>

              {/* Title & Parent Co */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: 800,
                    letterSpacing: "0.5px",
                    color: "#ffffff",
                    lineHeight: 1.1,
                  }}
                >
                  AspectCut
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    color: "#c89c6e",
                    textTransform: "uppercase",
                  }}
                >
                  A Product of ZenithDistrict · zenithdistrict.com
                </span>
              </div>
            </div>

            {/* WASM Pill */}
            <span
              style={{
                fontSize: "13px",
                color: "#e8c89b",
                border: "1px solid rgba(200, 156, 110, 0.4)",
                backgroundColor: "rgba(200, 156, 110, 0.12)",
                padding: "6px 14px",
                borderRadius: "999px",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              100% In-Browser WebAssembly
            </span>
          </div>

          {/* Center Main Value Proposition */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                fontSize: "52px",
                fontWeight: 800,
                lineHeight: 1.12,
                color: "#ffffff",
                maxWidth: "960px",
              }}
            >
              Client-Side Video Aspect Ratio Changer &amp; Reframer
            </div>

            {/* Ratio Tags */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#e8c89b",
                  backgroundColor: "rgba(200, 156, 110, 0.15)",
                  border: "1px solid rgba(200, 156, 110, 0.4)",
                  padding: "6px 14px",
                  borderRadius: "10px",
                }}
              >
                16:9 → 9:16
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#d4cbbe",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "6px 14px",
                  borderRadius: "10px",
                }}
              >
                1:1 Square
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#d4cbbe",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "6px 14px",
                  borderRadius: "10px",
                }}
              >
                4:5 Portrait
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#d4cbbe",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "6px 14px",
                  borderRadius: "10px",
                }}
              >
                21:9 Ultrawide
              </span>
            </div>
          </div>

          {/* Bottom Bar: Privacy Guarantees */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(200, 156, 110, 0.22)",
              paddingTop: "24px",
              fontSize: "16px",
              color: "#a89f91",
            }}
          >
            <div style={{ display: "flex", gap: "28px" }}>
              <span>🔒 Zero Cloud Uploads</span>
              <span>⚡ Lossless Re-encoding</span>
              <span>✨ No Watermark</span>
            </div>
            <span
              style={{
                color: "#e8c89b",
                fontWeight: 700,
                fontSize: "18px",
                letterSpacing: "0.5px",
              }}
            >
              aspectcut.com
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

