import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d0c0a",
          borderRadius: "40px",
          border: "2px solid #2e261f",
          padding: "24px",
        }}
      >
        {/* Frosted Layer */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid rgba(200, 156, 110, 0.4)",
            borderRadius: "28px",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            position: "relative",
          }}
        >
          {/* 9:16 Vertical Highlight Frame */}
          <div
            style={{
              width: "56px",
              height: "96px",
              border: "3px solid #c89c6e",
              borderRadius: "10px",
              backgroundColor: "rgba(200, 156, 110, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                boxShadow: "0 0 10px #c89c6e",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
