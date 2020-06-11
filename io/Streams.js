module.exports.Reader = ReadableStream;
module.exports.Writer = WritableStream;

var Stream = require('stream'),
    inherits = require('util').inherits;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReadableStream taken from string-stream with a GPL-3.0 license - http://opensource.org/licenses/GPL-3.0 //
//                                                                                                         //
// Copyright (c) 2013 Dominik Burgdörfer                                                                   //
//                                                                                                         //
// Source available at https://github.com/mikanda/string-stream                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ReadableStream(init) {
  Stream.Readable.call(this);
  this._data = init || '';
}
inherits(ReadableStream, Stream.Readable);

ReadableStream.prototype.read = function (n) {
  var chunk;
  var _n = (n == null || n === -1) ? undefined : n;
  chunk = this._data.slice(0, _n);

  this._data = this._data.slice(_n);
  if (_n >= this._data.length || _n === -1) this.emit('end');
  return chunk;
};
ReadableStream.prototype.pipe = function (dest) {
  dest.end(this.read());
  return dest;
};
ReadableStream.prototype.write = function (data) {
  this._data += data;
};
ReadableStream.prototype.end = function (data) {
  if (data) {
    this.write.apply(this, arguments);
  }
  this.emit('end');
};
ReadableStream.prototype.toString = function () {
  return this._data;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WritableStream taken from string-stream with a MIT license - http://opensource.org/licenses/MIT         //
//                                                                                                         //
// Copyright (c) 2013 Dominik Burgdörfer                                                                   //
//                                                                                                         //
// Source available at https://github.com/mikanda/string-stream                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function WritableStream (options) {
  Stream.Writable.call(this, options);
}
inherits(WritableStream, Stream.Writable);

WritableStream.prototype.write = function(chunk, encoding, callback) {
  var ret = Stream.Writable.prototype.write.apply(this, arguments);
  if (!ret) this.emit('drain');
  return ret;
}
WritableStream.prototype._write = function(chunk, encoding, callback) {
  this.write(chunk, encoding, callback);
};
WritableStream.prototype.toString = function() {
  return this.toBuffer().toString();
};
WritableStream.prototype.toBuffer = function() {
  var buffers = [];
  this._writableState.getBuffer().forEach(function(data) {
    buffers.push(data.chunk);
  });

  return Buffer.concat(buffers);
};
