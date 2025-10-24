const API_URL = process.env.REACT_APP_BACKEND_URL;

import React, { useRef, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeadlineCard from "./components/HeadlineCard";
import UploadForm from "./components/UploadForm";
import Feed from "./components/Feed";
import Lightbox from "./components/Lightbox";
import "./App.css";

function App() {
  const [uploads, setUploads] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // lift state here
  const [searchTerm, setSearchTerm] = useState("");
  const feedRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/api/uploads`)
      .then((res) => res.json())
      .then((data) => setUploads(data))
      .catch((err) => console.error("Error fetching uploads:", err));
  }, []);

  const handleUpload = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/api/uploads`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const newUpload = await res.json();
      setUploads((prev) => [newUpload, ...prev]);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      await fetch(`${API_URL}/api/uploads/${selectedItem.id}`, {
        method: "DELETE",
      });

      setUploads((prev) => prev.filter((item) => item.id !== selectedItem.id));
      setSelectedItem(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);

    if (value.trim() !== "" && feedRef.current) {
      feedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar onSearchChange={handleSearchChange} />

      <main className="app-container">
        <section className="headline-section">
          <HeadlineCard uploads={uploads} onItemClick={setSelectedItem} />
        </section>

        <section className="form-section">
          <UploadForm handleUpload={handleUpload} />
        </section>
        <div ref={feedRef}>
          <Feed
            uploads={uploads}
            searchTerm={searchTerm}
            onItemClick={setSelectedItem}
          />
        </div>
      </main>

      {/* Lightbox at top-level */}
      {selectedItem && (
        <Lightbox
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default App;
