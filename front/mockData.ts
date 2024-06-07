import { Appt, getWeekStart } from "./src/calendar/utils/timeUtils";

export const mockRoles = [
  { id: 1, roleTitle: 'Role 1', rocks: [{ id: 1, text: 'Rock 1' }, { id: 2, text: 'Rock 2' }] },
  { id: 2, roleTitle: 'Role 2', rocks: [{ id: 3, text: 'Rock 1' }] },
];

const baseTime = getWeekStart(new Date());
export const mockAppts: Appt[] = [
  new Appt("Appointment 0", {days: -1}, baseTime),
  new Appt("Appointment 1", {minutes: 1}, baseTime),
  new Appt("Appointment 2", {hours: 7, minutes: 30}, baseTime),
  new Appt("Appointment 3", {days: 3, hours: 9, duration:120}, baseTime), 
  new Appt("Appointment 4", {days: 9}, baseTime),
  new Appt("Appointment 5", {}, baseTime)
]