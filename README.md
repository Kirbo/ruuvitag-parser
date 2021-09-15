# RuuviTag Parser

![latest version](https://img.shields.io/npm/v/ruuvitag-parser?label=version)
![last commit](https://img.shields.io/github/last-commit/kirbo/ruuvitag-parser.svg)
![pipeline status](https://img.shields.io/gitlab/pipeline/kirbo/ruuvitag-parser/master)
![coverage report](https://img.shields.io/gitlab/coverage/kirbo/ruuvitag-parser/master)
![downloads monthly](https://img.shields.io/npm/dm/ruuvitag-parser)
![downloads total](https://img.shields.io/npm/dt/ruuvitag-parser)

This repository is heavily influenced/inspired by [pakastin/node-ruuvitag](https://github.com/pakastin/node-ruuvitag),
which I also took as a base and did some heavy refactoring, as well as converting the old JavaScript files
into TypeScript.

**!! This repository is still a work in progress !!**

This module only handles the parsing. It wont scan the sensors or any other shenanigans.


## Usage examples

### Parse Dataformat v3 and v5
Just to parse the data, use like this:
```typescript
import { parseData } from 'ruuvitag-parser'

const jsonData = parseData(dataFromRuuvitag)
```

### Parse Dataformat v2 and v4
Just to parse the data, use like this:
```typescript
import { parseUrl } from 'ruuvitag-parser'

const jsonData = parseUrl(dataFromRuuvitag)
```

### Parse Eddystone URL
```typescript
import { parseEddystone } from 'ruuvitag-parser'

const url = parseEddystone(eddystoneUrlBuffer)
```


Few examples can be found from [integration tests](https://gitlab.com/kirbo/ruuvitag-parser/-/blob/master/tests/ruuvitag-parser.integration.test.ts):
- [Import `parseData`](https://gitlab.com/kirbo/ruuvitag-parser/-/blob/master/tests/ruuvitag-parser.integration.test.ts#L1)
- [Parse v3 data](https://gitlab.com/kirbo/ruuvitag-parser/-/blob/master/tests/ruuvitag-parser.integration.test.ts#L69)
- [Parse v5 data](https://gitlab.com/kirbo/ruuvitag-parser/-/blob/master/tests/ruuvitag-parser.integration.test.ts#L94)
- [Parse MQTT message](https://gitlab.com/kirbo/ruuvitag-parser/-/blob/master/tests/ruuvitag-parser.integration.test.ts#L119)
- [Parse Eddystone URL](https://gitlab.com/kirbo/ruuvitag-parser/-/blob/master/tests/ruuvitag-parser.integration.test.ts#L147)

## Contribute

This repository is being developed in [GitLab](https://gitlab.com/kirbo/ruuvitag-parser).
CI/CD Pipeline can be [found here](https://gitlab.com/kirbo/ruuvitag-parser/-/pipelines).

CI/CD Pipeline uses [go-semantic-release](https://github.com/go-semantic-release/semantic-release) for automated
releases. Because of this, developers should follow [these instructions](https://www.conventionalcommits.org/en/v1.0.0/#examples)
for commit message formatting.

The commits are being analyzed with [this extension](https://github.com/go-semantic-release/commit-analyzer-cz#how-the-commit-messages-are-analyzed)
and it requires developers to format commit messages in certain way.

Read more about:
- [Semantic Versioning (SemVer)](https://semver.org/#semantic-versioning-200)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)

### Cheat Sheets
- [Kapeli.com](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)
- [cheatography.com](https://cheatography.com/albelop/cheat-sheets/conventional-commits/)
- [megamorf.gitlab.io](https://megamorf.gitlab.io/cheat-sheets/conventional-commits/)

The [GitHub repository](https://github.com/kirbo/ruuvitag-parser) is only a mirror from GitLab.
Please make Merge Requests in [GitLab](https://gitlab.com/kirbo/ruuvitag-parser/-/merge_requests).


## Releases / Changes

Releases and "changelogs" can be [found here](https://gitlab.com/kirbo/ruuvitag-parser/-/tags).
Each releases description contains the changes that the version includes, e.g.: [v0.2.14](https://gitlab.com/kirbo/ruuvitag-parser/-/tags/v0.2.14).


## Links

- [GitLab repository](https://gitlab.com/kirbo/ruuvitag-parser) - this is where the development happens.
- [GitHub repository](https://github.com/kirbo/ruuvitag-parser) - this is only mirroring the GitLab repository.
- [npm package](https://www.npmjs.com/package/ruuvitag-parser) - published npm package.


## License

MIT License

Copyright (c) 2021 Kimmo Saari

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
