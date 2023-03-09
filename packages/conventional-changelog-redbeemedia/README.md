# conventional-changelog-redbeemedia

This is a custom conventional-changelog preset used to generate release notes for RedBeeMedia projects.
It is based on [conventional-changelog-angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) and simply
modifies the following:

- Remove any links to github issues or commits.
- Remove any commit row that has the scope `internal` in it.
- Customized handlebar templates.

## Usage

1. Make sure you've configured your project to use Github packages for the `@ericssonbroadcastservices` scope

2. `npm install @ericssonbroadcastservices/conventional-changelog-redbeemedia`

3. Use the preset `redbeemedia` in your `conventional-changelog` setup .eg `conventional-changelog -p redbeemedia -i RELEASE_NOTES.md -s`