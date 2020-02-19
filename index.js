const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');

// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }

try {
  const webhook = core.getInput('webhook');

  //TODO: Remove test logging
  const payload = github.context.payload;
  const payloadJSON = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payloadJSON}`);
  console.log("github.context.issue.number: " + github.context.issue.number);
  console.log("github");
  console.log(github);
  console.log("github.context");
  console.log(github.context);
  console.log("github.context.payload");
  console.log(github.context.payload);
  console.log("github.context.actor");
  console.log(github.context.actor);
  console.log("github.context.eventName");
  console.log(github.context.eventName);

  console.log("payload.pull_request");
  console.log(payload.pull_request);

  if (github.context.eventName === "pull_request"){
    //TODO: Icon
    const success = core.getInput('success');
    let text = `*PR:* <${payload.pull_request._links.html}|#${payload.pull_request.number}>\n`;
    text += `*Title:* ${payload.pull_request.title}\n`;
    text += `*By:* ${github.context.actor}\n`;
    if (success === 'true' || success === true){
      text += `*Build success!*\n`;
    } else {
      text += `*Build failed!*\n`;
    }

    //POST Request
    const data = JSON.stringify({
      text: text
    });

    console.log(text);
    postRequest(webhook, data)
  }
} catch (error) {
  core.setFailed(error.message)
}

function postRequest(webhook, data) {
  const options = {
    hostname: 'hooks.slack.com',
    port: 443,
    path: webhook.substring(23),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    req.on('error', err => {
        console.log(err);
        core.setFailed(err.message);
      }
    )
  });
  req.write(data);
  req.end();
}