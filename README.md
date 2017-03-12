# @lsage/logger

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
