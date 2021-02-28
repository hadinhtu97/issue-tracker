# Issue Tracker

## Description
Backend APIs manage issues.

## Use
```
git clone https://github.com/hadinhtu97/metric-imperial-converter
cd metric-imperial-converter
npm install
touch .env
[This app use mongodb as database, you need to add a MONGO_URI variable into .env]
npm run start
```

## APIs
* GET
  * `[]/api/issues/[project]` : get an array of all issues for that specific projectname. You can filter the request by also passing along any field and value as a URL query (ie. `/api/issues/[project]?open=false`). You can pass one or more field/value pairs at once.
* POST
  * `[]/api/issues/[project]` : with form data containing the required fields `issue_title`, `issue_text`, `created_by`, and optionally `assigned_to` and `status_text`
* PUT
  * `[]/api/issues/[project]` : with an `_id` and one or more fields to update
* DELETE
  * `[]/api/issues/[project]` : with an `_id` to delete an issue

## Testing
Functional test in `test` directory

Run the project and run `npm run test` to run tests.

### Demo
[Link Demo](https://issue-tracker.hadinhtu97.repl.co/)
