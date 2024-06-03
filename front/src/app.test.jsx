import React from "react";
import { render, cleanup, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import App, { initial_state } from "./app";

describe("Role bar controls", () => {

  const setup_timeout_ms = 200;
  function setup() {
    render(<App />);
    // Ensure the initial state
    const editing_btn = document.getElementById('editing-btn');
    fireEvent.click(editing_btn)
  }
  beforeEach(setup, setup_timeout_ms);
  afterEach(cleanup);

  it("can add a Role.", () => {

    const add_role_btn = document.getElementById('add-role-btn');
    let roles = document.getElementsByClassName('role');

    const initial_role_count = roles.length;
    fireEvent.click(add_role_btn);
    expect(roles.length).toBe(initial_role_count + 1);
  });


  it("Add and Remove rocks correctly.", () => {
    // Delete the first rock from a role with 2 rocks.
    // There should be 1 rock. 
    // Add a new rock
    // There should again be 2 rocks.
    // And each rock ID should be unique.

    const firstRole = document.getElementsByClassName('role')[0];
    let rocks = firstRole.getElementsByClassName('rock');  // This is live-updated.
    const firstDelete = rocks[0].querySelector('.btn');
    const addRockButton = within(firstRole).getByText('Add Rock');


    expect(rocks.length).toBe(2); // Initially 2 rocks in the first role
    fireEvent.click(firstDelete);
    expect(rocks.length).toBe(1); // Now there should only be 1 rock.
    fireEvent.click(addRockButton);
    expect(rocks.length).toBe(2); // Should be back to 2 rocks

    // Extract the rock ids to a Set to check that they are all unique.
    let uniqueRockIds = new Set();
    Array.from(rocks).forEach(rock => {uniqueRockIds.add(rock.dataset.key)});
    
    expect(uniqueRockIds.size).toBe(2); // Ensure the rock IDs are unique
  });
});