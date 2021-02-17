# Slack notifier

This action sends a message to slack with info about the pull_request.

## Inputs

### `webhook`

**Required**  - The slack webhook. Default: `""`.

### `success`

If the build was successful. Default: `true`

## Example usage
```
uses: frankkienl/ga-pr-slack-notify@master
with:
  webhook: ${{ secrects.slack_webhook }}
```

## Bigger example
```
- name: Post to Slack when failure
      if: failure()
      uses: frankkienl/ga-pr-slack-notify@master
      with:
        success: false
        webhook: ${{ secrets.slack_webhook }}

    - name: Post to Slack when success
      if: success()
      uses: frankkienl/ga-pr-slack-notify@master
      with:
        success: true
        webhook: ${{ secrets.slack_webhook }}
```
