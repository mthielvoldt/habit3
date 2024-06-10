let tokenClient;
let isLoaded = { gapi: false, gis: false };

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  isLoaded.gapi = true;
  reportGoogleStatus();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  isLoaded.gis = true;
  reportGoogleStatus();
}

function reportGoogleStatus() {
  if (isLoaded.gapi && isLoaded.gis) {
    console.log(isLoaded);
    // document.getElementById('google-connect-btn').removeAttribute("disabled");
  }
}
