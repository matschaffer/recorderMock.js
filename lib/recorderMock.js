var sys = require('sys');

var recorderMock = function () {
  var prefix = recorderMock.prefix,
      members = [],
      calls = {},
      clear = function (name) {
        while(calls[name].length > 0) {
          calls[name].pop();
        }
      },
      makeMock = function (name) {
        calls[name] = calls[name] || [];
        var mock = function () {
          var call = {arguments: Array.prototype.slice.call(arguments, 0)};
          calls[name].push(call);

          return buildRecorder();
        };
        mock[prefix + "calls"] = calls[name];
        mock[prefix + "clear"] = function () {
          clear(name);
        };
        return mock;
      },
      addMember = function(member) {
        members.push(member);
      },
      addMembers = function() {
        for (i = 0; i < arguments.length; i++) {
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
        return recorder;
      };
  
  addMembers.apply(this, arguments);

  return buildRecorder();
};

recorderMock.prefix = "__";

if (typeof(exports) !== "undefined") {
  exports.recorderMock = recorderMock;
}
