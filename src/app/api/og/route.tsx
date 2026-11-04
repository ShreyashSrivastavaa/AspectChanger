import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Video Aspect Ratio Changer";
  const ratio = searchParams.get("ratio") || "16:9 → 9:16";
  const category = searchParams.get("cat") || "Free Client-Side Video Tool";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d0c0a",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(200, 156, 110, 0.18), transparent 45%), radial-gradient(circle at 15% 85%, rgba(180, 130, 80, 0.12), transparent 40%)",
          color: "#f5f3ef",
          padding: "48px 60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Outer frosted border container */}
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(200, 156, 110, 0.28)",
            borderRadius: "24px",
            backgroundColor: "rgba(20, 18, 16, 0.75)",
            padding: "48px 52px",
          }}
        >
          {/* Top Bar: Brand + Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  backgroundColor: "#c89c6e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(200, 156, 110, 0.5)",
                }}
              />
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  color: "#ffffff",
                }}
              >
                AspectCut
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#c89c6e",
                  border: "1px solid rgba(200, 156, 110, 0.4)",
                  backgroundColor: "rgba(200, 156, 110, 0.08)",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  marginLeft: "8px",
                }}
              >
                WebCodecs Engine
              </span>
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#a89f91",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                fontWeight: 600,
              }}
            >
              {category}
            </div>
          </div>

          {/* Center Title & Transformation */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "20px",
                color: "#e8c89b",
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  border: "1px solid rgba(232, 200, 155, 0.35)",
                  backgroundColor: "rgba(200, 156, 110, 0.12)",
                  padding: "6px 14px",
                  borderRadius: "8px",
                }}
              >
                {ratio}
              </span>
            </div>

            <div
              style={{
                fontSize: "50px",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#ffffff",
                maxWidth: "980px",
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom Bar: Privacy & Speed Guarantees */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(200, 156, 110, 0.2)",
              paddingTop: "24px",
              fontSize: "16px",
              color: "#a89f91",
            }}
          >
            <div style={{ display: "flex", gap: "24px" }}>
              <span>🔒 100% In-Browser Privacy</span>
              <span>⚡ Zero Cloud Uploads</span>
              <span>✨ No Watermark</span>
            </div>
            <span
              style={{
                color: "#e8c89b",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              aspectcut.com
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
