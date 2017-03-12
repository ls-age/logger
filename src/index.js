import LoggerClass from './Logger';

/** @ignore */
class Logger extends LoggerClass {}

/**
 * The shared {@link Logger} instance.
 * @type {Logger}
 */
export default new Logger();
export { LoggerClass as Logger };
