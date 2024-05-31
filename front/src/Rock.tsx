import React from 'react';

const Rock = ({ rock, isEditing, updateRockText, deleteRock }) => {
  const handleChange = (e) => {
    updateRockText(rock.id, e.target.value);
  };

  return (
    <div className="rock d-flex align-items-center mb-2" data-key={rock.id}>
      {isEditing ? (
        <input
          type="text"
          value={rock.text}
          onChange={handleChange}
          className="form-control"
        />
      ) : (
        <p className="mb-0 flex-grow-1">{rock.text}</p>
      )}
      {isEditing && (
        <button className="btn btn-danger btn-sm ml-2" onClick={deleteRock}>
          Delete
        </button>
      )}
    </div>
  );
};

export default Rock;
