import App from "../../app";

interface Window {
  start: number;
  end: number;
};

export interface Offset {
  days: number;
  hours: number;
  minutes: number;
};

/*
OffsetAppt presents an appointment in a way that reframes it as relative to a base time.
This is a convenient display since our appointments all appear relative to the week start.
*/
export class Appt {
  summary: string;
  description: string;
  id: string;
  start: number;  // time
  durationMinutes: number;

  constructor(
    summary: string = "",
    {id = "", days = 0, hours = 0, minutes = 0, duration = 60, description = "" },
    baseTime: number = Date.now()) {
    this.summary = summary;
    this.description = description;
    this.id = id;
    this.start = offsetTime({ days, hours, minutes }, baseTime);
    this.durationMinutes = duration;
  };

  get isThisWeek(): Boolean {
    const window = getThisWeek();
    return (this.start > window.start) && (this.start < window.end);
  }
  get startDateISO(): string {
    return (new Date(this.start)).toISOString();
  }
  get endDateISO(): string {
    return (new Date(this.start + (60 * 1000 * this.durationMinutes)).toISOString());
  }
  get gEventResource(): object {
    const result = {
      'summary': this.summary,
      'start': {
        'dateTime': this.startDateISO,
      },
      'end': {
        'dateTime': this.endDateISO,
      },
      'description': this.description
    };
    if (this.id !== "") {
      result["id"] = this.id;
    }
    return result;
  }
};

export function apptFromGEvent(gEvent): Appt {
  const startTime = new Date(gEvent.start.dateTime).getTime();
  const duration = (new Date(gEvent.end.dateTime).getTime() - startTime) / 60000;
  return new Appt(gEvent.summary, {id: gEvent.id, description: gEvent.description, duration: duration}, startTime);
}

export function getPrevMidnight(time: number): number {
  const result = new Date(time)
  result.setHours(0, 0, 0, 0);
  return result.getTime();
}

export function addDays(time, daysToAdd: number): number {
  return time + daysToAdd * 24 * 3600 * 1000;
}

function getToday(): Window {
  const start = getPrevMidnight(Date.now());
  const end = addDays(start, 1);
  return { start, end };
}

export function getWeekStart(date: Date): number {
  const thisTimePrevSunday = addDays(date.getTime(), -date.getDay());
  return getPrevMidnight(thisTimePrevSunday);
}

export function getThisWeek(): Window {
  const start = getWeekStart(new Date());
  const end = addDays(start, 7);
  return { start, end };
}

export function getApptsInWindow(appts: Appt[], window: Window): Appt[] {
  return appts.filter(appt => (appt.start > window.start) && (appt.start < window.end));
}

export function getApptsThisWeek(appts: Appt[]) {
  return getApptsInWindow(appts, getThisWeek());
}

export function getApptsToday(appts: Appt[]) {
  return getApptsInWindow(appts, getToday());
}

export function getSummariesAsString(appts: Appt[]) {
  return appts.reduce((accum: string, result) => (accum + result.summary), "");
}

export function offsetTime({days=0, hours=0, minutes=0}, baseTime: number): number {
  return baseTime + 60000 * (minutes + 60 * (hours + 24 * days));
}
