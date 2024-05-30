import React from 'react';
import Rock from './Rock';

const Role = ({ role, isEditing, updateRoleTitle, addRock, updateRockText }) => {
  const handleTitleChange = (e) => {
    updateRoleTitle(role.id, e.target.value);
  };

  return (
    <div className="role mb-3">
      <div className="role-header d-flex justify-content-between align-items-center mb-2">
        {isEditing ? (
          <input
            type="text"
            value={role.roleTitle}
            onChange={handleTitleChange}
            className="form-control"
          />
        ) : (
          <span className="font-weight-bold">{role.roleTitle}</span>
        )}
      </div>
      <div className="role-rocks">
        {role.rocks.map(rock => (
          <Rock
            key={rock.id}
            rock={rock}
            isEditing={isEditing}
            updateRockText={(newText) => updateRockText(role.id, rock.id, newText)}
          />
        ))}
        {isEditing && (
          <button className="btn btn-primary btn-sm mt-2" onClick={() => addRock(role.id)}>
            Add Rock
          </button>
        )}
      </div>
    </div>
  );
};

export default Role;
