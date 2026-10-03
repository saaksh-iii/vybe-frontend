import React, { useState } from "react";

function Upload({ onNext, loading }) {
  const [files, setFiles] = useState([]);

  function handleChange(e) {
    setFiles(Array.from(e.target.files || []));
  }

  return (
    <div style={{ backgroundColor:"var(--cream)", padding:"40px" }}>
      <h2 style={{ fontFamily:"var(--font-headline)", color:"var(--ink)", fontSize:"32px", marginBottom:"10px" }}>
        Drop in your photos 📸
      </h2>
      <p style={{ fontFamily:"var(--font-body)", color:"var(--soft-ink)", marginBottom:"20px" }}>
        Add 3 to 5 photos for a full carousel. We handle the cropping.
      </p>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        disabled={loading}
        style={{ marginBottom:"20px" }}
      />

      <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"20px" }}>
        {files.map((f, i) => (
          <img
            key={i}
            src={URL.createObjectURL(f)}
            alt={f.name}
            style={{ width:"110px", height:"140px", objectFit:"cover", borderRadius:"var(--radius-card)", boxShadow:"0 2px 6px rgba(0,0,0,0.1)" }}
          />
        ))}
      </div>

      <button
        onClick={() => onNext(files)}
        disabled={loading || files.length === 0}
        style={{
          backgroundColor:"var(--deep-terracotta)",
          borderRadius:"var(--radius-pill)",
          color:"white",
          padding:"12px 24px",
          border:"none",
          cursor: loading ? "wait" : "pointer",
          opacity: loading || files.length === 0 ? 0.6 : 1
        }}
      >
        {loading ? "Uploading to Cloudinary…" : "Next: see poses ➡️"}
      </button>
    </div>
  );
}

export default Upload;