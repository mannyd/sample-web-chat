# Custom Web Chat Widget Development
This project is set up for developing a custom Twilio web chat widget. It offers a local server that live-updates while you make changes, and when it's time to deploy it will bundle the code present in `src` into a single file.

### Trigger Build
* 2022-12-20-2

## Standard CICD Best Practice
Merge code into Bitbucket.org and allow the webhook to fire a Jenkins pipeline to complete deployments to dev and qa.

## Manual Setup
Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards, install the dependencies by running `npm install`:

```bash
npm install
```

## Development
There is an `.env.example` file that contains the variables required for this widget to work (Account & Flex Flow Sids). Make a copy of it called `.env` in the same location and fill in your values prior to development.

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. When you make changes to your code, the browser window will be automatically refreshed. This uses `src/index.html` (a 'fake' template page) to inject and load the widget for development.

## QA Testing
Until a better option is put in place to facilitate QA testers to actually see the webchat widget, this project has been configured to build an html file you can provide them. This has all the javscript included inline, so they can just open it in Chrome and interact with the widget (no special tooling required).

If you'd like to provide an html file using widget changes you have locally (skipping PR into dev, merge into master), then you'll need to configure the values mentioned in the `.env.example` file. Once you've done that, run the following command:

```bash
npm run build:qa
```

When this completes, you can provide a QA tester with `qa/index.hml` (ignore any other files present in this directory).

If you'd like to provide an html file using a full QA pipeline build copy of the widget, just uncomment the script in the head and provide them with a copy of `src/qa-index.html`.

These options result in a page that provides buttons to manually call functions that would normally be triggered by the web page the widget is loaded on, to facilitate testing.

## Deploy
To enable building within a pipeline, config values that were set in the `.env` file for local development need to be passed in as CLI arguments for a production build.

Run the following command to generate a production bundle (outputs file to `./dist`):

```bash
npm run build -- --env.TWILIO_ACCOUNT_SID ACXXX --env.TWILIO_FLEX_FLOW_SID FOXXX --env.AWS_ENDPOINT https://XXX.execute-api.us-west-2.amazonaws.com/dev
```

The bundled file contains a hash in the filename for versioning. Any page you deploy to needs to include the Twilio CDN script in the `<head>` element, and that the bundled file is placed at the bottom of the `<body>` element. This is documented as "Option 2" [here](https://www.twilio.com/docs/flex/installing-and-using-flex-webchat), although as of this writing we're using a newer version of the Twilio script (v2.9.1, see in `src/index.html`).
