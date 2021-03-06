//
// Copyright (c) 2015, Shawn Jacobson
// Licensed under the Academic Free License version 3.0
//
// Ported from @see {@link https://bitbucket.org/brianfrank/haystack-java|Haystack Java Toolkit}
//
// History:
//   21 Mar 2015  Shawn Jacobson  Creation
//

var HVal = require('./HVal');

/**
 * HBool defines singletons for true/false tag values.
 * @see {@link http://project-haystack.org/doc/TagModel#tagKinds|Project Haystack}
 *
 * @constructor
 * @private
 * @extends {HVal}
 * @param {boolean} val - Boolean value
 */
function HBool(val) {
  // ensure singleton usage
  if (val && arguments.callee._trueSingletonInstance) return arguments.callee._trueSingletonInstance;
  if (!val && arguments.callee._falseSingletonInstance) return arguments.callee._falseSingletonInstance;

  if (val) arguments.callee._trueSingletonInstance = this;
  else arguments.callee._falseSingletonInstance = this;

  this.val = val;
}
HBool.prototype = Object.create(HVal.prototype);
module.exports = HBool;

/**
 * Construct from boolean value
 * @param {boolean} val
 * @return {HBool}
 */
HBool.make = function(val) {
  if (!HVal.typeis(val, 'boolean', Boolean))
    throw new Error("Invalid boolean val: \"" + val + "\"");

  return val ? HBool.TRUE : HBool.FALSE;
};

/**
 * Encode as T/F
 * @return {string}
 */
HBool.prototype.toZinc = function() {
  return this.val ? "T" : "F";
};

/**
 * Return val as string
 * @returns string
 */
HBool.prototype.toJSON = function() {
  return this.toString();
};

/**
 * Equals is based on reference
 * @param {HBool} that - object to be compared to
 * @return {boolean}
 */
HBool.prototype.equals = function(that) {
  return that instanceof HBool && this === that;
};

/**
 * Encode as "true" or "false"
 * @return {string}
 */
HBool.prototype.toString = function() {
  return this.val ? "true" : "false";
};

/**
 * Singleton value for true
 * @static
 * @return {HBool}
 */
HBool.TRUE = new HBool(true);
/**
 * Singleton value for false
 * @static
 * @return {HBool}
 */
HBool.FALSE = new HBool(false);
