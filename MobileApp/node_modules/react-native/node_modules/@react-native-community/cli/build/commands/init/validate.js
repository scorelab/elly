"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateProjectName = validateProjectName;

var _InvalidNameError = _interopRequireDefault(require("./errors/InvalidNameError"));

var _ReservedNameError = _interopRequireDefault(require("./errors/ReservedNameError"));

var _HelloWorldError = _interopRequireDefault(require("./errors/HelloWorldError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NAME_REGEX = /^[$A-Z_][0-9A-Z_$]*$/i;

function validateProjectName(name) {
  if (!String(name).match(NAME_REGEX)) {
    throw new _InvalidNameError.default(name);
  }

  if (name === 'React' || name === 'react') {
    throw new _ReservedNameError.default();
  }

  if (name.match(/helloworld/gi)) {
    throw new _HelloWorldError.default();
  }
}