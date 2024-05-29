# Installs
## Git
`sudo apt install git`

## Docker CE or Docker Desktop
I recommend Docker Desktop, even on Linux.  It is easy to get quicksanded with docker solving setup issues.
Docker Desktop forces linux users to be on 22.04, and that's what I use.  I found it's just easier to let Docker dictate my world.

### init pass (the password manager)
Allows signing into docker hub from docker desktop
```
gpg --generate-key
pass init <generated-key>
```
## Node + Playwright
You can do everything inside Docker containers *except* seeing Playwright's browsers and other GUIs features.
Those, however, are *super helpful* when debugging, so I recommend [installing Node.js](https://nodejs.org/en/download/package-manager) locally and running playwright directly on your host.

Once you have node, run the following to install playwright, playwright's 3 browsers, and the OS dependencies.
```
cd end-to-end
npm install
npx playwright install
sudo npx playwright install-deps
```
