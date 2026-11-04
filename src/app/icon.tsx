import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d0c0a",
          borderRadius: "8px",
          border: "1px solid #2e261f",
          position: "relative",
        }}
      >
        {/* Aspect Ratio Framing Geometry */}
        <div
          style={{
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Vertical Inner Screen */}
          <div
            style={{
              width: "10px",
              height: "16px",
              border: "2px solid #c89c6e",
              borderRadius: "3px",
              backgroundColor: "rgba(200, 156, 110, 0.25)",
            }}
          />
          {/* Center Glow Pip */}
          <div
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

