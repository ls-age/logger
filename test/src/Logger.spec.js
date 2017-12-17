import Emitter from 'events';
import { Transform } from 'stream';
import expect from 'unexpected';
import { spy } from 'sinon';
import Logger from '../../src/Logger';

class NoopTransformStream extends Transform {
  _transform(chunk, enc, callback) {
    callback(null, chunk);
  }
}

/** @test {Logger} */
describe('Logger', function() {
  /** @test {Logger#constructor} */
  describe('#constructor', function() {
    it('should return an emitter', function() {
      expect(new Logger(), 'to be an', Emitter);
    });

    it('should handle types option', function() {
      const types = ['first', 'second'];
      expect((new Logger({ types }))._types, 'to be', types);
    });

    it('should register log methods for all types', function() {
      const logger = new Logger();

      Logger.defaultTypes.forEach(type => {
        expect(logger[type], 'to be defined');
        expect(logger[type], 'to be a', 'function');
      });
    });

    it('should register levels for all types', function() {
      const logger = new Logger();

      Logger.defaultTypes.forEach(type => {
        expect(logger[`LEVEL_${type.toUpperCase()}`], 'to be defined');
        expect(logger[`LEVEL_${type.toUpperCase()}`], 'to be a', 'number');
      });
    });

    it('should store scope array', function() {
      const scope = ['scope', 'another'];
      const logger = new Logger({ scope });

      expect(logger.scope, 'to equal', scope);
    });

    it('should store single scope', function() {
      const scope = 'scope';
      const logger = new Logger({ scope });

      expect(logger.scope, 'to equal', [scope]);
    });

    it('should set no scope if omitted', function() {
      const logger = new Logger({ scope: false });

      expect(logger.scope, 'to equal', []);
    });

    it('should store timestamp option', function() {
      const logger = new Logger({ timestamp: false });

      expect(logger._printTimestamp, 'to equal', false);
    });
  });

  /** @test {Logger#createChild} */
  describe('#createChild', function() {
    it('should create a new logger instance', function() {
      const parent = new Logger();
      const child = parent.createChild('child');

      expect(child, 'to be a', Logger);
    });

    it('should forward options', function() {
      const types = ['a', 'b'];
      const timestamp = false;
      const parent = new Logger({ types, timestamp });
      const child = parent.createChild('child');

      expect(child._types, 'to equal', parent._types);
      expect(child._printTimestamp, 'to equal', parent._printTimestamp);
    });

    it('should forward events to original instance', function() {
      const parent = new Logger();
      const child = parent.createChild('child');

      const messageReceived = new Promise(resolve => {
        parent.on('info', resolve);
      });

      child.info('Test message');

      return expect(messageReceived, 'when fulfilled', 'to contain', 'Test message');
    });

    it('should prefix messages with name', function() {
      const parent = new Logger();
      const child = parent.createChild('child');

      const messageReceived = new Promise(resolve => {
        parent.on('info', resolve);
      });

      child.info('Test message');

      return expect(messageReceived, 'when fulfilled', 'to contain', 'child');
    });
  });

  /** @test {Logger#[type]} */
  describe('#[type]', function() {
    it('should emit `type` events', function() {
      const logger = new Logger();

      return Promise.all(
        Logger.defaultTypes.map(type => new Promise((resolve, reject) => {
          logger.on(type, msg => {
            try {
              resolve(expect(msg, 'to contain', type));
            } catch (e) {
              reject(e);
            }
          });
          logger[type](`${type} message`);
        }))
      );
    });

    it('should print timestamps by default', function() {
      const logger = new Logger({});
      const messageReceived = new Promise(resolve => {
        logger.on('info', resolve);
      });

      logger.info('Test message');

      return expect(messageReceived, 'when fulfilled', 'to match', /[0-9]{2}:[0-9]{2}:[0-9]{2}/);
    });

    it('should print scope', function() {
      const scope = 'scope';
      const logger = new Logger({ scope });

      const messageReceived = new Promise(resolve => {
        logger.on('info', resolve);
      });

      logger.info('Test message');

      return expect(messageReceived, 'when fulfilled', 'to contain', 'scope');
    });

    it('should not print timestamps if created with `timestamp: false`', function() {
      const logger = new Logger({ timestamp: false });
      const messageReceived = new Promise(resolve => {
        logger.on('info', resolve);
      });

      logger.info('Test message');

      return expect(messageReceived, 'when fulfilled', 'to match', /Test message\r?\n/);
    });
  });

  /** @test {Logger#prefix} */
  describe('#prefix', function() {
    it('should return a timestamp', function() {
      expect((new Logger()).prefix[0], 'to match', /\[.*[0-9]{2}:[0-9]{2}:[0-9]{2}.*\]/);
    });
  });

  /** @test {Logger#_format} */
  describe('#_format', function() {
    it('should join string arguments', function() {
      expect((new Logger())._format(['first', 'second']), 'to contain', 'first second');
    });

    it('should add a newline', function() {
      expect((new Logger())._format(['first', 'second']), 'to end with', '\n');
    });
  });

  /** @test {Logger#pipe} */
  describe('#pipe', function() {
    it('should write logs to stream', function(done) {
      const stream = new NoopTransformStream();

      const logger = new Logger()
        .pipe(stream);

      stream.on('data', msg => {
        expect(msg.toString(), 'to contain', 'Test');
        done();
      });

      logger.info('Test');
    });

    it('should remove listeners on close', function() {
      const stream = new NoopTransformStream();
      const logger = new Logger()
        .pipe(stream);

      stream.end();

      Logger.defaultTypes.forEach(type => {
        expect(logger.listenerCount(type), 'to be', 0);
      });
    });

    it('should handle logLevel option', function() {
      const onData = spy();
      const stream = new NoopTransformStream()
        .on('data', onData);
      const logger = new Logger()
        .pipe(stream, { logLevel: 2 });

      logger.info('Test info');
      logger.warn('Test warning');

      expect(onData.calledOnce, 'to be', true);
      expect(onData.lastCall.args[0].toString(), 'to contain', 'Test warning');
    });
  });
});
