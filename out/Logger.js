'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _os = require('os');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _leftPad = require('left-pad');

var _leftPad2 = _interopRequireDefault(_leftPad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The logger class. **Please note that, when importing default from this module, you will always
 * get a shared Logger instance.**
 * @see {@link logger}
 */
class Logger extends _events2.default {

  /**
   * The default log types.
   * @type {string[]} Default log types.
   */
  static get defaultTypes() {
    return ['error', 'warn', 'info', 'debug'];
  }

  /**
   * Creates a new Logger with the given options.
   * @param {Object} [options] The options to use.
   * @param {string[]} [options.types=Logger.defaultTypes] The log types the new
   * instance should have.
   */
  constructor(options = {}) {
    super();

    /**
     * The log types available.
     * @type {string[]}
     */
    this._types = options.types || Logger.defaultTypes;

    this._types.forEach((type, i) => {
      /**
       * Prints the given messages for the given message types.
       * @param {...*} messages The messages to print.
       * @return {Logger} The logger instance.
       * @emits {string} Emits an event named after `type` with the message printed.
       *
       * @example <caption>Subscribing to specific log types</caption>
       * Logger.on('warn', msg => console.log('Warning:', msg))
       *   .warn('Test warning');
       * // Will print "Waring: Test warning" to the console.
       */
      this[type] = (...messages) => this.emit(type, this._format(messages));

      const typeName = type.toUpperCase();

      /**
       * The log levels available.
       * @type {number}
       */
      this['LEVEL_' + typeName] = i + 1; // eslint-disable-line prefer-template
    });

    /**
     * The colors used.
     * @type {chalk}
     */
    this.colors = _chalk2.default;
  }

  /**
   * The message prefix. Override this getter in your own logger class to customize output.
   * @type {string}
   */
  get prefix() {
    const now = new Date();
    return `[${this.colors.gray([now.getHours(), now.getMinutes(), now.getSeconds()].map(n => (0, _leftPad2.default)(n, 2, '0')).join(':'))}]`;
  }

  /**
   * Creates a log message from some messages, prefixed and postfixed with a newline.
   * @param {*[]} messages The messages to format.
   * @return {string} The resulting message.
   */
  _format(messages) {
    return `${this.prefix} ${messages.map(msg => msg).join(' ')}${_os.EOL}`;
  }

  /**
   * Returns the log types that should be handled for the specific log level.
   * @param {number} logLevel The log level to use.
   * @return {string[]} The log types to handle.
   */
  typesForLevel(logLevel) {
    return this._types.filter((_, i) => i <= logLevel - 1);
  }

  /**
   * Writes all logs to a writable stream.
   * @param {stream~Writable} stream The stream to write to
   * @param {Object} [options] The options to use.
   * @param {number} [options.logLevel=3] The log level from which to write.
   * @return {Logger} The logger instance.
   *
   * @example <caption>Pipe logger output to stdout</caption>
   * Logger.pipe(process.stdout);
   *
   * @example <caption>Pipe with specific log level</caption>
   * Logger.pipe(process.stdout, { logLevel: Logger.LEVEL_ERROR });
   * // In this case, only error messages will be printed to stdout
   */
  pipe(stream, options = {}) {
    const logLevel = options.logLevel === undefined ? 3 : options.logLevel;
    const listener = m => stream.write(m);

    this.typesForLevel(logLevel).forEach(level => this.on(level, listener));

    stream.once('finish', () => this.typesForLevel(logLevel).forEach(level => this.removeListener(level, listener)));

    return this;
  }

}
exports.default = Logger;