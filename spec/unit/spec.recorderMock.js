JSpec.describe('Recorder mock', function () {
  var recorder;

  before_each(function () {
    recorderMock.prefix = "__";
    recorder = recorderMock("foo", "bar");
  });

  it("should accept a list of methods to mock and record", function () {
    expect(function() { recorder.foo(); }).not_to(throw_error);
    expect(function() { recorder.bar(); }).not_to(throw_error);
  });

  it("should allow calling as a function", function () {
    expect(function() { recorder(); }).not_to(throw_error);
  });

  it("should record calls to member functions", function () {
    recorder.foo("some", "arguments");
    expect(recorder.foo.__calls.length).to(eql, 1);
    expect(recorder.foo.__calls[0].arguments).to(eql, ["some", "arguments"]);
  });

  it("should record calls to as a function", function () {
    recorder("some", "arguments");
    expect(recorder.__calls.length).to(eql, 1);
    expect(recorder.__calls[0].arguments).to(eql, ["some", "arguments"]);
  });

  it("should clear calls to specific functions", function () {
    recorder.foo();
    recorder.bar();
    expect(recorder.foo.__calls).not_to(be_empty);
    recorder.foo.__clear();
    expect(recorder.foo.__calls).to(be_empty);
    expect(recorder.bar.__calls).not_to(be_empty);
  });

  it("should clear calls to all member functions", function () {
    recorder.foo();
    recorder.bar();
    expect(recorder.foo.__calls).not_to(be_empty);
    expect(recorder.bar.__calls).not_to(be_empty);
    recorder.__clearAll();
    expect(recorder.foo.__calls).to(be_empty);
    expect(recorder.bar.__calls).to(be_empty);
  });

  it("should mimic signature of object if given", function () {
    recorder = recorderMock({baz: 0, qux: 1});
    recorder.qux();
    expect(recorder.qux.__calls).not_to(be_empty);
  });

  it("can use other special method prefixes if needed", function () {
    recorderMock.prefix = "";
    recorder = recorderMock("foo");
    recorder.foo();
    expect(recorder.foo.calls).not_to(be_empty);
  });

  it("can chain calls", function () {
    recorder().foo().bar();
    expect(recorder.__calls).not_to(be_empty);
    expect(recorder.foo.__calls).not_to(be_empty);
    expect(recorder.bar.__calls).not_to(be_empty);
  });

  it("can append new calls", function () {
    expect(function () { recorder.baz(); }).to(throw_error);
    recorder.__addCalls("baz");
    recorder.baz();
    expect(recorder.baz.__calls).not_to(be_empty);
  });
});
