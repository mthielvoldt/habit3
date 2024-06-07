import App from "../../app";

interface Window {
  start: Date;
  end: Date;
};

export interface Offset {
  days: number;
  hours: number;
  minutes: number;
};

export interface Appt {
  name: string;
  start: Date;
  durationMinutes: number;
};

/*
OffsetAppt presents an appointment in a way that reframes it as relative to a base time.
This is a convenient display since our appointments all appear relative to the week start.
*/
export class OffsetAppt {
  name: string;
  start: Offset;
  durationMinutes: number;
  baseTime: number;

  constructor(
      name: string,
      {days = 0, hours = 0, minutes = 0, duration = 60 }, 
      baseTime: number = Date.now()) {
    this.name = name,
    this.start = { days, hours, minutes };
    this.durationMinutes = duration;
    this.baseTime = baseTime;
  };

  get appt(): Appt {
    return {
      name: this.name,
      start: new Date(this.baseTime +
        60000 * (this.start.minutes + 60 * (this.start.hours + 24 * this.start.days))),
      durationMinutes: this.durationMinutes
    }
  };

  get isThisWeek(): Boolean {
    const window = getThisWeek();
    return (this.appt.start > window.start) && (this.appt.start < window.end);
  }
};

function getPrevMidnight(date: Date) {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0);
  return result;
}

export function addDays(date: Date, daysToAdd: number) {
  return new Date(date.getTime() + daysToAdd * 24 * 3600 * 1000)
}
function getToday(): Window {
  const start = getPrevMidnight(new Date());
  const end = addDays(start, 1);
  return { start, end };
}

export function getWeekStart(date: Date) {
  const thisTimePrevSunday = addDays(date, -date.getDay());
  return getPrevMidnight(thisTimePrevSunday);
}

function getThisWeek(): Window {
  const start = getWeekStart( new Date());
  const end = addDays(start, 7);
  return { start, end };
}

function getApptsInWindow(appts: Appt[], window: Window): Appt[] {
  return appts.filter(appt => (appt.start > window.start) && (appt.start < window.end));
}

export function getApptsThisWeek(appts: Appt[]) {
  return getApptsInWindow(appts, getThisWeek());
}

export function getApptsToday(appts: Appt[]) {
  return getApptsInWindow(appts, getToday());
}

function offsetToDate(offset: Offset, baseDate: Date) {
  const baseTime = baseDate.getTime();
  return new Date(baseTime + 60000 * (offset.minutes + 60 * (offset.hours + 24 * offset.days)));
}

export function offsetsToDateAppts(offsetAppts: OffsetAppt[], baseDate: Date) {
  return offsetAppts.map((offsetAppt) => (
    { ...offsetAppt, start: offsetToDate(offsetAppt.start, baseDate) }
  ));
}