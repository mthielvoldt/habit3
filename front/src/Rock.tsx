import React, { useState, useEffect } from 'react';

const Rock = ({ text, isEditing }) => {
  const [rockText, setRockText] = useState(text);

  useEffect(() => {
    if (!isEditing) {
      setRockText(text);
    }
  }, [isEditing, text]);

  const handleChange = (e) => {
    setRockText(e.target.value);
  };

  return (
    <div className="rock d-flex align-items-center mb-2">
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
