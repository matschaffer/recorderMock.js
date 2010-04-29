
require.paths.unshift('spec', './spec/lib', 'lib')
require('jspec')
recorderMock = require('recorderMock').recorderMock

JSpec
  .exec('spec/unit/spec.recorderMock.js')
  .run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures', failuresOnly: true })
  .report()
