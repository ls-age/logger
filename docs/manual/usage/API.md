# API

> **Note:** This module is written in [ES2015 JavaScript](http://babeljs.io/learn-es2015/) so make sure you have a basic understanding for ES2015 before you continue reading.

## Using the logger

### Print logs to stdout

You can pipe any writeable stream to a Logger by calling [Logger#pipe](../../class/src/Logger.js~Logger.html#instance-method-pipe). As *stout* is such a writable stream it can be piped directly:

```javascript
import Logger from '@ls-age';

Logger.pipe(process.stdout);
```

By default, this tells the logger to print all *error*, *warn* and *info* messages to stdout. You can also pass a *logLevel* option to print just specific messages:

```javascript
Logger.pipe({ logLevel: Logger.LEVEL_ERROR });
```

### Log types and levels

**By default, the *error*, *warn*, *info* and *debug* are used as types.**

A logger has different message types. Each type has it's own logging function and level. E.g. when a Logger instance has a *info* log type, it creates the logging function `Logger#info` and the level constant `Logger#LEVEL_INFO`.

In our example we can log messages by calling:

```javascript
import Logger from '@ls-age';

Logger.info('Debug message');
```

Using different log types makes it possible to adjust the logger's output. When a stream (e.g. stdout) is piped to the logger, only messages with the specified log level or higher are written. For the default log types this means:

| Value | Name         | `error` | `warn`  | `info`  | `debug` |
|------:|:-------------|:-------:|:------:|:--------:|:-------:|
|     0 | LEVEL_SILENT |    x    |    x    |    x    |    x    |
|     1 | LEVEL_ERROR  |    ✔    |    x    |    x    |    x    |
|     2 | LEVEL_WARN   |    ✔    |    ✔    |    x    |    x    |
|     3 | LEVEL_INFO   |    ✔    |    ✔    |    ✔    |    x    |
|     4 | LEVEL_DEBUG  |    ✔    |    ✔    |    ✔    |    ✔    |

## Create a custom instance

By default, a single shared instance of the [Logger class](../../class/src/Logger.js~Logger.html) is exported. You can create also create custom instance:

```javascript
import { Logger } from '@ls-age/logger';

const customLogger = new Logger();
```

