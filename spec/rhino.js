
load('./spec/lib/jspec.js')
load('./spec/lib/jspec.xhr.js')
load('lib/recorderMock.js')

JSpec
  .exec('spec/unit/spec.recorderMock.js')
  .run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures', failuresOnly: true })
  .report()
