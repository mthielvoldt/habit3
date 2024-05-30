import React, { useState } from "react";
import Rock from './Rock';

function Role({ roleTitle, rocks }) {
  const [roleRocks, setRoleRocks] = useState(rocks);

  const addRock = () => {
    const newRock = { text: `New Rock ${roleRocks.length + 1}` };
    setRoleRocks([...roleRocks, newRock]);
  };

  return (
    <div className="role mb-3">
      <div className="role-header d-flex justify-content-between align-items-center mb-2">
        <span className="font-weight-bold">{roleTitle}</span>
        <button className="btn btn-primary btn-sm" onClick={addRock}>
          Add Rock
        </button>
      </div>
      <div className="role-rocks">
        {roleRocks.map((rock, index) => (
          <Rock key={index} text={rock.text} />
        ))}
      </div>
    </div>
  );
};

export default Role;

