
load('./spec/lib/jspec.js')
load('./spec/lib/jspec.xhr.js')
load('lib/recorderMock.js')
load('spec/unit/spec.helper.js')

JSpec
.exec('spec/unit/spec.recorderMock.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report()
