# JavaScript SDKs

Make sure you read [Working with git](https://github.com/EricssonBroadcastServices/team-players/blob/master/git.md) before getting started.

## Development

1. `npm install`, this will install all dependencies and link together all packages in this repo
2. `npm run build` to build once and `npm run watch` to rebuild on changes
3. `npm install <path-to-this-repo>/packages/<package-to-work-with>` run this from any project using these packages.
4. `npm run demo` to run the demo appliction in the whitelabel-react package

## Release packages

To release and publish the NPM package to GitHub run the following in master branch:

```sh
npm run lerna:version 
```

This will create a specific commit message that will trigger a GitHub Actions workflow.
The script will automatically detect updated packages and resolve any dependencies, it will also prompt
you to select a version bump type, please follow the semver standard.

## Used by

- [WhiteLabel Webapp](https://github.com/EricssonBroadcastServices/WhiteLabelInternalApi)
- [WhiteLabel SmartTV app](https://github.com/EricssonBroadcastServices/white-label-tv)
- [WhiteLabel API](https://github.com/EricssonBroadcastServices/WhiteLabelInternalApi)
- [WhiteLabel Native TV](https://github.com/EricssonBroadcastServices/white-label-native-tv)
- [javascript-player](https://github.com/EricssonBroadcastServices/javascript-player)
