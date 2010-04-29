var recorderMock = function () {
  var i, arg, member,
      prefix = recorderMock.prefix,
      makeMock = function () {
        var mock = function () {
              mock[prefix + "calls"].push({arguments: Array.prototype.slice.call(arguments, 0)});
              return this;
            };
        mock[prefix + "clear"] = function () {
          mock[prefix + "calls"] = [];
        };
        mock[prefix + "calls"] = [];
        return mock;
      },
      recorder = makeMock(),
      members = [],
      addMember = function (name) {
        recorder[name] = makeMock();
        members.push(name);
      };

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

  recorder[prefix + "clearAll"] = function () {
    for (i = 0; i < members.length; i++) {
      recorder[members[i]][prefix + "clear"]();
    }
  };

  return recorder;
};

recorderMock.prefix = "__";
