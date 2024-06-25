import React from "react";
import { render, cleanup, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import App from "../app";
import { mockRoles } from "../../mockData";


describe("Calendar", () => {
  const testTimeoutMs = 200;
  function setup () {
    render(<App initialRoles={mockRoles}/>);
  }
  beforeEach(setup, testTimeoutMs);
  afterEach(cleanup);

  it.skip("reveals Rock shadow when rock is dragged above.", async () => {
    const user = userEvent.setup();
    const firstRock = document.querySelector('.rock .draggable');
    const firstDay = document.querySelector('.day');
    const firstDayShadow = firstDay.getElementsByClassName('shadow-event');
    let shadowsByRole = within(firstDay).queryAllByRole('tooltip');

    expect(firstRock).toBeDefined();
    expect(firstDayShadow.length).toBe(1);
    expect(shadowsByRole.length).toBe(0); // We expect the shadow has visibility: hidden;

    await user.pointer([
      {keys: '[MouseLeft>]', target: firstRock},  // left-click and hold on a rock.
      {target: firstDay},                        // move the pointer to the first day. 
      // {keys: '[/MouseLeft]'}
    ]);
    shadowsByRole = within(firstDay).queryAllByRole('tooltip', {});
    expect(shadowsByRole.length).toBe(1);
  });
});