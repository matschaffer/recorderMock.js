
# recorderMock.js

recorderMock.js is a helper library for creating mock objects that
silently receive and record any call that they're configured for.

The intended use for this is to mock out libraries that interact
with browser APIs (e.g., jQuery, Raphaël). Doing this with standard
mocking tools tends to lead to a lot of extra setup code, whereas
recorderMock.js often only requires a single line.

## Usage

To build a mock object, just call the `recorderMock` function with
all the functions you want to mock:

    var myMock = recorderMock("foo", "bar");

You can then call the defined methods as usual, or chained:

    myMock.foo();
    myMock.bar().foo("some arg");

An inspect the calls that were made after the fact:

    myMock.foo.__calls    // => [{arguments: []}, {arguments: ["some arg"]}]
    myMock.bar.__calls    // => [{arguments: []}]

You can also call the mock directly which is useful with some libraries:

    myMock("another arg")
    myMock.__calls        // => [{arguments: ["another arg"]}]

## Compatibility

The tests are currently running in-browser, rhino, and node.js, so it should
work pretty much anywhere. Let me know if you find otherwise.

## License 

(The MIT License)

Copyright (c) 2010 Mat Schaffer &lt;mat@schaffer.me&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
