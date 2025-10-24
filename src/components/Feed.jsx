import React, { useState } from "react";
import "./Feed.css";

export default function Feed({ uploads, searchTerm, onItemClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredUploads = uploads.filter(
    (item) =>
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUploads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUploads = filteredUploads.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <section className="feed-section">
      <h2>Recent Uploads</h2>
      {filteredUploads.length === 0 ? (
        <p>No uploads yet. Add something above!</p>
      ) : (
        <>
          <div className="uploads-grid">
            {currentUploads.map((item) => (
              <div
                key={item.id}
                className="upload-card"
                onClick={() => {
                  document.querySelectorAll(".upload-media").forEach((vid) => {
                    if (vid.tagName === "VIDEO") vid.pause();
                  });
                  onItemClick(item);
                }}
              >
                <div className="image-wrapper">
                  {item.isVideo ? (
                    <video
                      key={item.id}
                      src={item.previewUrl}
                      className="upload-media"
                      controls
                      preload="metadata"
                    />
                  ) : (
                    <img
                      key={item.id}
                      src={item.previewUrl}
                      alt={item.description}
                      className="upload-media"
                    />
                  )}
                  <div className="author-overlay">{item.author}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
