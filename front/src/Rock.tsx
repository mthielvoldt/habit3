import React from 'react';

const Rock = ({ rock, isEditing, updateRockText }) => {
  const handleChange = (e) => {
    updateRockText(e.target.value);
  };

  return (
    <div className="rock d-flex align-items-center mb-2">
      {isEditing ? (
        <input
          type="text"
          value={rock.text}
          onChange={handleChange}
          className="form-control"
        />
      ) : (
        <p className="mb-0">{rock.text}</p>
      )}
    </div>
  );
};

export default Rock;
