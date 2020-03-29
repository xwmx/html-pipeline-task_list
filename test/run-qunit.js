// ./units/run-qunit.js

    var deferTimeout, fs, page, print, timeoutId;
  
    fs = require('fs');
  
    print = function(s) {
      return fs.write("/dev/stderr", s, 'w');
    };
  
    page = new WebPage();
  
    page.onConsoleMessage = function(msg) {
      return console.error(msg);
    };
  
    timeoutId = null;
  
    deferTimeout = function() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      return timeoutId = setTimeout(function() {
        console.error("Timeout");
        return phantom.exit(1);
      }, 3000);
    };
  
    page.open(phantom.args[0], function() {
      deferTimeout();
      return setInterval(function() {
        var i, len, result, test, tests;
        tests = page.evaluate(function() {
          var i, len, ref, results, test;
          tests = (ref = document.getElementById('qunit-tests')) != null ? ref.children : void 0;
          if (!tests) {
            return;
          }
          results = [];
          for (i = 0, len = tests.length; i < len; i++) {
            test = tests[i];
            if (!(test.className !== 'running' && !test.recorded)) {
              continue;
            }
            test.recorded = true;
            if (test.className === 'pass') {
              results.push('.');
            } else if (test.className === 'fail') {
              results.push('F');
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
        if (!tests) {
          return;
        }
        for (i = 0, len = tests.length; i < len; i++) {
          test = tests[i];
          if (!(test)) {
            continue;
          }
          deferTimeout();
          print(test);
        }
        result = page.evaluate(function() {
          var j, len1;
          result = document.getElementById('qunit-testresult');
          tests = document.getElementById('qunit-tests').children;
          if (result.innerText.match(/completed/)) {
            console.error("");
            for (j = 0, len1 = tests.length; j < len1; j++) {
              test = tests[j];
              if (test.className === 'fail') {
                console.error(test.innerText);
              }
            }
            console.error(result.innerText);
            return parseInt(result.getElementsByClassName('failed')[0].innerText);
          }
        });
        if (result != null) {
          return phantom.exit(result);
        }
      }, 100);
    });
