import * as tu from './utils/timeUtils'

// TODO BEFORE HOSTING: Move this to server.
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';

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
  let events;
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
  return events;
}

/**
 *  Sign out the user upon button click.
 */
export function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    // document.getElementById('content').innerText = '';
    // document.getElementById('authorize_button').innerText = 'Authorize';
    // document.getElementById('signout_button').style.visibility = 'hidden';
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

export async function addEvent(appt) {
  const event = {
    'summary': appt.summary,
    'start': {
      'dateTime': appt.startDateISO,
      'timeZone': 'America/New_York'
    },
    'end': {
      'dateTime': appt.endDateISO,
      'timeZone': 'America/New_York'
    },
  };

  const request = {
    'calendarId': 'primary',
    'resource': event
  }
  console.log("request", request);
  let res = await gapi.client.calendar.events.insert(request)

  console.log("response", res);
}

export function isClientReady() { return isReady; }

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {

  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
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
