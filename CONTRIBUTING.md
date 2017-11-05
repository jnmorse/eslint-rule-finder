# Contributing Guide

If you wish to contribute to this project. I ask that you fist open an issue and describe the feature, fix,
or other issue you have. Please describe it in as much detail as possible, and if you know of a solution. Please
outline the solution as well.

## Pull Request

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

If you have already opened a issue, or find an issue you believe you can help with. Please feel free to open a pull request.
I only ask that your pull request be made from your fork on a different branch the master. Please also have the branch named
something like `fix/issue`, `feature/issue`. Also you commit message should follow a simular pattern. i.e.
`fix(issue): short message`.

if You fix or feature can not be described in one short line, please also include a commit message outline what work you have
done.

Please try to keep your pull request to a single issue and preferably one commit per request.

### Before Making Your Pull Request

Please run the lint setup using `npm run lint` and make sure there are no errors. Also run what test are currently defined by
running `npm run test`. If possible please include new tests or updates to current tests as needed. Please do not modify
the version number.
