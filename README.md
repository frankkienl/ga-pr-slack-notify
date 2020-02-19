# Slack notifier

This action sends a message to slack with info about the pull_request.
Requires little work to implement.

## Inputs

### `webhook`

**Required** The slack webhook. Default: `""`.

### `success`

If the build was successful. Default: `true`

## Example usage
```
uses: frankkienl/ga-pr-slack-notify@master
with:
  webhook: ${{ secrects.slack_webhook }}
```