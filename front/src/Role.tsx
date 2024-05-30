import React, { useState, useEffect } from 'react';
import Rock from './Rock';

const Role = ({ roleTitle, rocks, isEditing }) => {
  const [roleRocks, setRoleRocks] = useState(rocks);
  const [title, setTitle] = useState(roleTitle);

  useEffect(() => {
    if (!isEditing) {
      setTitle(roleTitle);
    }
  }, [isEditing, roleTitle]);

  const addRock = () => {
    const newRock = { text: `New Rock ${roleRocks.length + 1}` };
    setRoleRocks([...roleRocks, newRock]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="role mb-3">
      <div className="role-header d-flex justify-content-between align-items-center mb-2">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-control"
          />
        ) : (
          <span className="font-weight-bold">{title}</span>
        )}
        <button className="btn btn-primary btn-sm" onClick={addRock}>
          Add Rock
        </button>
      </div>
      <div className="role-rocks">
        {roleRocks.map((rock, index) => (
          <Rock key={index} text={rock.text} isEditing={isEditing} />
        ))}
      </div>
    </div>
  );
};

export default Role;
