# @ls-age/logger

> Logging made easy

[![CircleCI](https://circleci.com/gh/ls-age/logger.svg?style=shield)](https://circleci.com/gh/ls-age/logger)
[![Build status](https://ci.appveyor.com/api/projects/status/2bdttk1hv7pc1wby/branch/master?svg=true&pendingText=windows%20tests%20pending&passingText=windows%20tests%20passing&failingText=windows%20tests%20failing)](https://ci.appveyor.com/project/LukasHechenberger/logger/branch/master)
[![codecov](https://codecov.io/gh/ls-age/logger/branch/master/graph/badge.svg)](https://codecov.io/gh/ls-age/logger)
[![ESDoc](https://doc.esdoc.org/github.com/ls-age/logger/badge.svg)](https://doc.esdoc.org/github.com/ls-age/logger/)
[![Greenkeeper badge](https://badges.greenkeeper.io/ls-age/logger.svg)](https://greenkeeper.io/)

**This module is still under development and should not be used yet.**

## Installation

With [node](https://nodejs.org) (version 6 or later) installed run `npm install @lsage/logger`.

## Usage

```javascript
import Logger from '@ls-age/logger';

// Pipe all logs to stdout
Logger.pipe(process.stdout);

// This will print something like "[08:03:27] Hello World"
Logger.info('Hello World');
```
