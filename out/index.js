'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = undefined;

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @ignore */
class Logger extends _Logger2.default {}

/**
 * The shared {@link Logger} instance.
 * @type {Logger}
 */
exports.default = new Logger();
exports.Logger = _Logger2.default;