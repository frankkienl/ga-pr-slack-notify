const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');

run();

export async function run() {
  try {
    const webhook = core.getInput('webhook');

    const payload = github.context.payload;

    console.log("payload.pull_request");
    console.log(payload.pull_request);

    if (github.context.eventName === "pull_request") {
      const success = core.getInput('success');

      let iconUrl = "https://raw.githubusercontent.com/frankkienl/ga-pr-slack-notify/master/";

      let text = `*PR:* <${payload.pull_request._links.html.href}|#${payload.pull_request.number} - ${payload.pull_request.title}>\n`;
      text += `*By:* ${github.context.actor}\n`;

      if (success === 'true' || success === true) {
        text += `*Build success!*\n`;
        iconUrl += "icon_build_success.png";
      } else {
        text += `*Build failed!*\n`;
        iconUrl += "icon_build_failed.png";
      }

      //POST Request
      const data = JSON.stringify({
        text: text,
        icon_url: iconUrl
      });

      //console.log(text);
      console.log(data);
      console.log(webhook);
      postRequest(webhook, data)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
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