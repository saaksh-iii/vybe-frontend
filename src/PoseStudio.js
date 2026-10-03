import React, { useState } from "react";

// adds Cloudinary auto format/quality + width to a delivery URL
function optimize(url, width = 600) {
  if (!url || !url.includes("/image/upload/")) return url;
  return url.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${width}/`);
}

function PoseStudio({ poses = [], onMakeBoard, loading }) {
  const [selectedPose, setSelectedPose] = useState(null);
  const [openPose, setOpenPose] = useState(null);

  return (
    <div style={{ backgroundColor:"var(--cream)", padding:"40px" }}>
      <h2 style={{ fontFamily:"var(--font-headline)", color:"var(--ink)", fontSize:"32px", marginBottom:"20px" }}>
        Poses picked for your vibe 🌟
      </h2>

      <div style={{ display:"flex", gap:"20px" }}>
        {poses.map(pose => (
          <div key={pose.name}
            style={{
              backgroundColor: selectedPose===pose.name ? "var(--lavender)" : "white",
              borderRadius:"var(--radius-card)",
              padding:"20px",
              boxShadow:"0 2px 6px rgba(0,0,0,0.1)",
              cursor:"pointer",
              flex:"1"
            }}
            onClick={() => setSelectedPose(pose.name)}
          >
            {pose.imageUrl ? (
              <img
                src={optimize(pose.imageUrl)}
                alt={pose.name}
                style={{ width:"100%", height:"220px", objectFit:"cover", borderRadius:"8px", marginBottom:"10px" }}
              />
            ) : (
              <div style={{ backgroundColor:"var(--deep-cream)", height:"120px", marginBottom:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>🖼️</div>
            )}

            <h3 style={{ fontFamily:"var(--font-body)" }}>{pose.name}</h3>
            <p style={{ fontFamily:"var(--font-body)", color:"var(--soft-ink)" }}>
              {pose.instructions?.expression}
            </p>

            <button
              onClick={(e) => { e.stopPropagation(); setOpenPose(openPose === pose.name ? null : pose.name); }}
              style={{
                backgroundColor:"var(--gold)",
                borderRadius:"var(--radius-pill)",
                padding:"8px 16px",
                border:"none",
                marginTop:"10px",
                cursor:"pointer"
              }}
            >
              {openPose === pose.name ? "Hide instructions" : "View instructions 📖"}
            </button>

            {openPose === pose.name && pose.instructions && (
              <div style={{ fontFamily:"var(--font-body)", color:"var(--ink)", marginTop:"12px", fontSize:"14px", lineHeight:1.5 }}>
                <p><strong>Pose:</strong> {pose.instructions.pose}</p>
                <p><strong>Hands:</strong> {pose.instructions.hands}</p>
                <p><strong>Expression:</strong> {pose.instructions.expression}</p>
                <p><strong>Tip:</strong> {pose.instructions.tip}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onMakeBoard}
        disabled={loading}
        style={{
          backgroundColor:"var(--deep-terracotta)",
          borderRadius:"var(--radius-pill)",
          color:"white",
          padding:"12px 24px",
          border:"none",
          cursor: loading ? "wait" : "pointer",
          opacity: loading ? 0.6 : 1,
          marginTop:"30px"
        }}
      >
        {loading ? "Building…" : "Build my board 🛠️"}
      </button>
    </div>
  );
}

export default PoseStudio;