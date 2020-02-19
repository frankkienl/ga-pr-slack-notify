# Slack notifier

This action sends a message to slack with info about the pull_request.

## Inputs

### `webhook`

**Required** The slack webhook. Default: `""`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: actions/hello-world-javascript-action@v1
with:
  who-to-greet: 'Mona the Octocat'