import expect from 'unexpected';
import logger, { Logger } from '../../src/index';
import LoggerClass from '../../src/Logger';

/** @test {logger} */
describe('logger', function() {
  it('should return a Logger instance', function() {
    expect(logger, 'to be a', LoggerClass);
  });

  it('should export Logger class', function() {
    expect(Logger, 'to be', LoggerClass);
  });
});
