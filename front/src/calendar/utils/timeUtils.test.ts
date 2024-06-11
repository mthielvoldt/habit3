import { describe, it, test, expect, beforeEach, afterEach, beforeAll } from "vitest";
import * as tu from "./timeUtils";


describe("getApptsThisWeek", () => {

  it("Excludes only dates before and after this week.", () => {
    const baseTime = tu.getWeekStart(new Date());
    const mockAppts: tu.Appt[] = [
      new tu.Appt("0", { days: -1 }, baseTime),
      new tu.Appt("1", { minutes: 1 }, baseTime),
      new tu.Appt("2", { hours: 9 }, baseTime),
      new tu.Appt("3", { days: 3, hours: 12 }, baseTime),
      new tu.Appt("4", { days: 9 }, baseTime),
      new tu.Appt("5", {}, baseTime)
    ]

    const results = tu.getApptsThisWeek(mockAppts);
    expect(tu.getSummariesAsString(results)).toBe("123");
  });
});

test("getApptsToday works", async () => {
  const baseTime = tu.getPrevMidnight(Date.now());
  const mockAppts: tu.Appt[] = [
    new tu.Appt("0", { days: -1 }, baseTime),
    new tu.Appt("1", { minutes: -1 }, baseTime),
    new tu.Appt("2", { minutes: 9 }, baseTime),
    new tu.Appt("3", { hours: 3, minutes: 12 }, baseTime),
    new tu.Appt("4", { days: 9 }, baseTime),
    new tu.Appt("5", { }, baseTime)
  ]

  const results = tu.getApptsToday(mockAppts);
  expect(tu.getSummariesAsString(results)).toBe("23");
})

// test("toBeCloseTo operation", () => {
//   expect(201).not.toBeCloseTo(200);
//   expect(204).toBeCloseTo(200, -1);
//   expect(205).not.toBeCloseTo(200, -1);
//   expect(249).toBeCloseTo(200, -2);
//   expect(250).not.toBeCloseTo(200, -2);
// })
