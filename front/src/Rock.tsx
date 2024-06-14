import React from 'react';
import { useDrag } from 'react-dnd';
import './App.css';

const Rock = ({ rock, isEditing, updateRockText, deleteRock }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'rock',
    item: {...rock, type: "rock"},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [rock]);

  const handleChange = (e) => {
    updateRockText(rock.id, e.target.value);
  };

  return (
    <div className="rock d-flex align-items-center mb-2" data-key={rock.id}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={rock.text}
            onChange={handleChange}
            className="form-control"
          />
          <button className="btn btn-danger btn-sm ml-2" onClick={deleteRock}>
            Delete
          </button>
        </>
      ) : (
        <p ref={drag} className="draggable">
          {rock.text}
        </p>
      )}
    </div>
  );
};

export default Rock;
