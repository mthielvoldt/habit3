
export default function rolesReducer(roles, action) {
  switch (action.type) {
    case "replaceAll": {
      return  action.newRoles;
      
    };
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
          const newRockId = crypto.randomUUID();
          const newRock = { id: newRockId, text: "New Rock" };
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

export function replaceAllRoles(rolesJSON) {
  const newRoles = JSON.parse(rolesJSON);
  console.log("replaceAllRoles", newRoles);
  return { type: "replaceAll", newRoles, skipSync: true };
}

export function addRoleAction() {
  return { type: "addRole" };
}

export function updateRoleTitleAction(roleId, newTitle) {
  return { type: "updateRoleTitle", roleId: roleId, newTitle: newTitle };
};

export function deleteRoleAction(roleId) {
  return { type: "deleteRole", roleId: roleId };
};

export function addRockAction(roleId) {
  return { type: "addRock", roleId: roleId };
};

export function updateRockTextAction(roleId, rockId, newText) {
  return { type: "updateRockText", roleId: roleId, rockId: rockId, newText: newText };
};

export function deleteRockAction(roleId, rockId) {
  return { type: "deleteRock", roleId: roleId, rockId: rockId };
};


// export function (roleId) {
//   return { type: "", roleId: roleId, };
// };