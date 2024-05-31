import React from "react";
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, test, expect } from "vitest";
import App, { initial_state } from "./app";

describe("Role bar controls", () => {
  test("Add and Remove rocks correctly.", () => {
    // render App
    // delete the first rock from a role with 2 rocks.
    // call addRock
    // expect that addRock was passed roleID != 2.
    const {container} = render(<App />);

    // Ensure the initial state
    const editing_btn = document.getElementById('editing-btn');
    fireEvent.click(editing_btn)

    const firstRole = document.getElementsByClassName('role')[0];

    // This is live-updated.
    let rocks = firstRole.getElementsByClassName('rock');  
    expect(rocks.length).toBe(2); // Initially 2 rocks in the first role
    
    // Directly call handleDeleteRock function on the App component
    const firstDelete = rocks[0].querySelector('.btn');
    fireEvent.click(firstDelete);
    expect(rocks.length).toBe(1); // Now there should only be 1 rock.

    // Add a new rock, and expect number of rocks to go back to 2.
    const addRockButton = within(firstRole).getByText('Add Rock');
    fireEvent.click(addRockButton);
    expect(rocks.length).toBe(2); // Should be back to 2 rocks

    // Extract the rock ids to a Set to check that they are all unique.
    const rocks_arr = Array.from(rocks);
    
    let uniqueRockIds = rocks_arr.reduce(
      (uniqueRockIds, rock) => {return uniqueRockIds.add(rock.dataset.key)},
      new Set()
    );
    // console.log(uniqueRockIds);
    expect(uniqueRockIds.size).toBe(2); // Ensure the rock IDs are unique
  });
});