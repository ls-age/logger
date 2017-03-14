'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RenderedItem = require('./RenderedItem');

var _RenderedItem2 = _interopRequireDefault(_RenderedItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Progress extends _RenderedItem2.default {
  constructor(name, options = {}) {
    super(options);

    this.name = name;
    this.i = 0;
    this.created = new Date().getTime();
  }

  get elapsed() {
    return ((new Date().getTime() - this.created) / 1000).toFixed(0);
  }

  render() {
    return `${this.name} [${this.elapsed}s]`;
  }
}
exports.default = Progress;