import React, { useRef, useState } from "react";
import "./UploadForm.css";

export default function UploadForm({ handleUpload }) {
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = fileInputRef.current?.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("author", author);
    formData.append("description", description);

    await handleUpload(formData);

    // Reset form
    setAuthor("");
    setDescription("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Add your content</h1>

        <div className="form-input-material">
          <input
            type="file"
            accept="image/*,video/*"
            ref={fileInputRef}
            className="form-control-material"
            required
          />
          <label>Video/Photo</label>
        </div>

        <div className="form-input-material">
          <input
            type="text"
            className="form-control-material"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <label>Author</label>
        </div>

        <div className="form-input-material">
          <textarea
            className="form-control-material"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label>Description</label>
        </div>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </section>
  );
}
