# Slack notifier

This action sends a message to slack with info about the pull_request.

## Inputs

### `webhook`

**Required** The slack webhook. Default: `""`.

### `success`

If the build was successful. Default: `true`

## Outputs

There are no outputs

## Example usage

uses: frankkienl/ga-pr-slack-notify@master
with:
  webhook: ${{ secrects.slack_webhook }}