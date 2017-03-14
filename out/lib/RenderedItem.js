'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RenderedItem extends _events2.default {

  constructor(options = {}) {
    super();

    this._clear = options.clear === undefined ? true : options.clear;

    if (options.render) {
      this.render = options.render;
    }
  }

  render() {
    throw new Error('RenderedItem#render must be implemented by all subclasses');
  }

  end() {
    this.emit('end');
  }

}
exports.default = RenderedItem;