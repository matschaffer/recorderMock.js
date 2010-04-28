function recorderMock () {
  var fn = function () {
        var calls = [],
            stub = function () {
              calls.push(Array.prototype.slice.call(arguments, 0));
              return this;
            };
        stub.__calls = calls;
        return stub;
      },
      recorder = fn();

  for (var i = 0; i < arguments.length; i++) {
    recorder[arguments[i]] = fn();
  }

  return recorder;
}
