# RuuviTag Parser

![pipeline status](https://img.shields.io/gitlab/pipeline/kirbo/ruuvitag-parser/master)
![coverage report](https://img.shields.io/gitlab/coverage/kirbo/ruuvitag-parser/master)
![latest version](https://img.shields.io/npm/v/ruuvitag-parser?label=version)
![last commit](https://img.shields.io/github/last-commit/kirbo/ruuvitag-parser.svg)
![downloads monthly](https://img.shields.io/npm/dm/ruuvitag-parser)
![downloads total](https://img.shields.io/npm/dt/ruuvitag-parser)

This repository is heavily influenced/inspired by [pakastin/node-ruuvitag](https://github.com/pakastin/node-ruuvitag),
which I also took as a base and did some heavy refactoring, as well as converting the old JavaScript files
into TypeScript.

**!! This repository is still a work in progress !!**

This module only handles the parsing. It wont scan the sensors or any other shenanigans.

## Contribute

This repository is being developed in [GitLab](https://gitlab.com/kirbo/ruuvitag-parser).
CI/CD Pipeline can be [found here](https://gitlab.com/kirbo/ruuvitag-parser/-/pipelines).

CI/CD Pipeline uses [go-semantic-release](https://github.com/go-semantic-release/semantic-release) for automated
releases. Because of this, developers should follow [these instructions](https://www.conventionalcommits.org/en/v1.0.0/#examples)
for commit message formatting.

The commits are being analyzed with [this extension](https://github.com/go-semantic-release/commit-analyzer-cz#how-the-commit-messages-are-analyzed)
and it requires developers to format commit messages in certain way.

Read more about:
- [Semantic Versioning - Specifications](https://semver.org/#semantic-versioning-200)
- [Conventional Commits - Specifications](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- [Conventional Commits - Cheatsheet](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)

The [GitHub repository](https://github.com/kirbo/ruuvitag-parser) is only a mirror from GitLab.
Please make Merge Requests in [GitLab](https://gitlab.com/kirbo/ruuvitag-parser/-/merge_requests).


## Releases / Changes

Releases and "changelogs" can be [found here](https://gitlab.com/kirbo/ruuvitag-parser/-/tags).
Each releases description contains the changes that the version includes, e.g.: [v0.1.6](https://gitlab.com/kirbo/ruuvitag-parser/-/tags/v0.1.6).
