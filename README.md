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
* [`m3u8-cli export`](#m3u8-cli-export)
* [`m3u8-cli find`](#m3u8-cli-find)
* [`m3u8-cli help [COMMAND]`](#m3u8-cli-help-command)
* [`m3u8-cli import FILE`](#m3u8-cli-import-file)
* [`m3u8-cli list`](#m3u8-cli-list)
* [`m3u8-cli list:standard TERM`](#m3u8-cli-liststandard-term)
* [`m3u8-cli remove`](#m3u8-cli-remove)
* [`m3u8-cli test`](#m3u8-cli-test)
* [`m3u8-cli update ID`](#m3u8-cli-update-id)

## `m3u8-cli create`

Creates a new channel in the database

```
USAGE
  $ m3u8-cli create
```

_See code: [src/commands/create.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/create.js)_

## `m3u8-cli export`

Export the database channels to a M3U8 file.

```
USAGE
  $ m3u8-cli export

OPTIONS
  -o, --output=output  non-default output file
```

_See code: [src/commands/export.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/export.js)_

## `m3u8-cli find`

Find a channel with the id or name specified

```
USAGE
  $ m3u8-cli find

OPTIONS
  -i, --id=id      id to search
  -n, --name=name  name to search
```

_See code: [src/commands/find.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/find.js)_

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

## `m3u8-cli import FILE`

Import an existing playlist

```
USAGE
  $ m3u8-cli import FILE

ARGUMENTS
  FILE  m3u8 playlist to import
```

_See code: [src/commands/import.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/import.js)_

## `m3u8-cli list`

Describe the command here

```
USAGE
  $ m3u8-cli list

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/list/index.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/list/index.js)_

## `m3u8-cli list:standard TERM`

Search in the standard SS IPTV channels

```
USAGE
  $ m3u8-cli list:standard TERM

ARGUMENTS
  TERM  term to filter
```

_See code: [src/commands/list/standard.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/list/standard.js)_

## `m3u8-cli remove`

Remove a channel from the database if exists

```
USAGE
  $ m3u8-cli remove

OPTIONS
  -i, --id=id      id to remove
  -n, --name=name  name to remove
```

_See code: [src/commands/remove.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/remove.js)_

## `m3u8-cli test`

Describe the command here

```
USAGE
  $ m3u8-cli test

OPTIONS
  -c, --channel    test specific
  -i, --id=id      id to remove
  -n, --name=name  name to remove

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/test.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/test.js)_

## `m3u8-cli update ID`

Update an existing channel in the database

```
USAGE
  $ m3u8-cli update ID

ARGUMENTS
  ID  id of the channel
```

_See code: [src/commands/update.js](https://github.com/alessandrojean/m3u8-cli/blob/v1.0.0/src/commands/update.js)_
<!-- commandsstop -->
