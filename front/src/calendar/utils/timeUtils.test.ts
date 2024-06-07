import { describe, it, test, expect, beforeEach, afterEach, beforeAll } from "vitest";
import * as tu from "./timeUtils";
import { mockOAppts } from "../../../mockData";


describe("getApptsThisWeek", () => {

  it("Excludes only dates before and after this week.", () => {
    // convert offset appts to normal appts.
    const appts = mockOAppts.map(oAppt => oAppt.appt);

    const results = tu.getApptsThisWeek(appts);
    expect(results.reduce((accum: string, result) => (accum + result.name), "")).toBe("123")
  });
});

test("offsetsToDateAppts works", async () => {
  const offsetAppt = new tu.OffsetAppt("Some Name", {});
  await new Promise(resolve => setTimeout(resolve, 200));
  const difference_ms = Date.now() - offsetAppt.appt.start.getTime();
  expect(difference_ms).toBeCloseTo(200, -2)  // allow for 49ms difference.
})

// test("toBeCloseTo operation", () => {
//   expect(201).not.toBeCloseTo(200);
//   expect(204).toBeCloseTo(200, -1);
//   expect(205).not.toBeCloseTo(200, -1);
//   expect(249).toBeCloseTo(200, -2);
//   expect(250).not.toBeCloseTo(200, -2);
// })
