import React, { useState } from "react";

function Rock({ text }) {
  const [isEditing, setIsEditing] = useState(false);
  const [rockText, setRockText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setRockText(e.target.value);
  };

  return (
    <div className="rock d-flex align-items-center mb-2">
      <button
        onClick={handleEditClick}
        className="btn btn-sm btn-secondary mr-2"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      {isEditing ? (
        <input
          type="text"
          value={rockText}
          onChange={handleChange}
          className="form-control"
        />
      ) : (
        <p className="mb-0">{rockText}</p>
      )}
    </div>
  );
};

export default Rock;
