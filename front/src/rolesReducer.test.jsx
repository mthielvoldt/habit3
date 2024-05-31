import React from "react";
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, test, expect } from "vitest";
import rolesReducer from "./rolesReducer";

describe("Rock+Roll state modifiers", () => {
  test("avoid re-using rock ID's following rock deletion.", () => {

    const initial_state = [
      { id: 1, roleTitle: 'Role 1', rocks: [{ id: 1, text: 'Rock 1' }, { id: 2, text: 'Rock 2' }] },
    ];
    let roles = rolesReducer(initial_state, { type: "" });

    expect(roles[0].rocks.length).toBe(2)

  });
});