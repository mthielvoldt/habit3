import { OffsetAppt, getWeekStart } from "./src/calendar/utils/timeUtils";

export const mockRoles = [
  { id: 1, roleTitle: 'Role 1', rocks: [{ id: 1, text: 'Rock 1' }, { id: 2, text: 'Rock 2' }] },
  { id: 2, roleTitle: 'Role 2', rocks: [{ id: 3, text: 'Rock 1' }] },
];

const baseTime = getWeekStart(new Date()).getTime();
export const mockOAppts: OffsetAppt[] = [
  new OffsetAppt("0", {days: -1}, baseTime),
  new OffsetAppt("1", {minutes: 1}, baseTime),
  new OffsetAppt("2", {hours: 9}, baseTime),
  new OffsetAppt("3", {days: 3, hours: 12}, baseTime), 
  new OffsetAppt("4", {days: 9}, baseTime),
  new OffsetAppt("5", {}, baseTime)
]