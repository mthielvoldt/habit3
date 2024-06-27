import * as tu from './utils/timeUtils'

// TODO BEFORE HOSTING: Move this to server.
let CLIENT_ID, API_KEY;
if (import.meta.env.DEV) {
  // Test Keys, may be used with localhost.
  CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
} else {
  // Production keys, restricted to production origin.
  CLIENT_ID = "889236019594-9gj2sn0rrvm5ob6t06do0gpj1dn70sgn.apps.googleusercontent.com";
  API_KEY = "AIzaSyAVy3xWYcWovXytd74F6lvL7Q8y4U-CMS4";
}

// Discovery doc URL for APIs used by the quickstart
const CALENDAR_DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const PEOPLE_DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile';
// let loadState = 'GOOGLE_SCRIPTS_LOADING';
let isReady = false;
let tokenClient;

function initGoogleClients() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });

  gapi.load('client', initializeGapiClient);
}
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [CALENDAR_DISCOVERY_DOC, PEOPLE_DISCOVERY_DOC],
  });
  isReady = true;
}

/* This function is called periodically until it returns true to signify API access is ready.
*/
let runOnce = false;
export function isClientReady() {
  if (!runOnce && (typeof gapi !== 'undefined' && typeof google !== 'undefined')) {
    runOnce = true;
    initGoogleClients();
  }
  return isReady;
}

function getNewToken() {
  console.log("Requesting new access token.");
  const tokenPromise = new Promise((resolve, reject) => {
    tokenClient.callback = (resp) => {
      if (resp.error !== undefined) {
        reject(resp.error);
      } else {
        console.log("Token refreshed");
        storeToken();
        resolve(resp);
      }
    };
    tokenClient.requestAccessToken({ prompt: '' });
  });
  return tokenPromise;
}

/**
 *  Sign in the user upon button click.
 */
export async function fetchAll() {
  let events = [], user = { name: "", avatar: "" }, rolesEvent = [];
  console.log("fetchEvents");
  retreiveToken();

  events = await listWeeksEvents(0);
  user = await getUser();
  rolesEvent = await getRoles();
  return { events, user, rolesEvent };
}

async function withToken(requestFn) {
  let result;
  try {
    result = await requestFn();
  } catch {
    try {
      await getNewToken();
      result = await requestFn();
    } catch(err) {
      // TODO: this doesn't work. 
      console.error("Could not get new access token", err);
      alert("Habit3 can't reach your google account right now.");
    }
  }
  return result;
}

export async function fetchEvents(weeksForward) {
  return await listWeeksEvents(weeksForward);
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
async function listWeeksEvents(weeksForward) {
  console.log("listWeeksEvents");
  let response;
  const week = tu.getThisWeek(weeksForward);

  const request = {
    'calendarId': 'primary',
    'timeMin': (new Date(week.start)).toISOString(),
    'timeMax': (new Date(week.end)).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 50,
    'orderBy': 'startTime',
  };
  response = await withToken(() => gapi.client.calendar.events.list(request));

  if (!response.result.items || response.result.items.length == 0) {
    // Pop up a message that this account doesn't have any events.
  }
  return response.result.items;
}

async function getRoles() {
  const request = {
    'calendarId': 'primary',
    'timeMin': '2024-06-13T00:00:00.000Z',
    'timeMax': '2024-06-14T00:00:00.000Z',
    'q': "habit3-roles-1",
    'showDeleted': false,
    'maxResults': 1,
  };
  let res = await withToken(() => gapi.client.calendar.events.list(request));
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
  const request = {
    'resourceName': 'people/me',
    'personFields': 'names,photos'
  };
  let response = await withToken(() => gapi.client.people.people.get(request));
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
  let res = await withToken(() => gapi.client.calendar.events.insert(request));
  console.log("addEvent", res);
  if (typeof res.result !== undefined) {
    return res.result
  }
}

// TODO: make this an actual update call, and not a patch call.
export async function updateEvent(appt) {
  const request = {
    'calendarId': 'primary',
    'eventId': appt.id,
    'sendUpdates': 'none',
    'resource': appt.gEventResource // "body"?
  };
  let res = await withToken(() => gapi.client.calendar.events.patch(request));
  console.log("update(patch)Event", res);
  if (typeof res.result !== undefined) {
    return res.result;
  }
}

export async function patchEvent(eventId, patch) {
  const request = {
    'calendarId': 'primary',
    'eventId': eventId,
    'sendUpdates': 'none',
    'resource': patch
  };
  let res = await withToken(() => gapi.client.calendar.events.patch(request));
  console.log("patchEvent", res);
  if (typeof res.result !== undefined) {
    return res.result;
  }
}

export async function deleteEvent(eventId) {
  const request = {
    'calendarId': 'primary',
    'eventId': eventId,
    'sendUpdates': 'none'
  };
  let res = await withToken(() => gapi.client.calendar.events.delete(request));
  console.log("deleteEvent", res);
  return res.status === 204;
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */


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
