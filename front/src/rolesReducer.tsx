
export default function rolesReducer(roles, action) {
  switch (action.type) {
    case "addRole": {
      const newRole = {
        id: roles.length + 1,
        roleTitle: `Role ${roles.length + 1}`,
        rocks: [],
      };
      return [...roles, newRole];
    };

    case "updateRoleTitle": {
      return roles.map(role => (role.id === action.roleId ? { ...role, roleTitle: action.newTitle } : role));
    };

    case "deleteRole": {
      return roles.filter(role => role.id !== action.roleId);
    };

    case "addRock": {
      return roles.map(role => {
        if (role.id === action.roleId) {
          const newRock = { id: role.rocks.length + 1, text: `New Rock ${role.rocks.length + 1}` };
          return { ...role, rocks: [...role.rocks, newRock] };
        }
        return role;
      });
    };

    case "updateRockText": {
      return roles.map(role => {
        if (role.id === action.roleId) {
          const updatedRocks = role.rocks.map(rock => (rock.id === action.rockId ? { ...rock, text: action.newText } : rock));
          return { ...role, rocks: updatedRocks };
        }
        return role;
      });
    };

    case "deleteRock": {
      return roles.map(role => {
        if (role.id === action.roleId) {
          const updatedRocks = role.rocks.filter(rock => rock.id !== action.rockId);
          return { ...role, rocks: updatedRocks };
        }
        return role;
      });
    };

    default: {
      return roles;
    };
  }
}
