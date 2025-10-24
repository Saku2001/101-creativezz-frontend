import React from "react";
import "./Lightbox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Lightbox({ item, onClose, onDelete }) {
  if (!item) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(item.previewUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = item.filename || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download file.");
    }
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-media">
          {item.isVideo ? (
            <video
              key={item.id}
              src={item.previewUrl}
              controls
              autoPlay
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <img
              key={item.id}
              src={item.previewUrl}
              alt={item.description}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          )}
        </div>

        <div className="lightbox-info">
          <h3>Author: {item.author}</h3>
          <p>{item.description}</p>

          <button onClick={handleDownload} className="download-btn">
            Download
          </button>
          <button className="delete-btn" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>

        <button className="lightbox-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}
