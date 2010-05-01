
0.1.0 / 2010-04-29
------------------

* Initial release

0.2.0 / 2010-04-30
------------------

* Added ability to inspect call chain via `.__call[0].previous`

Led to these API changes:

* Changed `.__lastCall` to `.__call.last`
* Changed `.__returns = fn` to `.__process(fn)`
