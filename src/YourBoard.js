import React, { useState } from "react";

function YourBoard({ slides = [], onStartOver }) {
  const [selected, setSelected] = useState(0);
  const current = slides[selected];

  return (
    <div style={{ backgroundColor:"var(--deep-cream)", padding:"40px" }}>
      <h2 style={{ fontFamily:"var(--font-headline)", color:"var(--ink)", fontSize:"32px", marginBottom:"20px" }}>
        Your VYBE Board 📋
      </h2>

      {slides.length === 0 ? (
        <p style={{ fontFamily:"var(--font-body)" }}>No board yet. Go back and build one.</p>
      ) : (
        <>
          <div style={{ marginBottom:"20px" }}>
            <button style={{ margin:"5px" }} disabled>Instagram 📱 (4:5)</button>
          </div>

          <div style={{ display:"flex", gap:"10px", marginBottom:"20px", flexWrap:"wrap" }}>
            {slides.map((slide, i) => (
              <div key={slide.assetId}
                style={{
                  backgroundColor: selected===i ? "var(--lavender)" : "white",
                  borderRadius:"var(--radius-card)",
                  padding:"10px",
                  boxShadow:"0 2px 6px rgba(0,0,0,0.1)",
                  cursor:"pointer",
                  width:"150px"
                }}
                onClick={() => setSelected(i)}
              >
                <img
                  src={slide.url}
                  alt={slide.role}
                  style={{ width:"100%", aspectRatio:"4 / 5", objectFit:"cover", borderRadius:"8px" }}
                />
                <p style={{ fontFamily:"var(--font-body)", textAlign:"center", marginTop:"6px" }}>
                  {slide.role === "cover" ? "Cover" : slide.role.replace("slide-", "Slide ")}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginBottom:"30px" }}>
            <a href={current.url} target="_blank" rel="noreferrer">
              <button style={{ margin:"5px" }}>Export 📤</button>
            </a>
            <button style={{ margin:"5px" }} onClick={onStartOver}>Change vibe 🎨</button>
          </div>

          <h3 style={{ fontFamily:"var(--font-headline)", color:"var(--ink)" }}>Smart Photo Rescue 🪄</h3>
          <p style={{ fontFamily:"var(--font-body)", color:"var(--soft-ink)" }}>
            This photo works. We'll fix the framing. Cloudinary's content-aware cropping preserves the subject while adapting to every format automatically.
          </p>
          <div style={{ display:"flex", gap:"20px", alignItems:"center", flexWrap:"wrap" }}>
            <figure style={{ margin:0, backgroundColor:"white", padding:"12px", borderRadius:"var(--radius-card)" }}>
              <img src={current.beforeUrl} alt="Basic center crop" style={{ width:"220px", aspectRatio:"4 / 5", objectFit:"cover", borderRadius:"8px" }} />
              <figcaption style={{ fontFamily:"var(--font-body)", textAlign:"center", marginTop:"6px" }}>BEFORE · center crop</figcaption>
            </figure>
            <span>➡️</span>
            <figure style={{ margin:0, backgroundColor:"white", padding:"12px", borderRadius:"var(--radius-card)" }}>
              <img src={current.url} alt="VYBE smart crop" style={{ width:"220px", aspectRatio:"4 / 5", objectFit:"cover", borderRadius:"8px" }} />
              <figcaption style={{ fontFamily:"var(--font-body)", textAlign:"center", marginTop:"6px" }}>AFTER · Instagram 4:5 smart crop</figcaption>
            </figure>
          </div>
        </>
      )}
    </div>
  );
}

export default YourBoard;