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
 * HBin models a binary file with a MIME type.
 * @see {@link http://project-haystack.org/doc/TagModel#tagKinds|Project Haystack}
 *
 * @constructor
 * @private
 * @extends {HVal}
 * @param {string} mime - MIME type for binary file
 */
function HBin(mime) {
  this.mime = mime;
}
HBin.prototype = Object.create(HVal.prototype);
module.exports = HBin;

/**
 * Construct for MIME type
 * @param {string} mime
 * @return {HBin}
 */
HBin.make = function(mime) {
  if (typeof(mime) === 'undefined' || mime.length === 0 || mime.indexOf('/') < 0)
    throw new Error("Invalid mime val: \"" + mime + "\"");

  return new HBin(mime);
};

/**
 * Encode as "Bin(<mime>)"
 * @returns string
 */
HBin.prototype.toZinc = function() {
  var s = "Bin(";
  s += parse(this.mime);
  s += ")";
  return s;
};

/**
 * Encode as "b:<mime>"
 * @returns string
 */
HBin.prototype.toJSON = function() {
  return "b:" + parse(this.mime);
};

function parse(mime) {
  var s = "";
  for (var i = 0; i < mime.length; ++i) {
    var c = mime.charAt(i);
    if (HVal.cc(c) > 127 || c === ')')
      throw new Error("Invalid mime, char='" + c + "'");

    s += c;
  }
  return s;
}
/**
 * Equals is based on mime field
 * @param {HBin} that - object to be compared to
 * @returns boolean
 */
HBin.prototype.equals = function(that) {
  return that instanceof HBin && this.mime === that.mime;
};
