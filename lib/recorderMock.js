var sys = require('sys');

var recorderMock = function () {
  var prefix = recorderMock.prefix,
      members = [],
      calls = {},
      processors = {},
      clear = function (name) {
        while(calls[name].length > 0) {
          calls[name].pop();
        }
      },
      makeMock = function (name) {
        calls[name] = calls[name] || [];
        var mock = function () {
          var call = {arguments: Array.prototype.slice.call(arguments, 0)},
              newRecorder = buildRecorder();

          calls[name].push(call);
          calls[name].last = call;

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
        mock[prefix + "process"] = function (processor) {
          processors[name] = processor;
        };
        return mock;
      },
      addMember = function(member) {
        members.push(member);
      },
      addMembers = function() {
        for (var i = 0; i < arguments.length; i++) {
          arg = arguments[i];
          addMember(arg);
        }
      },
      buildRecorder = function() {
        var recorder = makeMock('__root');
        for(var i in members) {
          recorder[members[i]] = makeMock(members[i]);
        }
        recorder[prefix + "clearAll"] = function () {
          for(var i in members) {
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
