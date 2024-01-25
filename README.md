# JavaScript SDKs
This repository contains a collection of packages consumed by the white label apps, and all players running javascript. The idea is to enable as much code sharing as possible between the various apps and players.

### Packages
- `rbm-ott-sdk`. An auto generated integration to the ExposureApi. Includes data type definitions and methods for fetching data.
- `app-sdk`. A package managing data fetching and transformation for the white label apps, including an integration with the white label cms, and various utilities for generating carousels and components.
- `app-sdk-react`. A react wrapper based on react-query around `app-sdk` and `rbm-ott-sdk`. Contains various hooks for for accessing data withing the react lifecycle.
- `conventional-changelog-redbeemedia`. A commandline tool for generating changelogs based on git history.
- `etcd-client` A simple etcd-client. Used by the imagedeliveryservice
- `nodejs-logger` Simple logger for nodejs services built around the winston-logger
- `exposure-sdk` DEPRECATED. Replaced by `rbm-ott-sdk`. Data models and data fetching from the exposure api.
- `whitelabel-sdk` DEPRECATED. Replaced by `app-sdk`. A package managing data type definitions and data fetching from the whitelabelinternalapi
- `whitelabel-react` DEPRECATED. replaced by app-sdk-react. A react wrapper based on react-query around `whitelabel-sdk` and `exposure-sdk`. Contains various hooks for for accessing data withing the react lifecycle



## Development

Make sure you read [Working with git](https://github.com/EricssonBroadcastServices/team-players/blob/master/git.md) before getting started.

1. `npm install`, this will install all dependencies and link together all packages in this repo
2. `npm run build` to build once and `npm run watch` to rebuild on changes
3. `npm install <path-to-this-repo>/packages/<package-to-work-with>` run this from any project using these packages.
4. `npm run demo` to run the demo appliction in the app-sdk-react package

## Release packages

To release and publish the NPM package to GitHub run the following in master branch:

```sh
npm run lerna:version 
```

This will create a specific commit message that will trigger a GitHub Actions workflow.
The script will automatically detect updated packages and resolve any dependencies, it will also prompt
you to select a version bump type, please follow the semver standard.

## Used by

- [WhiteLabel Webapp](https://github.com/EricssonBroadcastServices/white-label-web2)
- [WhiteLabel SmartTV app](https://github.com/EricssonBroadcastServices/white-label-tv)
- [WhiteLabel Mobile app](https://github.com/EricssonBroadcastServices/white-label-native-mobile)
- [WhiteLabel API](https://github.com/EricssonBroadcastServices/WhiteLabelInternalApi)
- [WhiteLabel Native TV](https://github.com/EricssonBroadcastServices/white-label-native-tv)
- [javascript-player](https://github.com/EricssonBroadcastServices/javascript-player)
- [cast-receiver](https://github.com/EricssonBroadcastServices/cast-receiver)
