import * as tu from './utils/timeUtils'

// TODO BEFORE HOSTING: Move this to server.
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// Discovery doc URL for APIs used by the quickstart
const CALENDAR_DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const PEOPLE_DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile';

let tokenClient = google.accounts.oauth2.initTokenClient({
  client_id: CLIENT_ID,
  scope: SCOPES,
  callback: '', // defined later
});
let isReady = false;

gapi.load('client', initializeGapiClient);

/**
 *  Sign in the user upon button click.
 */
export async function fetchEvents() {
  let events = [], user = { name: "", avatar: "" }, rolesEvent = [];
  console.log("fetchEvents");
  retreiveToken();

  try {
    events = await listWeeksEvents();
  } catch {
    try {
      console.log("Requesting new access token.");
      const tokenPromise = new Promise((resolve, reject) => {
        tokenClient.callback = (resp) => {
          if (resp.error !== undefined) {
            throw (resp);
          }
          // document.getElementById('signout_button').style.visibility = 'visible';
          // document.getElementById('authorize_button').innerText = 'Refresh';
          storeToken();
          resolve(listWeeksEvents());
        };
        tokenClient.requestAccessToken({ prompt: '' });
      });
      events = await tokenPromise;
    } catch {
      // TODO: this doesn't work. 
      console.error("Could not get new access token");
    }
  }
  try {
    user = await getUser();
  } catch (error) {
    console.error("getUser", error);
  }
  try {
    rolesEvent = await getRoles();
  } catch (error) {
    console.error("getRoles", error);
  }
  return { events, user, rolesEvent };
}

/**
 *  Sign out the user upon button click.
 */
export function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    storeToken(); // This clears the previously stored token. 
  }
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
async function listWeeksEvents() {
  console.log("listWeeksEvents");
  let response;
  const week = tu.getThisWeek();

  const request = {
    'calendarId': 'primary',
    'timeMin': (new Date(week.start)).toISOString(),
    'timeMax': (new Date(week.end)).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 50,
    'orderBy': 'startTime',
  };
  response = await gapi.client.calendar.events.list(request);

  if (!response.result.items || response.result.items.length == 0) {
    // Pop up a message that this account doesn't have any events.
  }
  return response.result.items;
}

async function getRoles() {
  let res
  res = await gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': '2024-06-13T00:00:00.000Z',
    'timeMax': '2024-06-14T00:00:00.000Z',
    'q': "habit3-roles-1",
    'showDeleted': false,
    'maxResults': 1,
  });
  // console.log("getRoles res1", res);
  if (res.result.items.length !== 0) {
    return res.result.items[0];
  } else {

  // If there is no event at that time with that name,
  // this is the first time this user logged in.
  // So let's establish an event there with an empty description. 
    res = await addEvent(new tu.Appt(
      "habit3-roles-1",
      { duration: 1, description: "[]" },
      new Date('2024-06-13T01:00:00.000Z').getTime()
    ));
    // console.log("getRoles res2", res);
    return res;
  }
}

async function getUser() {
  console.log("getAvatar()");
  let response = await gapi.client.people.people.get({
    'resourceName': 'people/me',
    'personFields': 'names,photos'
  });
  console.log("getAvatar result", response.result);

  return {
    avatar: response.result.photos[0].url,
    name: response.result.names[0].displayName
  };
}

export async function addEvent(appt) {
  const request = {
    'calendarId': 'primary',
    'resource': appt.gEventResource
  };
  // console.log("request", request);
  let res = await gapi.client.calendar.events.insert(request);
  console.log("addEvent", res);
  if (typeof res.result !== undefined) {
    return res.result
  }
}

// TODO: make this an actual update call, and not a patch call.
export async function updateEvent(appt) {
  console.log("updateEvent");
  const request = {
    'calendarId': 'primary',
    'eventId': appt.id,
    'sendUpdates': 'none',
    'resource': appt.gEventResource // "body"?
  };
  let res = await gapi.client.calendar.events.patch(request);
  console.log("patchEvent", res);
  if (typeof res.result !== undefined) {
    return res.result;
  }
}

export async function patchEvent(eventId, patch) {
  console.log("patchEvent");
  const request = {
    'calendarId': 'primary',
    'eventId': eventId,
    'sendUpdates': 'none',
    'resource': patch
  };
  let res = await gapi.client.calendar.events.patch(request);
  console.log("patchEvent", res);
  if (typeof res.result !== undefined) {
    return res.result;
  }
}

export function isClientReady() { return isReady; }

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {

  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [CALENDAR_DISCOVERY_DOC, PEOPLE_DISCOVERY_DOC],
  });
  isReady = true;
}

function storeToken() {
  const token = JSON.stringify(gapi.client.getToken());
  sessionStorage.setItem("gapi.client.token", token);
}

function retreiveToken() {
  const sessionToken = JSON.parse(sessionStorage.getItem("gapi.client.token"));
  if (sessionToken !== null) {
    gapi.client.setToken(sessionToken);
  }
}
