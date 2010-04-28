JSpec.describe('Recorder mock', function () {
  var recorder;

  before_each(function () {
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
    expect(recorder.foo.__calls[0]).to(eql, ["some", "arguments"]);
  });

  it("should record calls to as a function", function () {
    recorder("some", "arguments");
    expect(recorder.__calls.length).to(eql, 1);
    expect(recorder.__calls[0]).to(eql, ["some", "arguments"]);
  });
});
