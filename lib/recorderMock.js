var recorderMock = function () {
  var prefix = recorderMock.prefix,
      members = [],
      calls = {},
      processors = {},
      buildRecorder,
      clear = function (name) {
        while(calls[name].length > 0) {
          calls[name].pop();
        }
      },
      makeMock = function (name) {
        calls[name] = calls[name] || [];
        var mock = function () {
          var call = { "arguments": Array.prototype.slice.call(arguments, 0)},
              newRecorder = buildRecorder();

          calls[name].push(call);
          calls[name].last = call;

          call.previous = this[prefix + "previous"];
          newRecorder[prefix + "previous"] = call;

          if (typeof(processors[name]) === "function") {
            return processors[name](call, newRecorder);
          } else {
            return newRecorder;
          }
        };
        mock[prefix + "calls"] = calls[name];
        mock[prefix + "clear"] = function () {
          clear(name);
        };
        mock[prefix + "returns"] = function (processor) {
          processors[name] = processor;
        };
        return mock;
      },
      addMembers = function() {
        var i, arg, member;
        for (i = 0; i < arguments.length; i++) {
          arg = arguments[i];
          if (typeof(arg) === "object") {
            for (member in arg) {
              members.push(member);
            }
          } else {
            members.push(arg);
          }
        }
      };

  buildRecorder = function() {
    var i, recorder = makeMock(prefix + "root");
    for (i in members) {
      recorder[members[i]] = makeMock(members[i]);
    }
    recorder[prefix + "clearAll"] = function () {
      clear(prefix + "root");
      for (var i in members) {
        clear(members[i]);
      }
    };
    recorder[prefix + "addCalls"] = function () {
      addMembers.apply(this, arguments);
      for (var i = 0; i < arguments.length; i++) {
        recorder[arguments[i]] = makeMock(arguments[i]);
      }
    };
    return recorder;
  };
  
  addMembers.apply(this, arguments);

  return buildRecorder();
};

recorderMock.prefix = "__";

if (typeof(exports) !== "undefined") {
  exports.recorderMock = recorderMock;
}
