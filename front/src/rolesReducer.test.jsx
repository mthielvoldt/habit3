import React from "react";
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, test, expect } from "vitest";
import rolesReducer, { deleteRockAction, addRockAction } from "./rolesReducer";

describe("Rock+Roll state modifiers", () => {
  test("avoid re-using rock ID's following rock deletion.", () => {

    const initial_state = [
      { id: 1, roleTitle: 'Role 1', rocks: [{ id: 1, text: 'Rock 1' }, { id: 2, text: 'Rock 2' }] },
    ];
    let roles

    // delete the first rock in the first role. 
    roles = rolesReducer(initial_state, deleteRockAction(1, 1));
    expect(roles[0].rocks.length).toBe(1)

    // add a rock back.
    roles = rolesReducer(roles, addRockAction(1));

    let uniqueRockIds = new Set();
    roles[0].rocks.forEach(rock => { uniqueRockIds.add(rock.id) });

    // console.log(roles[0].rocks)
    expect(uniqueRockIds.size).toBe(2);
  });
});