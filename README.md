m3u8-cli
========

M3U8 IPTV playlist management system

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/m3u8-cli.svg)](https://npmjs.org/package/m3u8-cli)
[![Downloads/week](https://img.shields.io/npm/dw/m3u8-cli.svg)](https://npmjs.org/package/m3u8-cli)
[![License](https://img.shields.io/npm/l/m3u8-cli.svg)](https://github.com/alessandrojean/m3u8-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g m3u8-cli
$ m3u8-cli COMMAND
running command...
$ m3u8-cli (-v|--version|version)
m3u8-cli/1.0.0 linux-x64 node-v11.13.0
$ m3u8-cli --help [COMMAND]
USAGE
  $ m3u8-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`m3u8-cli create`](#m3u8-cli-create)
* [`m3u8-cli find`](#m3u8-cli-find)
* [`m3u8-cli hello`](#m3u8-cli-hello)
* [`m3u8-cli help [COMMAND]`](#m3u8-cli-help-command)

## `m3u8-cli create`

Creates a new channel in the database

```
USAGE
  $ m3u8-cli create
```

_See code: [src/commands/create.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/create.js)_

## `m3u8-cli find`

Describe the command here

```
USAGE
  $ m3u8-cli find

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/find.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/find.js)_

## `m3u8-cli hello`

Describe the command here

```
USAGE
  $ m3u8-cli hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/hello.js)_

## `m3u8-cli help [COMMAND]`

display help for m3u8-cli

```
USAGE
  $ m3u8-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
