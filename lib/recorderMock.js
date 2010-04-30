//var sys = require('sys');

var recorderMock = function () {
  var i, arg, member,
      prefix = recorderMock.prefix,
      makeMock = function (name) {
        var mock = function () {
              var call = {arguments: Array.prototype.slice.call(arguments, 0), previous: this.__previous};
              mock[prefix + "calls"].push(call);
              mock[prefix + "lastCall"] = call;

              this.__previous = call;
              if (mock[prefix + "returns"]) {
                return mock[prefix + "returns"](call, recorder);
              } else {
                return recorder;
              }
            };
        mock[prefix + "clear"] = function () {
          mock[prefix + "calls"] = [];
        };
        mock[prefix + "calls"] = [];
        return mock;
      },
      recorder = makeMock("root"),
      members = [],
      addMember = function (name) {
        recorder[name] = makeMock(name);
        members.push(name);
      };

  recorder[prefix + "addCalls"] = function () {
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      if (typeof(arg) === "object") {
        for (member in arg) {
          addMember(member);
        }
      } else {
        addMember(arg);
      }
    }
  };

  recorder[prefix + "clearAll"] = function () {
    for (i = 0; i < members.length; i++) {
      recorder[members[i]][prefix + "clear"]();
    }
  };

  recorder[prefix + "addCalls"].apply(this, arguments);

  return recorder;
};

recorderMock.prefix = "__";

if (typeof(exports) !== "undefined") {
  exports.recorderMock = recorderMock;
}
